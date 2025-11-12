import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPause, FaPlay } from "react-icons/fa";
import heroVideo from "../Assets/videos/Header-bg.mp4";

const HeroHeader = () => {
  const { t } = useTranslation();
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

  const industryOptions = [
    "Aerospace & Defense", "Agriculture", "Apparel & Footwear",
    "Architecture, Engineering & Construction (AEC)", "Automotive",
    "Banking & Financial Services", "Biotechnology", "Breweries & Distilleries",
    "Building Materials", "Chemicals", "Construction", "Consumer Goods",
    "Consulting Services", "Cosmetics & Personal Care", "Defense & Security",
    "Distribution", "Dairy & Food Processing", "Education", "Electronics & High-Tech",
    "Energy & Utilities", "Engineering, Construction and Operations",
    "Entertainment & Media", "Environmental Services", "Facilities Management",
    "Fashion & Textiles", "Food & Beverage", "Forestry", "Freight & Logistics",
    "Government & Public Sector", "Glass & Ceramics", "Grocery & Retail Chains",
    "Healthcare", "Hospitality", "Human Resources Services", "Higher Education & Research",
    "High Tech", "Industrial Machinery & Equipment", "Information Technology (IT)",
    "Insurance", "Interior Design", "Inventory Management & Warehousing",
    "Jewelry Manufacturing & Retail", "Legal Services", "Life Sciences",
    "Logistics & Transportation", "Machinery & Equipment",
    "Manufacturing (Discrete, Process, or Mixed)", "Marine & Shipbuilding",
    "Media & Publishing", "Metals & Mining", "Mill Products", "Oil & Gas",
    "Packaging", "Paper & Pulp", "Pharmaceuticals", "Plastics & Rubber",
    "Printing & Publishing", "Professional Services", "Public Sector",
    "Real Estate & Property Management", "Renewable Energy", "Retail",
    "Rubber & Plastics", "Semiconductor Industry", "Service Providers",
    "Shipbuilding", "Sports & Entertainment", "Steel & Metal Fabrication",
    "Telecommunications", "Textile Manufacturing", "Transportation",
    "Travel & Tourism", "Utilities", "Vehicle Manufacturing & Parts",
    "Veterinary & Animal Care", "Warehousing & Distribution",
    "Waste Management", "Wholesale", "Yarn & Fabric Production",
  ];

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
        {t('browser_not_supported', 'Your browser does not support the video tag.')}
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col max-w-7xl mx-auto justify-center h-full px-4 text-white">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8 text-center pt-20 md:pt-32 lg:pt-[200px]">
          {t('hero_title')}
        </h1>

        {/* Filters Box */}
        <div className="w-full md:w-[90%] lg:w-[80%] mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 items-end text-gray-800 shadow-lg rounded-lg border-[3pt] sm:border-[4pt] border-[#FFA500] bg-black/40">

          {/* ERP System Input */}
          <div>
            <p className="pb-2 font-semibold text-center text-white text-sm sm:text-base">
              {t('select_erp')}
            </p>
            <input
              list="erpOptions"
              placeholder={t('erp_placeholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ACC8F] text-sm sm:text-base"
            />
            <datalist id="erpOptions">
              <option value={t('erp_sap')} />
              <option value={t('erp_oracle')} />
              <option value={t('erp_microsoft_dynamics')} />
            </datalist>
          </div>

          {/* Module Input */}
          <div>
            <p className="pb-2 font-semibold text-center text-white text-sm sm:text-base">
              {t('select_module')}
            </p>
            <input
              list="moduleOptions"
              placeholder={t('module_placeholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ACC8F] text-sm sm:text-base"
            />
            <datalist id="moduleOptions">
              <option value={t('module_finance')} />
              <option value={t('module_hr')} />
              <option value={t('module_inventory')} />
            </datalist>
          </div>

          {/* Industry Input */}
          <div>
            <p className="pb-2 font-semibold text-center text-white text-sm sm:text-base">
              {t('select_industry')}
            </p>
            <input
              list="industryOptions"
              placeholder={t('industry_placeholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ACC8F] text-sm sm:text-base"
            />
            <datalist id="industryOptions">
              {industryOptions.map((industry, idx) => (
                <option key={idx} value={industry} />
              ))}
            </datalist>
          </div>

          {/* Experience Dropdown */}
          <div>
            <p className="pb-2 font-semibold text-center text-white text-sm sm:text-base">
              {t('consultant_experience')}
            </p>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ACC8F] text-sm sm:text-base">
              <option value="">{t('experience_placeholder')}</option>
              <option value="0-1">{t('experience_0_1')}</option>
              <option value="2-4">{t('experience_2_4')}</option>
              <option value="5-10">{t('experience_5_10')}</option>
              <option value="10+">{t('experience_10_plus')}</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-2 sm:mt-0">
            <button className="flex justify-center items-center gap-2 bg-[#FFA500] hover:bg-[#cc8400] text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base w-full sm:w-auto">
              {t('find_consultants')}
            </button>
          </div>
        </div>

        {/* Video Control (Mobile Only) */}
        <div className="fixed bottom-4 right-4 z-30 md:hidden">
          <button
            onClick={handleVideoToggle}
            className="p-3 bg-black/50 rounded-full text-white"
            aria-label={isPaused ? t('play_video') : t('pause_video')}
          >
            {isPaused ? <FaPlay size={20} /> : <FaPause size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;