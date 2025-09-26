import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaPaperclip, FaSmile, FaPaperPlane, FaEllipsisV, FaStar, FaCheck, FaCheckDouble, FaClock, FaTrash, FaArchive, FaSpinner, FaUserCircle, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BuyerNavbar from './BuyerNavbar';
import { messageAPI } from '../../services/messageService';
import { jwtDecode } from "jwt-decode"; 
import socketService from "../../services/socketService";

const BuyerMessages = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  // State management
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Sample data for demonstration
  const getSampleConversations = () => {
    return [
      {
        _id: 'demo-1',
        seller: {
          _id: 'seller1',
          name: 'John Doe',
          profileImage: '',
          email: 'john@example.com'
        },
        lastMessage: 'Hello! I can help with your ERP implementation',
        lastMessageAt: new Date(),
        unreadCount: 0,
        status: 'active',
        orderTitle: 'ERP Consultation'
      },
      {
        _id: 'demo-2',
        seller: {
          _id: 'seller2',
          name: 'Sarah Johnson',
          profileImage: '',
          email: 'sarah@example.com'
        },
        lastMessage: 'Looking forward to working with you!',
        lastMessageAt: new Date(Date.now() - 86400000), // 1 day ago
        unreadCount: 1,
        status: 'active',
        orderTitle: 'SAP Implementation'
      }
    ];
  };

  const getSampleMessages = (conversationId) => {
    if (conversationId === 'demo-1') {
      return [
        {
          _id: '1',
          sender: { _id: 'seller1', name: 'John Doe', profileImage: '' },
          message: 'Hello! I can help with your ERP implementation needs. What specific requirements do you have?',
          createdAt: new Date(Date.now() - 3600000),
          isRead: true
        },
        {
          _id: '2', 
          sender: { _id: 'user123', name: 'You', profileImage: '' },
          message: 'Hi John! I need help implementing an ERP system for my manufacturing business.',
          createdAt: new Date(Date.now() - 1800000),
          isRead: true
        },
        {
          _id: '3',
          sender: { _id: 'seller1', name: 'John Doe', profileImage: '' },
          message: 'Great! I have extensive experience with manufacturing ERP systems. What is your timeline?',
          createdAt: new Date(Date.now() - 600000),
          isRead: false
        }
      ];
    } else {
      return [
        {
          _id: '1',
          sender: { _id: 'seller2', name: 'Sarah Johnson', profileImage: '' },
          message: 'Hi there! I understand you need SAP implementation services.',
          createdAt: new Date(Date.now() - 7200000),
          isRead: true
        },
        {
          _id: '2',
          sender: { _id: 'user123', name: 'You', profileImage: '' },
          message: 'Yes, we are looking to implement SAP for our retail chain.',
          createdAt: new Date(Date.now() - 3600000),
          isRead: true
        }
      ];
    }
  };

  // Initialize
 useEffect(() => {
  const initializeChat = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const decoded = jwtDecode(token);
      setUser(decoded);

      // Load conversations first
      await loadConversations();

      // Check for selected seller from dashboard AFTER conversations are loaded
      const sellerData = localStorage.getItem('selectedSeller');
      if (sellerData) {
        const seller = JSON.parse(sellerData);
        console.log('Found selected seller:', seller);
        
        // Wait a bit for conversations to be fully loaded
        setTimeout(() => {
          handleSelectedSeller(seller);
        }, 500);
        
        localStorage.removeItem('selectedSeller');
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
      setError('Failed to initialize messaging system');
      // Load sample data as fallback
      setConversations(getSampleConversations());
    } finally {
      setLoading(false);
    }
  };

  initializeChat();

  return () => {
    socketService.offNewMessage();
    socketService.offConversationUpdated();
  };
}, [navigate]);


  // Load conversations
  const loadConversations = async () => {
  try {
    const response = await messageAPI.getUserConversations();
    if (response.data && response.data.length > 0) {
      console.log('Loaded conversations:', response.data);
      setConversations(response.data);
    } else {
      console.log('No conversations found, using sample data');
      setConversations(getSampleConversations());
    }
  } catch (error) {
    console.error('Error loading conversations:', error);
    setConversations(getSampleConversations());
  }
};

  // Handle selected seller from dashboard
  const handleSelectedSeller = async (seller) => {
  try {
    if (!user || !seller.userId) {
      console.error('User or seller data missing:', { user, seller });
      throw new Error('User or seller data missing');
    }

    // First, check if we already have a conversation with this seller
    const existingConversation = conversations.find(conv => 
      conv.seller && conv.seller._id === seller.userId
    );

    if (existingConversation) {
      console.log('Found existing conversation:', existingConversation);
      setActiveConversation(existingConversation);
      await loadMessages(existingConversation._id);
      return;
    }

    // Try to create real conversation via API
    try {
      const response = await messageAPI.getOrCreateConversation(user.id, seller.userId);
      const conversation = response.data;
      
      setConversations(prev => {
        const existing = prev.find(c => c._id === conversation._id);
        if (existing) return prev;
        return [conversation, ...prev];
      });
      
      setActiveConversation(conversation);
      await loadMessages(conversation._id);
    } catch (apiError) {
      console.error('API error creating conversation:', apiError);
      // Fallback to demo conversation if API fails
      createDemoConversation(seller);
    }
  } catch (error) {
    console.error('Error in handleSelectedSeller:', error);
    // Create a demo conversation as fallback
    createDemoConversation(seller);
  }
};

