import React, { useState } from "react";
import { FaUserCircle, FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import Navbar from "../Navbar";

export default function BuyerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "tauseef hussain",
    email: "tauseef@gmail.com",
    bio: "Senior procurement specialist with over 10 years of experience in global supply chain management. Focused on sustainable sourcing and building long-term vendor relationships.",
    company: "Global Trade Solutions Inc.",
    position: "Senior Procurement Manager",
    location: "New York, NY"
  });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile
  const handleSave = () => {
    console.log("Profile Saved:", formData, preview);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-lime-50 py-8 px-4 mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FFA500] to-[#708238] text-white p-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Professional Profile</h1>
                <p className="text-amber-100 mt-2">Manage your professional identity</p>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center bg-white text-[#FFA500] hover:bg-amber-50 font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 border border-white/30"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center bg-white text-[#FFA500] hover:bg-amber-50 font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {isEditing ? (
              /* EDIT MODE */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Sidebar - Profile Image */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-amber-50 to-lime-50 rounded-2xl p-6 shadow-lg">
                    {/* Profile Photo Section */}
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Profile Preview"
                            className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-2xl"
                          />
                        ) : (
                          <div className="w-40 h-40 bg-gradient-to-br from-amber-200 to-lime-300 rounded-full flex items-center justify-center shadow-2xl">
                            <FaUserCircle className="text-white text-6xl" />
                          </div>
                        )}
                        <label className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#FFA500] text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-amber-600 transition-all duration-300">
                          <FaCamera />
                          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                        </label>
                      </div>
                      <label className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-amber-200 transition font-medium">
                        Upload New Photo
                        <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                      </label>
                      
                      {/* Profile Completeness */}
                      <div className="mt-6 pt-6 border-t border-amber-200 w-full">
                        <div className="flex justify-between text-sm text-amber-700">
                          <span>Profile Completeness</span>
                          <span className="font-semibold">85%</span>
                        </div>
                        <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
                          <div className="bg-[#708238] h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Content - Form */}
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#FFA500] focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#FFA500] focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                        <input
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#FFA500] focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#FFA500] focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#FFA500] focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#FFA500] focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300 resize-vertical"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* VIEW MODE */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Sidebar - Profile Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-amber-50 to-lime-50 rounded-2xl p-6 shadow-lg text-center">
                    <div className="flex flex-col items-center mb-6">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Profile"
                          className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gradient-to-br from-amber-200 to-lime-300 rounded-full flex items-center justify-center shadow-xl">
                          <FaUserCircle className="text-white text-5xl" />
                        </div>
                      )}
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>
                    <p className="text-[#708238] font-medium">{formData.position}</p>
                    <p className="text-gray-600 text-sm mt-1">{formData.company}</p>
                    <p className="text-gray-500 text-sm mt-2">{formData.location}</p>
                    
                    <div className="mt-6 pt-6 border-t border-amber-200">
                      <div className="flex justify-between text-sm text-amber-700">
                        <span>Profile Completeness</span>
                        <span className="font-semibold">85%</span>
                      </div>
                      <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
                        <div className="bg-[#708238] h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Content - Profile Details */}
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-[#FFA500]">
                        <label className="block text-sm font-semibold text-amber-700 mb-2">Full Name</label>
                        <p className="text-lg font-medium text-gray-800">{formData.name}</p>
                      </div>
                      <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-[#FFA500]">
                        <label className="block text-sm font-semibold text-amber-700 mb-2">Email</label>
                        <p className="text-lg font-medium text-gray-800">{formData.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-[#FFA500]">
                        <label className="block text-sm font-semibold text-amber-700 mb-2">Position</label>
                        <p className="text-lg font-medium text-gray-800">{formData.position}</p>
                      </div>
                      <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-[#FFA500]">
                        <label className="block text-sm font-semibold text-amber-700 mb-2">Company</label>
                        <p className="text-lg font-medium text-gray-800">{formData.company}</p>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-[#FFA500]">
                      <label className="block text-sm font-semibold text-amber-700 mb-2">Location</label>
                      <p className="text-lg font-medium text-gray-800">{formData.location}</p>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-[#FFA500]">
                      <label className="block text-sm font-semibold text-amber-700 mb-2">Professional Bio</label>
                      <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}