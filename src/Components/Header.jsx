import React, { useRef, useState } from "react";
import { FaArrowRight, FaSearch, FaPause, FaPlay } from "react-icons/fa";
import heroVideo from "../Assets/videos/Header-bg.mp4"; 

const HeroHeader = () => {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const tags = [
    "SAP Consulting",
    "Microsoft Dynamics",
    "Oracle ERP",
    "ERP Development",
    "NetSuite Customization",
    "Cloud Migration",
  ];

  const trustedBy = ["Google", "NETFLIX", "P&G", "PayPal", "Payoneer"];

  return (
    <header className="relative w-full xl:h-screen min-h-screen overflow-hidden">
    {/* Background Video */}
    <video
      ref={videoRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={heroVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  
    {/* Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
  
    {/* Content */}
    <div className="relative z-20 flex flex-col max-w-7xl mx-auto justify-center h-full px-4 text-white">
      {/* Heading */}
      <h1 className="text-4xl md:text-7xl mb-8 text-center pt-[200px]">
        Your first meeting with
        <br />
        ERP Consultant starts Here!
      </h1>
  
      {/* Filters Box */}
      {/* Filters Box */}
<div className="w-[80%] mx-auto p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end text-gray-800 shadow-lg rounded-lg border-[4pt] border-[#FFA500] bg-black/40">
  {/* ERP System Dropdown */}
  <div>
    <p className="pb-3 font-semibold text-center text-white">Select ERP</p>
    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ACC8F]">
      <option value="">Choose ERP System</option>
      <option value="sap">SAP</option>
      <option value="oracle">Oracle</option>
      <option value="microsoft">Microsoft Dynamics</option>
    </select>
  </div>

  {/* Module Dropdown */}
  <div>
    <p className="pb-3 font-semibold text-center text-white">Select Module</p>
    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ACC8F]">
      <option value="">Choose Module</option>
      <option value="finance">Finance</option>
      <option value="hr">Human Resources</option>
      <option value="inventory">Inventory</option>
    </select>
  </div>

  {/* Experience Dropdown */}
  <div>
    <p className="pb-3 font-semibold text-center text-white">Consultant Experience</p>
    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ACC8F]">
      <option value="">Experience Level</option>
      <option value="0-1">0-1 Year</option>
      <option value="2-4">2-4 Years</option>
      <option value="5+">5+ Years</option>
    </select>
  </div>

  {/* Search Button */}
  <div className="flex justify-center">
    <button className="flex justify-center items-center gap-2 bg-[#FFA500] hover:bg-[#cc8400] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200">
      Find Consultants
    </button>
  </div>
</div>

  
      {/* Popular Tags */}
      {/* <div className="mt-6 text-sm flex gap-4 flex-wrap justify-center">
        {tags.map((tag, index) => (
          <a
            key={index}
            href=""
            className="flex items-center gap-3 border border-white px-4 rounded-md backdrop-blur bg-white/10 py-2 cursor-pointer"
          >
            {tag} <FaArrowRight />
          </a>
        ))}
      </div> */}
  
      {/* Trusted By & Pause Button */}
      {/* <div className="sm:flex justify-between items-center mt-20">
        <div className="sm:flex items-center gap-8 text-lg">
          <p>Trusted by:</p>
          {trustedBy.map((brand, index) => (
            <p key={index} className="pt-3 sm:pt-0">{brand}</p>
          ))}
        </div>
  
        <div
          className="bg-[#404145] rounded-full sm:mt-0 mt-8 ml-auto cursor-pointer h-12 w-12 flex items-center justify-center"
          onClick={handleVideoToggle}
        >
          {isPaused ? (
            <FaPlay className="text-white text-lg" />
          ) : (
            <FaPause className="text-white text-lg" />
          )}
        </div>
      </div> */}
    </div>
  </header>
  
  );
};

export default HeroHeader;