// Add this helper function
const createDemoConversation = (seller) => {
  const demoConversation = {
    _id: `demo-${seller.userId}-${Date.now()}`,
    seller: {
      _id: seller.userId,
      name: seller.name,
      profileImage: seller.img,
      email: `${seller.name.toLowerCase().replace(/\s+/g, '')}@example.com`
    },
    lastMessage: `Started conversation about ${seller.title}`,
    lastMessageAt: new Date(),
    unreadCount: 0,
    status: 'active',
    orderTitle: seller.title,
    isDemo: true // Add flag to identify demo conversations
  };
  
  setConversations(prev => {
    const existing = prev.find(c => c.seller._id === seller.userId);
    if (existing) return prev;
    return [demoConversation, ...prev];
  });
  
  setActiveConversation(demoConversation);
  setMessages([{
    _id: `demo-msg-${Date.now()}`,
    sender: { 
      _id: seller.userId, 
      name: seller.name, 
      profileImage: seller.img 
    },
    message: `Hi! Thanks for reaching out about ${seller.title}. How can I help you today?`,
    createdAt: new Date(),
    isRead: true,
    isDemo: true
  }]);
};

  // Load messages for a conversation
  const loadMessages = async (conversationId) => {
    try {
      // Check if it's a demo conversation
      if (conversationId.startsWith('demo-')) {
        setMessages(getSampleMessages(conversationId));
        scrollToBottom();
        return;
      }

      const response = await messageAPI.getMessages(conversationId);
      setMessages(response.data);
      scrollToBottom();
    } catch (error) {
      console.error('Error loading messages:', error);
      // Use sample messages for demo
      setMessages(getSampleMessages(conversationId));
      scrollToBottom();
    }
  };

  // Socket event handlers
  const handleNewMessage = (message) => {
    if (activeConversation && message.conversationId === activeConversation._id) {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    }
    
    // Update conversations list
    setConversations(prev => 
      prev.map(conv => 
        conv._id === message.conversationId 
          ? { ...conv, lastMessage: message.message, lastMessageAt: new Date() }
          : conv
      )
    );
  };

  const handleConversationUpdated = () => {
    loadConversations();
  };

  // Send message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !activeConversation) return;

    setIsSending(true);
    
    try {
      // For demo conversations, just add the message locally
      if (activeConversation._id.startsWith('demo-')) {
        const newMsg = {
          _id: `msg-${Date.now()}`,
          sender: { _id: user.id, name: 'You', profileImage: '' },
          message: newMessage.trim(),
          createdAt: new Date(),
          isRead: false,
          conversationId: activeConversation._id
        };
        
        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
        scrollToBottom();
        
        // Simulate seller response after 2 seconds
        setTimeout(() => {
          const sellerResponse = {
            _id: `msg-${Date.now()}-response`,
            sender: { 
              _id: activeConversation.seller._id, 
              name: activeConversation.seller.name, 
              profileImage: activeConversation.seller.profileImage 
            },
            message: 'Thanks for your message! I will get back to you shortly.',
            createdAt: new Date(),
            isRead: false,
            conversationId: activeConversation._id
          };
          setMessages(prev => [...prev, sellerResponse]);
          scrollToBottom();
        }, 2000);
      } else {
        // Real API call for non-demo conversations
        const messageData = {
          conversationId: activeConversation._id,
          receiverId: activeConversation.seller._id,
          message: newMessage.trim()
        };

        const response = await messageAPI.sendMessage(messageData);
        setMessages(prev => [...prev, response.data]);
        setNewMessage('');
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
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
      if (!conversationId.startsWith('demo-')) {
        await messageAPI.markAsRead(conversationId);
      }
      setConversations(prev => 
        prev.map(conv => 
          conv._id === conversationId ? { ...conv, unreadCount: 0 } : conv
        )
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  // Filter conversations
  const filteredConversations = conversations.filter(convo => 
    convo.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (convo.orderTitle && convo.orderTitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Status badge component
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="bg-[#708238]/20 text-[#708238] text-xs px-2 py-0.5 rounded-full">Active</span>;
      case 'archived':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">Archived</span>;
      case 'completed':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">Completed</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <BuyerNavbar />
        <div className="flex-1 flex items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-[#708238]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <BuyerNavbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm py-4 px-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-64 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#708238]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button 
              className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-4 py-2 rounded-full text-sm font-medium transition"
              onClick={() => navigate('/buyer/dashboard')}
            >
              Find More Sellers
            </button>
          </div>
          <button 
            className="md:hidden text-gray-500"
            onClick={() => setShowSearch(true)}
          >
            <FaSearch />
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 mx-4 mt-4 rounded">
          {error} - Using demo data for testing
        </div>
      )}
      
      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="md:hidden fixed inset-0 bg-white z-20 p-4">
          <div className="flex items-center mb-4">
            <button 
              className="mr-3 text-gray-500"
              onClick={() => setShowSearch(false)}
            >
              <FaTimes />
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#708238]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>
          <button 
            className="bg-[#708238] w-full hover:bg-[#5a6a2d] text-white px-4 py-2 rounded-full text-sm font-medium transition"
            onClick={() => navigate('/buyer/dashboard')}
          >
            Find More Sellers
          </button>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-full md:w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-gray-700">All Conversations</h2>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {conversations.length} conversations
              </span>
            </div>
            
            {/* Conversation List */}
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div 
                  key={conversation._id}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    activeConversation && activeConversation._id === conversation._id 
                      ? 'bg-[#708238]/10 border border-[#708238]/20' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setActiveConversation(conversation);
                    markAsRead(conversation._id);
                    loadMessages(conversation._id);
                  }}
                >
                  <div className="flex items-start">
                    <div className="relative mr-3">
                      {conversation.seller.profileImage ? (
                        <img 
                          src={conversation.seller.profileImage} 
                          alt={conversation.seller.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                          <FaUserCircle className="text-gray-400 text-xl" />
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-800 truncate">{conversation.seller.name}</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {new Date(conversation.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-[#FFA500] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-xs text-gray-500 truncate">
                          {conversation.orderTitle || 'New Conversation'}
                        </span>
                        {getStatusBadge(conversation.status)}
                        {conversation._id.startsWith('demo-') && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Demo</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredConversations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FaUserCircle className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p>No conversations found</p>
                  <button 
                    className="mt-4 bg-[#708238] hover:bg-[#5a6a2d] text-white px-4 py-2 rounded-md text-sm"
                    onClick={() => navigate('/buyer/dashboard')}
                  >
                    Start a Conversation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="hidden md:flex flex-col w-2/3">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      {activeConversation.seller.profileImage ? (
                        <img 
                          src={activeConversation.seller.profileImage} 
                          alt={activeConversation.seller.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                          <FaUserCircle className="text-gray-400 text-xl" />
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800">{activeConversation.seller.name}</h2>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <span>Online</span>
                        <span className="mx-1">•</span>
                        <div className="flex items-center">
                          <FaStar className="text-[#FFA500] mr-1" />
                          <span>4.9 (128 reviews)</span>
                        </div>
                        {activeConversation._id.startsWith('demo-') && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs ml-2">Demo Conversation</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <button 
                      className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <FaEllipsisV />
                    </button>
                    
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                        <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:text-[#FFA500]">
                          <FaArchive className="mr-2 text-gray-500" /> Archive
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                  {/* Order Info Banner */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {activeConversation.orderTitle || 'New Project Discussion'}
                      </h3>
                      <div className="flex items-center mt-1 text-sm">
                        <span className="text-gray-600">Started conversation</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="font-medium text-[#FFA500]">Active</span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="text-sm font-medium text-[#708238] hover:text-[#5a6a2d] px-3 py-1 rounded-md hover:bg-[#708238]/10">
                        View Profile
                      </button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message._id} 
                        className={`flex ${message.sender._id === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex items-end space-x-2">
                          {message.sender._id !== user.id && (
                            <div className="mb-1">
                              {message.sender.profileImage ? (
                                <img 
                                  src={message.sender.profileImage} 
                                  alt="avatar" 
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center">
                                  <FaUserCircle className="text-gray-400" />
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div 
                            className={`max-w-md rounded-2xl px-4 py-3 ${
                              message.sender._id === user.id 
                                ? 'bg-[#708238] text-white rounded-br-none' 
                                : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <div className={`flex items-center text-xs mt-2 ${
                              message.sender._id === user.id ? 'text-[#FFA500]' : 'text-gray-500'
                            }`}>
                              <span>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              {message.sender._id === user.id && (
                                <span className="ml-2">
                                  {message.isRead ? <FaCheckDouble className="text-[#FFA500]" /> : <FaCheck className="text-current" />}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>
              
              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-end border border-gray-300 rounded-lg bg-white px-3">
                    <div className="flex py-2 space-x-2">
                      <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
                        <FaPaperclip />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
                        <FaSmile />
                      </button>
                    </div>
                    
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 py-3 px-2 resize-none focus:outline-none text-sm max-h-32"
                      rows={1}
                    />
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={newMessage.trim() === '' || isSending}
                      className={`m-2 p-3 rounded-full ${
                        newMessage.trim() === '' || isSending
                          ? 'bg-gray-200 text-gray-400' 
                          : 'bg-[#708238] hover:bg-[#5a6a2d] text-white'
                      }`}
                    >
                      {isSending ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaPaperPlane />
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500 flex justify-between">
                    <span>Press Enter to send</span>
                    <span>Shift + Enter for a new line</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FaUserCircle className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
                <p className="text-gray-500 mb-6">Select a conversation from the list to start messaging</p>
                <button 
                  className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-5 py-2 rounded-md text-sm font-medium"
                  onClick={() => navigate('/buyer/dashboard')}
                >
                  Find Sellers to Message
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Empty State for Mobile */}
        <div className="md:hidden flex-1 flex items-center justify-center bg-gray-50 p-8">
          <div className="text-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FaUserCircle className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
            <p className="text-gray-500 mb-6">Select a conversation from the list to start messaging</p>
            <button 
              className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-5 py-2 rounded-md text-sm font-medium"
              onClick={() => navigate('/buyer/dashboard')}
            >
              Start New Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerMessages;