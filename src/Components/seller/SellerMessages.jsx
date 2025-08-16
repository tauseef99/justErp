import React, { useState } from "react";
import { FiSearch, FiSend, FiPaperclip, FiSmile, FiMenu, FiX } from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";
import { BsThreeDotsVertical, BsStarFill } from "react-icons/bs";
import SellerLayout from "../../Pages/layouts/SellerLayout";

const SellerMessages = () => {
  const [message, setMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState("adzysgoods");
  const [showOrderPanel, setShowOrderPanel] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const conversations = [
    { username: "adzysgoods", unread: 2, lastMessage: "Can you please show me the updated UI?", time: "1:14 PM" },
    { username: "marketbuddy", unread: 0, lastMessage: "Thanks for the quick delivery!", time: "10:30 AM" },
    { username: "codeblaze", unread: 1, lastMessage: "I need some revisions", time: "Yesterday" },
    { username: "pixelflare", unread: 0, lastMessage: "The design looks great", time: "Yesterday" },
    { username: "trendystudio", unread: 0, lastMessage: "Let me check and get back", time: "May 20" },
    { username: "uxnova", unread: 3, lastMessage: "Can we schedule a call?", time: "May 19" },
    { username: "bizreach", unread: 0, lastMessage: "Payment sent", time: "May 18" },
    { username: "devdynamo", unread: 0, lastMessage: "Files received", time: "May 17" },
    { username: "designcore", unread: 0, lastMessage: "Looking forward to working together", time: "May 15" },
    { username: "motionpeak", unread: 0, lastMessage: "Order placed", time: "May 14" },
  ];

  const messages = {
    adzysgoods: [
      {
        sender: "adzysgoods",
        time: "1:14 PM",
        text: "Can you please show me the updated seller dashboard UI?",
        read: true
      },
      {
        sender: "you",
        time: "1:16 PM",
        text: "Sure, I'll share a screen recording within 10 minutes.",
        read: true
      },
      {
        sender: "adzysgoods",
        time: "1:20 PM",
        text: "Great! Also, can you include the new analytics section?",
        read: false
      }
    ],
    marketbuddy: [
      {
        sender: "marketbuddy",
        time: "10:30 AM",
        text: "Thanks for the quick delivery! The work looks excellent.",
        read: true
      },
      {
        sender: "you",
        time: "10:35 AM",
        text: "You're welcome! Let me know if you need anything else.",
        read: true
      }
    ]
  };

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
            {conversations.map((conversation, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveConversation(conversation.username);
                  setShowMobileMenu(false);
                }}
                className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
                  activeConversation === conversation.username
                    ? "bg-[#708238]/10 border border-[#708238]/20"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#708238] to-[#FFA500] flex items-center justify-center text-white font-bold text-lg">
                    {conversation.username[0].toUpperCase()}
                  </div>
                  {conversation.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FFA500] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">
                      {conversation.username}
                    </h4>
                    <span className="text-xs text-gray-400">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="border-b p-4 flex justify-between items-center bg-white sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#708238] to-[#FFA500] flex items-center justify-center text-white font-bold">
                {activeConversation[0].toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {activeConversation}
                </h3>
                <div className="flex items-center">
                  <BsStarFill className="text-[#FFA500] text-xs mr-1" />
                  <span className="text-xs text-gray-500">4.9 (128 reviews)</span>
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
            {messages[activeConversation]?.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "you" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[70%] lg:max-w-[60%] ${
                    msg.sender === "you" ? "text-right" : "text-left"
                  }`}
                >
                  <div className="flex items-center mb-1 space-x-2">
                    {msg.sender !== "you" && (
                      <span className="text-xs font-medium text-gray-700">
                        {msg.sender}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{msg.time}</span>
                    {msg.sender === "you" && msg.read && (
                      <IoCheckmarkDone className="text-xs text-[#708238]" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      msg.sender === "you"
                        ? "bg-[#708238] text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
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
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent text-sm"
              />
              <button
                disabled={!message}
                className={`p-3 rounded-full ${
                  message
                    ? "bg-[#708238] hover:bg-[#5a6a2d] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                } transition`}
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Order Info (Desktop) */}
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
                  <span className="text-sm font-medium text-gray-600">Order #</span>
                  <span className="text-sm font-semibold">FVRR123456</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Status</span>
                  <span className="text-sm font-semibold text-[#708238]">
                    In Progress
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Price</span>
                  <span className="text-sm font-semibold">$120</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Delivery</span>
                  <span className="text-sm font-semibold">2 days</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                About {activeConversation}
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">From:</span> United Kingdom
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Member since:</span> Dec 2021
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Avg. response time:</span> 1 hour
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    PLUS BUYER
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
              View Order Page
            </button>
          </div>
        </div>

        {/* Right Panel - Order Info (Mobile) */}
        {showOrderPanel && (
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
                  <span className="text-sm font-medium text-gray-600">Order #</span>
                  <span className="text-sm font-semibold">FVRR123456</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Status</span>
                  <span className="text-sm font-semibold text-[#708238]">
                    In Progress
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Price</span>
                  <span className="text-sm font-semibold">$120</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Delivery</span>
                  <span className="text-sm font-semibold">2 days</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  About {activeConversation}
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">From:</span> United Kingdom
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Member since:</span> Dec 2021
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Avg. response time:</span> 1 hour
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      PLUS BUYER
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      VERIFIED
                    </span>
                  </div>
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