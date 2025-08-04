import React, { useState } from 'react';
import { FiBell, FiHelpCircle, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../Assets/images/logo.jpeg';

export default function SellerNavbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleDropdown = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 shadow-sm flex justify-between items-center">

      {/* Left - Logo */}
      <Link to="/seller/dashboard" className="min-w-[100px]">
  <img src={logo} alt="Logo" className="h-10 w-auto rounded object-cover" />
</Link>

      {/* Center - Navigation */}
      <ul className="flex gap-6 text-gray-500">
        <Link to="/seller/dashboard">
          <li className="hover:text-black cursor-pointer">Dashboard</li>
        </Link>
        <Link to="#">
          <li className="hover:text-black cursor-pointer">My Business</li>
        </Link>
        <Link to="#">
          <li className="hover:text-black cursor-pointer">Orders</li>
        </Link>
        <Link to="#">
          <li className="hover:text-black cursor-pointer">Settings</li>
        </Link>
      </ul>

      {/* Right - Icons */}
      <div className="flex items-center gap-5 relative">
        {/* Balance */}
        <span className="text-sm font-semibold px-3 py-1 rounded-md border bg-gray-100 text-gray-800">
          $114.40
        </span>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="relative focus:outline-none"
          >
            <FiBell className="w-5 h-5 text-gray-600 hover:text-black" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="p-4 border-b font-semibold text-gray-700">Notifications</div>
              <ul className="max-h-60 overflow-y-auto">
                <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer">
                  🎉 New order received!
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer">
                  💬 You’ve got a new message.
                </li>
                <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer">
                  📈 Your gig performance has improved.
                </li>
              </ul>
              <div className="px-4 py-2 text-center text-sm text-blue-600 hover:underline cursor-pointer">
                View All Notifications
              </div>
            </div>
          )}
        </div>

        {/* Mail */}
        <Link to="/seller/messages">
          <button className="relative group">
            <FiMail className="w-5 h-5 text-gray-600 group-hover:text-black" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>
        </Link>

        {/* Help Icon */}
        <FiHelpCircle className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />

        {/* Profile Image */}
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
          alt="User"
          className="w-8 h-8 rounded-full object-cover border border-gray-200"
        />
      </div>
    </nav>
  );
}
