import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiSend, FiPaperclip, FiSmile, FiMenu, FiX } from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";
import { BsThreeDotsVertical, BsStarFill } from "react-icons/bs";
import { FaSpinner, FaUserCircle } from "react-icons/fa";
import SellerLayout from "../../Pages/layouts/SellerLayout";
import { messageAPI } from "../../services/messageService";
import socketService from "../../services/socketService";
import { jwtDecode } from 'jwt-decode';

const SellerMessages = () => {
  const [message, setMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showOrderPanel, setShowOrderPanel] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize - FIXED VERSION
  useEffect(() => {
    const initializeChat = async () => {
      try {
        console.log('🔧 Seller: Initializing chat...');
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const decoded = jwtDecode(token);
        console.log('👤 Seller User decoded:', decoded);
        setUser(decoded);

        // Connect to socket with error handling
        try {
          await socketService.connect(token);
          socketService.joinUser(decoded.id);
          console.log('✅ Seller: Socket connected and joined user room');
        } catch (socketError) {
          console.error('❌ Seller: Socket connection failed:', socketError);
          // Continue without socket
        }

        // Set up socket listeners
        socketService.onNewMessage(handleNewMessage);
        socketService.onConversationUpdated(handleConversationUpdated);
        console.log('✅ Seller: Socket listeners set up');

        // Load conversations
        await loadConversations();
      } catch (error) {
        console.error('❌ Seller: Error initializing chat:', error);
        setError('Failed to initialize messaging system');
      } finally {
        setLoading(false);
      }
    };

    initializeChat();

    return () => {
      socketService.offNewMessage();
      socketService.offConversationUpdated();
      socketService.disconnect();
    };
  }, []);

  // Load conversations - FIXED VERSION
  const loadConversations = async () => {
    try {
      console.log('📂 Seller: Loading conversations...');
      const response = await messageAPI.getUserConversations();
      console.log('✅ Seller: Conversations API response:', response);
      
      if (response.data && Array.isArray(response.data)) {
        console.log(`✅ Seller: Loaded ${response.data.length} conversations`);
        setConversations(response.data);
        
        // Auto-select first conversation if available
        if (response.data.length > 0 && !activeConversation) {
          const firstConversation = response.data[0];
          console.log('✅ Seller: Auto-selecting first conversation:', firstConversation._id);
          setActiveConversation(firstConversation);
          await loadMessages(firstConversation._id);
        }
      } else {
        console.log('ℹ️ Seller: No conversations found or invalid response');
        setConversations([]);
      }
    } catch (error) {
      console.error('❌ Seller: Error loading conversations:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      setConversations([]);
      setError('Failed to load conversations');
    }
  };

  // Load messages for a conversation - FIXED VERSION
  const loadMessages = async (conversationId) => {
    try {
      console.log(`💬 Seller: Loading messages for conversation: ${conversationId}`);
      const response = await messageAPI.getMessages(conversationId);
      console.log('✅ Seller: Messages loaded:', response.data);
      
      setMessages(response.data || []);
      scrollToBottom();
      
      // Join conversation room if socket is connected
      if (socketService.getConnectionStatus()) {
        socketService.joinConversation(conversationId);
        console.log(`✅ Seller: Joined conversation room: ${conversationId}`);
      }
    } catch (error) {
      console.error('❌ Seller: Error loading messages:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      setMessages([]);
    }
  };

  // Socket event handlers - FIXED VERSION
  const handleNewMessage = (message) => {
    console.log('📨 Seller received new message:', message);
    
    if (activeConversation && message.conversationId === activeConversation._id) {
      setMessages(prev => {
        // Avoid duplicates
        if (prev.some(msg => msg._id === message._id)) return prev;
        return [...prev, message];
      });
      scrollToBottom();
      
      // Mark as read automatically when seller views the message
      markAsRead(activeConversation._id);
    }
    
    // Update conversations list
    setConversations(prev => 
      prev.map(conv => 
        conv._id === message.conversationId 
          ? { 
              ...conv, 
              lastMessage: message.message, 
              lastMessageAt: new Date(),
              unreadCount: conv._id === activeConversation?._id ? 0 : (conv.unreadCount || 0) + 1
            }
          : conv
      )
    );
  };

  const handleConversationUpdated = () => {
    console.log('🔄 Seller: Conversation updated, reloading...');
    loadConversations();
  };

  // Send message from seller - FIXED VERSION
  const handleSendMessage = async () => {
    if (message.trim() === '' || !activeConversation) {
      console.log('ℹ️ Seller: Message empty or no active conversation');
      return;
    }

    console.log('📤 Seller: Sending message...');
    setIsSending(true);
    
    const messageToSend = message.trim();
    setMessage('');
    
    try {
      const messageData = {
        conversationId: activeConversation._id,
        receiverId: activeConversation.buyer._id, // Seller sends to buyer
        message: messageToSend
      };

      console.log('📡 Seller: Sending message via API:', messageData);
      
      const response = await messageAPI.sendMessage(messageData);
      console.log('✅ Seller: Message sent successfully:', response.data);
      
      // Add message to local state immediately for better UX
      setMessages(prev => [...prev, response.data]);
      scrollToBottom();
      
      // Update conversation last message
      setConversations(prev => 
        prev.map(conv => 
          conv._id === activeConversation._id 
            ? { ...conv, lastMessage: messageToSend, lastMessageAt: new Date() }
            : conv
        )
      );
    } catch (error) {
      console.error('❌ Seller: Error sending message:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      // Restore message if failed
      setMessage(messageToSend);
      alert('Failed to send message. Please check console for details.');
    } finally {
      setIsSending(false);
    }
  };

  // Utility functions
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const markAsRead = async (conversationId) => {
    try {
      await messageAPI.markAsRead(conversationId);
      setConversations(prev => 
        prev.map(conv => 
          conv._id === conversationId ? { ...conv, unreadCount: 0 } : conv
        )
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  // Safe conversation data access
  const safeConversations = Array.isArray(conversations) ? conversations : [];

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="animate-spin text-4xl text-[#708238]" />
          <span className="ml-2">Loading messages...</span>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] bg-gray-50">
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex justify-between items-center p-4 bg-white border-b">
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-gray-700"
          >
            {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          <button 
            onClick={() => setShowOrderPanel(!showOrderPanel)}
            className="text-gray-700"
          >
            <BsThreeDotsVertical size={20} />
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 mx-4 mt-2 rounded">
            {error}
          </div>
        )}

        {/* Left Sidebar - Conversations */}
        <div className={`${showMobileMenu ? "block" : "hidden"} lg:block w-full lg:w-1/3 xl:w-1/4 border-r bg-white p-4 overflow-y-auto`}>
          <div className="sticky top-0 bg-white pb-4 z-10">
            <div className="relative mb-4">
              <FiSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-1">
            {safeConversations.length > 0 ? (
              safeConversations.map((conversation) => (
                <div
                  key={conversation._id}
                  onClick={() => {
                    setActiveConversation(conversation);
                    markAsRead(conversation._id);
                    loadMessages(conversation._id);
                    setShowMobileMenu(false);
                  }}
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
                    activeConversation && activeConversation._id === conversation._id
                      ? "bg-[#708238]/10 border border-[#708238]/20"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative">
                    {conversation.buyer?.profileImage ? (
                      <img 
                        src={conversation.buyer.profileImage} 
                        alt={conversation.buyer?.name || 'Buyer'}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#708238] to-[#FFA500] flex items-center justify-center text-white font-bold text-lg">
                        {(conversation.buyer?.name?.[0] || 'B').toUpperCase()}
                      </div>
                    )}
                    {conversation.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#FFA500] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-semibold text-gray-800 truncate">
                        {conversation.buyer?.name || 'Unknown Buyer'}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {conversation.lastMessageAt ? 
                          new Date(conversation.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                          : 'Now'
                        }
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.lastMessage || 'New conversation'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaUserCircle className="text-4xl text-gray-300 mx-auto mb-3" />
                <p>No conversations yet</p>
                <p className="text-sm text-gray-400 mt-1">When buyers contact you, conversations will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="border-b p-4 flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                  {activeConversation.buyer?.profileImage ? (
                    <img 
                      src={activeConversation.buyer.profileImage} 
                      alt={activeConversation.buyer?.name || 'Buyer'}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#708238] to-[#FFA500] flex items-center justify-center text-white font-bold">
                      {(activeConversation.buyer?.name?.[0] || 'B').toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {activeConversation.buyer?.name || 'Unknown Buyer'}
                    </h3>
                    <div className="flex items-center">
                      <BsStarFill className="text-[#FFA500] text-xs mr-1" />
                      <span className="text-xs text-gray-500">Active buyer</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setShowOrderPanel(!showOrderPanel)}
                    className="text-gray-500 hover:text-[#708238] lg:hidden"
                  >
                    <BsThreeDotsVertical />
                  </button>
                  <button className="text-gray-500 hover:text-[#708238] hidden lg:block">
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#f9fbf7]">
                {messages.map((msg, idx) => (
                  <div
                    key={msg._id || idx}
                    className={`flex ${
                      msg.sender?._id === user?.id ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] lg:max-w-[60%] ${
                        msg.sender?._id === user?.id ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="flex items-center mb-1 space-x-2">
                        {msg.sender?._id !== user?.id && (
                          <span className="text-xs font-medium text-gray-700">
                            {msg.sender?.name || 'Buyer'}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {msg.createdAt ? 
                            new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'Now'
                          }
                        </span>
                        {msg.sender?._id === user?.id && msg.isRead && (
                          <IoCheckmarkDone className="text-xs text-[#708238]" />
                        )}
                      </div>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.sender?._id === user?.id
                            ? "bg-[#708238] text-white"
                            : "bg-white text-gray-800 border border-gray-200"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t p-4 bg-white sticky bottom-0">
                <div className="flex items-center gap-2">
                  <button className="text-gray-500 hover:text-[#708238] p-2 rounded-full hover:bg-gray-100">
                    <FiPaperclip className="text-xl" />
                  </button>
                  <button className="text-gray-500 hover:text-[#708238] p-2 rounded-full hover:bg-gray-100">
                    <FiSmile className="text-xl" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message || isSending}
                    className={`p-3 rounded-full ${
                      message && !isSending
                        ? "bg-[#708238] hover:bg-[#5a6a2d] text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    } transition`}
                  >
                    {isSending ? <FaSpinner className="animate-spin" /> : <FiSend />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-[#f9fbf7]">
              <div className="text-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FaUserCircle className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
                <p className="text-gray-500">Select a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Order Info (Desktop) */}
        {activeConversation && (
          <div className={`hidden lg:block w-1/4 border-l bg-white p-6 ${showOrderPanel ? "!block" : ""}`}>
            <div className="sticky top-0 space-y-6">
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h3 className="text-lg font-semibold text-gray-800">Order Details</h3>
                <button 
                  onClick={() => setShowOrderPanel(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 hidden lg:block">
                  Order Details
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Buyer</span>
                    <span className="text-sm font-semibold">{activeConversation.buyer?.name || 'Unknown Buyer'}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <span className="text-sm font-semibold text-[#708238]">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Last Activity</span>
                    <span className="text-sm font-semibold">
                      {activeConversation.lastMessageAt ? 
                        new Date(activeConversation.lastMessageAt).toLocaleDateString()
                        : 'Today'
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  About {activeConversation.buyer?.name || 'Buyer'}
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {activeConversation.buyer?.email || 'Not available'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Member since:</span> {new Date().getFullYear()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Avg. response time:</span> 1 hour
                  </p>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                View Order Page
              </button>
            </div>
          </div>
        )}

        {/* Right Panel - Order Info (Mobile) */}
        {showOrderPanel && activeConversation && (
          <div className="lg:hidden fixed inset-0 bg-white z-50 p-6 pt-16">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Order Details</h3>
              <button 
                onClick={() => setShowOrderPanel(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Buyer</span>
                  <span className="text-sm font-semibold">{activeConversation.buyer?.name || 'Unknown Buyer'}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Status</span>
                  <span className="text-sm font-semibold text-[#708238]">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Last Activity</span>
                  <span className="text-sm font-semibold">
                    {activeConversation.lastMessageAt ? 
                      new Date(activeConversation.lastMessageAt).toLocaleDateString()
                      : 'Today'
                    }
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  About {activeConversation.buyer?.name || 'Buyer'}
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {activeConversation.buyer?.email || 'Not available'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Member since:</span> {new Date().getFullYear()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Avg. response time:</span> 1 hour
                  </p>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                View Order Page
              </button>
            </div>
          </div>
        )}
      </div>
    </SellerLayout>
  );
};

export default SellerMessages;