import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaPaperclip, FaSmile, FaPaperPlane, FaEllipsisV, FaStar, FaCheck, FaCheckDouble, FaClock, FaTrash, FaArchive, FaSpinner, FaUserCircle, FaTimes } from 'react-icons/fa';
import BuyerNavbar from './BuyerNavbar';

const BuyerMessages = () => {
  // State for conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      buyerName: 'Sarah Johnson',
      buyerAvatar: '',
      lastMessage: 'Can you make these changes by tomorrow?',
      unread: 3,
      timestamp: '2 hours ago',
      isActive: true,
      orderTitle: 'Website Redesign',
      status: 'active',
      lastActive: 'Active now'
    },
    {
      id: 2,
      buyerName: 'Tech Startup Inc.',
      buyerAvatar: '',
      lastMessage: 'The design looks great!',
      unread: 0,
      timestamp: '5 hours ago',
      isActive: false,
      orderTitle: 'Logo Design',
      status: 'delivered',
      lastActive: '5 hours ago'
    },
    {
      id: 3,
      buyerName: 'Michael Chen',
      buyerAvatar: '',
      lastMessage: 'Looking forward to seeing the first draft',
      unread: 1,
      timestamp: 'Yesterday',
      isActive: false,
      orderTitle: 'Mobile App UI',
      status: 'in progress',
      lastActive: 'Yesterday'
    },
    {
      id: 4,
      buyerName: 'Emma Rodriguez',
      buyerAvatar: '',
      lastMessage: 'Payment sent, thank you!',
      unread: 0,
      timestamp: '2 days ago',
      isActive: false,
      orderTitle: 'Social Media Graphics',
      status: 'completed',
      lastActive: '2 days ago'
    },
    {
      id: 5,
      buyerName: 'Design Agency Co.',
      buyerAvatar: '',
      lastMessage: 'We have a new project for you',
      unread: 0,
      timestamp: '3 days ago',
      isActive: false,
      orderTitle: 'Brochure Design',
      status: 'active',
      lastActive: '3 days ago'
    },
  ]);
  
  // State for active conversation
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  
  // State for messages
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I need a website redesign for my business', sender: 'buyer', time: '10:30 AM', status: 'read', avatar: '' },
    { id: 2, text: 'Sure, I can help with that. Do you have any specific design requirements?', sender: 'seller', time: '10:32 AM', status: 'read', avatar: '' },
    { id: 3, text: 'Yes, I want a modern look with a blue color scheme', sender: 'buyer', time: '10:35 AM', status: 'read', avatar: '' },
    { id: 4, text: 'Great, I can work with that. When do you need it by?', sender: 'seller', time: '10:40 AM', status: 'read', avatar: '' },
    { id: 5, text: 'Can you make these changes by tomorrow?', sender: 'buyer', time: '2:15 PM', status: 'delivered', avatar: '' },
  ]);
  
  // State for new message
  const [newMessage, setNewMessage] = useState('');
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for dropdown menu
  const [showDropdown, setShowDropdown] = useState(false);
  
  // State for showing search on mobile
  const [showSearch, setShowSearch] = useState(false);
  
  // State for loading
  const [isSending, setIsSending] = useState(false);
  
  // Ref for scrolling to bottom
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    setIsSending(true);
    
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'seller',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      avatar: ''
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Update conversation last message
    setConversations(conversations.map(conv => 
      conv.id === activeConversation.id 
        ? { ...conv, lastMessage: newMessage, timestamp: 'Just now', unread: 0 } 
        : conv
    ));
    
    // Simulate buyer response after a delay
    setTimeout(() => {
      const buyerResponse = {
        id: messages.length + 2,
        text: 'That sounds good to me!',
        sender: 'buyer',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        avatar: ''
      };
      setMessages(prev => [...prev, buyerResponse]);
      setIsSending(false);
    }, 1500);
  };
  
  // Handle key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Filter conversations based on search
  const filteredConversations = conversations.filter(convo => 
    convo.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    convo.orderTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Mark conversation as read
  const markAsRead = (id) => {
    setConversations(conversations.map(convo => 
      convo.id === id ? { ...convo, unread: 0 } : convo
    ));
  };
  
  // Archive conversation
  const archiveConversation = (id) => {
    setConversations(conversations.map(convo => 
      convo.id === id ? { ...convo, status: 'archived' } : convo
    ));
    setShowDropdown(false);
  };
  
  // Delete conversation
  const deleteConversation = (id) => {
    setConversations(conversations.filter(convo => convo.id !== id));
    setShowDropdown(false);
    
    // If deleting active conversation, set first one as active
    if (id === activeConversation.id && conversations.length > 1) {
      setActiveConversation(conversations[0].id === id ? conversations[1] : conversations[0]);
    }
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="bg-[#708238]/20 text-[#708238] text-xs px-2 py-0.5 rounded-full">Active</span>;
      case 'in progress':
        return <span className="bg-[#FFA500]/20 text-[#FFA500] text-xs px-2 py-0.5 rounded-full">In Progress</span>;
      case 'delivered':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Delivered</span>;
      case 'completed':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">Completed</span>;
      case 'archived':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">Archived</span>;
      default:
        return null;
    }
  };

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
            <button className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-4 py-2 rounded-full text-sm font-medium transition">
              New Message
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
          <button className="bg-[#708238] w-full hover:bg-[#5a6a2d] text-white px-4 py-2 rounded-full text-sm font-medium transition">
            New Message
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
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <FaArchive size={14} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
            
            {/* Conversation List */}
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    activeConversation.id === conversation.id 
                      ? 'bg-[#708238]/10 border border-[#708238]/20' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setActiveConversation(conversation);
                    markAsRead(conversation.id);
                  }}
                >
                  <div className="flex items-start">
                    <div className="relative mr-3">
                      {conversation.buyerAvatar ? (
                        <img 
                          src={conversation.buyerAvatar} 
                          alt={conversation.buyerName} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                      )}
                      {conversation.isActive && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#FFA500] rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-800 truncate">{conversation.buyerName}</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{conversation.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <span className="bg-[#FFA500] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-xs text-gray-500 truncate">{conversation.orderTitle}</span>
                        {getStatusBadge(conversation.status)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="hidden md:flex flex-col w-2/3">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="relative mr-3">
                  {activeConversation.buyerAvatar ? (
                    <img 
                      src={activeConversation.buyerAvatar} 
                      alt={activeConversation.buyerName} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                  )}
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#FFA500] rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">{activeConversation.buyerName}</h2>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <span>{activeConversation.lastActive}</span>
                    <span className="mx-1">•</span>
                    <div className="flex items-center">
                      <FaStar className="text-[#FFA500] mr-1" />
                      <span>4.9 (128 reviews)</span>
                    </div>
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
                    <button 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:text-[#FFA500]"
                      onClick={() => archiveConversation(activeConversation.id)}
                    >
                      <FaArchive className="mr-2 text-gray-500" /> Archive
                    </button>
                    <button 
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      onClick={() => deleteConversation(activeConversation.id)}
                    >
                      <FaTrash className="mr-2 text-red-500" /> Delete
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
                  <h3 className="font-semibold text-gray-800">{activeConversation.orderTitle}</h3>
                  <div className="flex items-center mt-1 text-sm">
                    <span className="text-gray-600">Order #123456</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="font-medium text-[#FFA500]">Due in 2 days</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-100">
                    View Order
                  </button>
                  <button className="text-sm font-medium text-[#708238] hover:text-[#5a6a2d] px-3 py-1 rounded-md hover:bg-[#708238]/10">
                    Deliver Again
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-end space-x-2">
                      {message.sender === 'buyer' && (
                        <div className="mb-1">
                          {message.avatar ? (
                            <img 
                              src={message.avatar} 
                              alt="avatar" 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                          )}
                        </div>
                      )}
                      
                      <div 
                        className={`max-w-md rounded-2xl px-4 py-3 ${
                          message.sender === 'seller' 
                            ? 'bg-[#708238] text-white rounded-br-none' 
                            : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div className={`flex items-center text-xs mt-2 ${
                          message.sender === 'seller' ? 'text-[#FFA500]' : 'text-gray-500'
                        }`}>
                          <span>{message.time}</span>
                          {message.sender === 'seller' && (
                            <span className="ml-2">
                              {message.status === 'sent' && <FaClock className="text-current" />}
                              {message.status === 'delivered' && <FaCheck className="text-current" />}
                              {message.status === 'read' && <FaCheckDouble className="text-[#FFA500]" />}
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
        </div>
        
        {/* Empty State for Mobile */}
        <div className="md:hidden flex-1 flex items-center justify-center bg-gray-50 p-8">
          <div className="text-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
            <p className="text-gray-500 mb-6">Select a conversation from the list to start messaging</p>
            <button className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-5 py-2 rounded-md text-sm font-medium">
              Start New Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerMessages;