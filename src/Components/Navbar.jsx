import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../Assets/images/logo-2.jpeg";
import SignInForm from "../Components/SignIn";
import { FaChevronRight, FaChevronLeft, FaBars, FaTimes } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import Modal from "./Modal";

// Updated subNavItems to use translation keys
const subNavItems = [
  "trending",
  "s4_hana_upgrade",
  "sap_abap",
  "s4_hana_cloud",
  "erp_migration",
  "netsuite_customization",
  "sap_basis",
  "crystal_reports",
  "ms365",
  "ms_dynamics",
  "erp_upgrade",
  "bi_bo",
  "customize_reports",
  "cloud_migration",
  "oracle_ebs",
  "infor",
  "acumatica",
  "erp_training",
  "sap_ariba",
  "jd_edward",
  "project_management",
  "sap_signavio",
  "successfactors",
  "hcm",
  "epicor",
  "oddo",
];

// Updated aboutDropdownItems to use translation keys
const aboutDropdownItems = [
  { key: "how_erp_works", path: "/how/erp/works" },
  { key: "hire_erp_consultant", path: "/erpconsultant" },
  { key: "join_freelancer", path: "/join/as/consultant" },
  { key: "data_protection", path: "/personal/data/protection" },
  { key: "referral_bonus", path: "/referral/bonus" },
  { key: "customer_support", path: "/customer/services" },
  { key: "social_responsibility", path: "/social/responsibility" },
  { key: "privacy_policy", path: "/terms/services" },
  { key: "data_protection_erp", path: "/data-protection-erp" },
  { key: "categories", path: "/categories" },
];

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAboutDropdownDesktop, setShowAboutDropdownDesktop] = useState(false);
  const [showAboutDropdownMobile, setShowAboutDropdownMobile] = useState(false);

  const subNavRef = useRef(null);
  const aboutDropdownRef = useRef(null);
  const aboutButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    const handleClickOutside = (event) => {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target) &&
        aboutButtonRef.current &&
        !aboutButtonRef.current.contains(event.target)
      ) {
        setShowAboutDropdownDesktop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubNavClick = (itemKey) => {
    console.log(`Clicked: ${t(itemKey)}`);
  };

  const handleChevronClick = () => {
    if (subNavRef.current) {
      subNavRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const handleChevronLeftClick = () => {
    if (subNavRef.current) {
      subNavRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowAboutDropdownMobile(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguageName = () => {
    const languages = {
      en: "English",
      de: "Deutsch",
      es: "Español",
      fr: "Français",
      pt: "Português",
      it: "Italiano",
      nl: "Nederlands",
      ar: "العربية"
    };
    return languages[i18n.language] || "English";
  };

  return (
    <>
      <div className="pt-4 bg-white fixed w-full z-50 shadow-sm">
        <nav className="max-w-7xl px-4 sm:px-6 pb-4 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          {/* Logo + Hamburger */}
          <div className="w-full lg:w-max flex items-center justify-between lg:justify-start">
            <Link to="/" className="flex items-center">
              <img src={logo} className="w-36 md:w-48 rounded-lg" alt="Logo" />
            </Link>
            <button
              className="text-2xl lg:hidden text-gray-700"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex gap-2 xl:gap-6 font-semibold items-center text-[#62646A] text-sm xl:text-[15px] relative">
            {/* About Dropdown (Desktop) */}
            <div className="relative" ref={aboutDropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => setShowAboutDropdownDesktop(true)}
                ref={aboutButtonRef}
              >
                <p>{t('about')}</p>
                <FaChevronDown className="text-sm" />
              </div>
              
              {showAboutDropdownDesktop && (
                <div 
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-64 z-50 border border-gray-200"
                  onMouseEnter={() => setShowAboutDropdownDesktop(true)}
                  onMouseLeave={() => setShowAboutDropdownDesktop(false)}
                >
                  {aboutDropdownItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-[#62646A] hover:bg-[#FFA500] hover:text-white transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        handleSubNavClick(item.key);
                        setShowAboutDropdownDesktop(false);
                      }}
                    >
                      <FaChevronRight className="text-xs flex-shrink-0" />
                      <span className="truncate">{t(item.key)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link to="/ourstory" className="text-[#62646A] cursor-pointer hover:text-[#FFA500] transition-colors">
                {t('our_story')}
              </Link>
            </div>

            <div className="relative flex items-center gap-2">
              <TfiWorld className="text-md text-[#62646A]" />

              <div className="relative">
                <select
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="pr-8 appearance-none bg-transparent border border-gray-300 rounded-md px-2 py-1 text-[#62646A] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFA500] cursor-pointer"
                  aria-label="Select language"
                >
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="pt">Português</option>
                  <option value="it">Italiano</option>
                  <option value="nl">Nederlands</option>
                  <option value="ar">العربية</option>
                </select>

                <FaChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#62646A]" />
              </div>
            </div>

            <Link to="/erpconsultant" className="hover:text-[#FFA500] transition-colors">
              <p className="cursor-pointer hidden xl:block">
                {t('register_consultant')}
              </p>
              <p className="cursor-pointer xl:hidden">{t('become_consultant')}</p>
            </Link>

            <p
              onClick={() => setShowSignInModal(true)}
              className="cursor-pointer hover:text-[#FFA500] transition-colors"
            >
              {t('sign_in')}
            </p>

            <button
              className="text-black border border-black rounded-md px-3 md:px-5 py-1 md:py-2 hover:bg-[#FFA500] hover:text-white hover:border-[#FFA500] transition-colors duration-300"
              onClick={() => setShowSignInModal(true)}
            >
              {t('join')}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="flex flex-col gap-0 w-full mt-4 lg:hidden font-semibold text-[#62646A] text-sm">
              {/* Mobile About Dropdown */}
              <div className="border-b">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => setShowAboutDropdownMobile(!showAboutDropdownMobile)}
                >
                  <span>{t('about')}</span>
                  <FaChevronDown
                    className={`transition-transform ${
                      showAboutDropdownMobile ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {showAboutDropdownMobile && (
                  <div className="bg-gray-50 border-t">
                    {aboutDropdownItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="block py-3 px-6 text-sm text-[#62646A] border-b border-gray-100 last:border-b-0 hover:bg-[#FFA500] hover:text-white transition-colors"
                        onClick={() => {
                          handleSubNavClick(item.key);
                          setShowAboutDropdownMobile(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        {t(item.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/ourstory"
                className="p-4 border-b hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('our_story')}
              </Link>

              <div className="flex items-center gap-2 p-4 border-b">
                <TfiWorld className="text-md" />
                <p>{getCurrentLanguageName()}</p>
              </div>

              <Link
                to="/erpconsultant"
                className="p-4 border-b hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('register_consultant')}
              </Link>

              <div
                className="p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setShowSignInModal(true);
                  setIsMenuOpen(false);
                }}
              >
                {t('sign_in')}
              </div>

              <button
                className="text-black border border-black rounded-md mx-4 my-2 px-4 py-3 w-fit hover:bg-[#FFA500] hover:text-white hover:border-[#FFA500] transition-colors"
                onClick={() => {
                  setShowSignInModal(true);
                  setIsMenuOpen(false);
                }}
              >
                {t('join')}
              </button>
            </div>
          )}
        </nav>

        {/* Sticky Sub Nav */}
        {isSticky && (
          <div className="sub-nav border-t border-b mt-2 py-2 bg-white">
            <div className="flex items-center max-w-7xl mx-auto px-4">
              <button
                onClick={handleChevronLeftClick}
                className="mr-2 text-gray-600 hover:text-[#FFA500] transition-colors flex-shrink-0 hidden sm:block"
                aria-label="Scroll left"
              >
                <FaChevronLeft className="text-sm" />
              </button>

              <div
                className="flex overflow-x-auto lg:gap-4 gap-2 scrollbar-hide text-[#62646A] whitespace-nowrap w-full"
                ref={subNavRef}
              >
                {subNavItems.map((itemKey, index) => (
                  <p
                    key={index}
                    className="cursor-pointer flex-shrink-0 px-3 py-1 bg-[#708238]/20 text-[#708238] rounded-lg hover:bg-[#a3b56b] hover:text-white transition-colors text-xs sm:text-sm"
                    onClick={() => handleSubNavClick(itemKey)}
                  >
                    {t(itemKey)}
                  </p>
                ))}
              </div>

              <button
                onClick={handleChevronClick}
                className="ml-2 text-gray-600 hover:text-[#FFA500] transition-colors flex-shrink-0 hidden sm:block"
                aria-label="Scroll right"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sign In Modal */}
      {showSignInModal && (
        <Modal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)}>
          <SignInForm />
        </Modal>
      )}
    </>
  );
}

export default Navbar;