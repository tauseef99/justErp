import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { 
  SiSap, 
  SiOracle, 
  SiSage, 
  SiSalesforce,
  SiWorkplace,  
  SiNetapp,  
  SiOpenai,   
} from "react-icons/si";

import { 
  FaMicrosoft, 
  FaCog, 
  FaChevronLeft, 
  FaChevronRight, 
  FaPeopleCarry  
} from "react-icons/fa";

import { GiGears } from "react-icons/gi";

function Popularservices() {
  const { t } = useTranslation();
  const sliderRef = useRef(null);

  // Updated platforms array to use translation keys
  const platforms = [
    { key: "erp_sap", icon: <SiSap className="text-green-800 text-6xl mx-auto" /> },
    { key: "erp_oracle", icon: <SiOracle className="text-red-600 text-6xl mx-auto" /> },
    { key: "erp_microsoft", icon: <FaMicrosoft className="text-blue-600 text-6xl mx-auto" /> },
    { key: "erp_sage", icon: <SiSage className="text-green-600 text-6xl mx-auto" /> },
    { key: "erp_infor", icon: <FaCog className="text-gray-600 text-6xl mx-auto" /> },
    { key: "erp_salesforce", icon: <SiSalesforce className="text-sky-600 text-6xl mx-auto" /> },
    { key: "erp_workday", icon: <SiWorkplace className="text-indigo-600 text-6xl mx-auto" /> },
    { key: "erp_netsuite", icon: <SiNetapp className="text-blue-400 text-6xl mx-auto" /> },
    { key: "erp_epicor", icon: <GiGears className="text-orange-500 text-6xl mx-auto" /> },
    { key: "erp_jd_edwards", icon: <FaCog className="text-red-500 text-6xl mx-auto" /> },
    { key: "erp_peoplesoft", icon: <FaPeopleCarry className="text-purple-600 text-6xl mx-auto" /> },
    { key: "erp_odoo", icon: <SiOpenai className="text-pink-600 text-6xl mx-auto" /> },
  ];

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 relative">
      <h2 className="text-3xl lg:text-5xl">{t('global_erps')}</h2>

      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-orange-500 hover:text-orange-600 transition cursor-pointer"
        aria-label={t('scroll_left')}
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-orange-500 hover:text-orange-600 transition cursor-pointer"
        aria-label={t('scroll_right')}
      >
        <FaChevronRight size={20} />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="mt-10 flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="min-w-[160px] bg-[#708238] rounded-2xl text-center pt-4 hover:bg-[#FFA500] cursor-pointer transition-colors"
          >
            <h3 className="text-white font-semibold text-lg pt-4">
              {t(platform.key)}
            </h3>
            <div className="bg-white m-4 rounded-2xl mt-6 py-6 flex justify-center items-center">
              {platform.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popularservices;