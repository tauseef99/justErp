import React, { useState } from 'react';
import { FiBell, FiHelpCircle, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../Assets/images/logo-2.jpeg';

export default function SellerNavbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleDropdown = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#5a6a2d] px-4 py-3 shadow-sm flex justify-between items-center"
         style={{ backgroundColor: '#708238' }}>
      
      {/* Left - Logo and Mobile Menu Button */}
      <div className="flex items-center">
        <button 
          className="md:hidden text-white mr-3"
          onClick={toggleMobileMenu}
        >
          {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        <Link to="/seller/dashboard" className="min-w-[100px]">
          <img src={logo} alt="Logo" className="h-10 w-auto rounded object-cover" />
        </Link>
      </div>

      {/* Center - Navigation (Desktop) */}
      <ul className="hidden md:flex gap-6 text-white">
        <Link to="/seller/dashboard">
          <li className="hover:text-[#FFA500] cursor-pointer transition-colors">Dashboard</li>
        </Link>
        <Link to="#">
          <li className="hover:text-[#FFA500] cursor-pointer transition-colors">My Business</li>
        </Link>
        <Link to="#">
          <li className="hover:text-[#FFA500] cursor-pointer transition-colors">Orders</li>
        </Link>
        <Link to="#">
          <li className="hover:text-[#FFA500] cursor-pointer transition-colors">Settings</li>
        </Link>
      </ul>

      {/* Right - Icons */}
      <div className="flex items-center gap-3 md:gap-5 relative">
        {/* Balance */}
        <span className="text-sm font-semibold px-3 py-1 rounded-md border border-[#FFA500] bg-[#FFA500] text-white hidden md:block">
          $114.40
        </span>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="relative focus:outline-none p-2 hover:bg-[#5a6a2d] rounded-full"
          >
            <FiBell className="w-5 h-5 text-white hover:text-[#FFA500]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFA500] rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="p-4 border-b font-semibold text-gray-700">Notifications</div>
              <ul className="max-h-60 overflow-y-auto">
                <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer">
                  🎉 New order received!
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer">
                  💬 You've got a new message.
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer">
                  📈 Your gig performance has improved.
                </li>
              </ul>
              <div className="px-4 py-2 text-center text-sm text-[#FFA500] hover:underline cursor-pointer">
                View All Notifications
              </div>
            </div>
          )}
        </div>

        {/* Mail */}
        <Link to="/seller/messages">
          <button className="relative group p-2 hover:bg-[#5a6a2d] rounded-full">
            <FiMail className="w-5 h-5 text-white group-hover:text-[#FFA500]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFA500] rounded-full"></span>
          </button>
        </Link>

        {/* Help Icon */}
        <FiHelpCircle className="w-5 h-5 text-white hover:text-[#FFA500] cursor-pointer hidden md:block" />

        {/* Profile Image */}
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
          alt="User"
          className="w-8 h-8 rounded-full object-cover border border-white hidden md:block"
        />
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-[#708238] z-40 pt-16 px-4">
          <div className="flex flex-col gap-6 py-6">
            <Link 
              to="/seller/dashboard" 
              className="text-white hover:text-[#FFA500] text-lg py-2 border-b border-[#5a6a2d]"
              onClick={toggleMobileMenu}
            >
              Dashboard
            </Link>
            <Link 
              to="#" 
              className="text-white hover:text-[#FFA500] text-lg py-2 border-b border-[#5a6a2d]"
              onClick={toggleMobileMenu}
            >
              My Business
            </Link>
            <Link 
              to="#" 
              className="text-white hover:text-[#FFA500] text-lg py-2 border-b border-[#5a6a2d]"
              onClick={toggleMobileMenu}
            >
              Orders
            </Link>
            <Link 
              to="#" 
              className="text-white hover:text-[#FFA500] text-lg py-2 border-b border-[#5a6a2d]"
              onClick={toggleMobileMenu}
            >
              Settings
            </Link>
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-semibold px-3 py-1 rounded-md border border-[#FFA500] bg-[#FFA500] text-white">
                $114.40
              </span>
              
              <div className="flex gap-4">
                <FiHelpCircle className="w-5 h-5 text-white hover:text-[#FFA500] cursor-pointer" />
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border border-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}