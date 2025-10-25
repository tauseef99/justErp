import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/images/logo-2.jpeg";
import SignInForm from "../Components/SignIn";
import { FaChevronRight, FaChevronLeft, FaBars, FaTimes } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import Modal from "./Modal";

const subNavItems = [
  "Trending 🔥",
  "S4/HANA Upgrade",
  "SAP ABAP",
  "S4/HANA Public Cloud",
  "ERP Migration",
  "NetSuite Customization",
  "SAP BASIS",
  "Crystal Reports",
  "MS365",
  "MS Dynamics",
  "ERP Upgrade",
  "BI/ BO",
  "Customize Reports",
  "Cloud Migration",
  "Oracle EBS",
  "Infor",
  "Acumatica",
  "ERP Training",
  "SAP Ariba",
  "JD Edward",
  "Project Management",
  "SAP Signavio",
  "SuccessFactors",
  "HCM",
  "Epicor",
  "Oddo",
];

const aboutDropdownItems = [
  { name: "How JustERPs works", path: "/how-it-works" },
  { name: "How to hire ERP Consultant", path: "/hire-consultant" },
  { name: "Join as Freelancer ERP Consultant", path: "/join-freelancer" },
  { name: "Personal Data Protection", path: "/data-protection" },
  { name: "Refer to a Consultant Bonus", path: "/refer-bonus" },
  { name: "Customer Support", path: "/customer-support" },
  { name: "Social Responsibility", path: "/social-responsibility" },
  { name: "Privacy Policy & Term of Use", path: "/privacy-policy" },
  { name: "Protecting Data in ERP Implementation", path: "/data-protection-erp" },
  { name: "Categories", path: "/categories" },
];

function Navbar() {
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

    // Close desktop dropdown on outside click
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

  const handleSubNavClick = (item) => {
    console.log(`Clicked: ${item}`);
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
    setShowAboutDropdownMobile(false); // close About when reopening menu
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
                <p>About</p>
                <FaChevronDown className="text-sm" />
              </div>
              
              {/* Dropdown Menu with increased hover area */}
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
                        handleSubNavClick(item.name);
                        setShowAboutDropdownDesktop(false);
                      }}
                    >
                      <FaChevronRight className="text-xs flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link to="/ourstory" className="text-[#62646A] cursor-pointer hover:text-[#FFA500] transition-colors">
                Our Story
              </Link>
            </div>

            <div className="relative flex items-center gap-2">
              <TfiWorld className="text-md text-[#62646A]" />

              <div className="relative">
                <select
                  defaultValue="EN"
                  onChange={(e) => {
                    console.log("Selected language:", e.target.value);
                  }}
                  className="pr-8 appearance-none bg-transparent border border-gray-300 rounded-md px-2 py-1 text-[#62646A] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFA500] cursor-pointer"
                  aria-label="Select language"
                >
                  <option value="EN">ENGLISH</option>
                  <option value="AR">URDU</option>
                  <option value="ZH">SPANISH</option>
                  <option value="AR">FRENCH</option>
                  <option value="ZH">ARABIC</option>
                </select>

                {/* Chevron icon — absolutely positioned and won't capture clicks */}
                <FaChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#62646A]" />
              </div>
            </div>

            <Link to="/erpconsultant" className="hover:text-[#FFA500] transition-colors">
              <p className="cursor-pointer hidden xl:block">
                Register as ERP Consultant
              </p>
              <p className="cursor-pointer xl:hidden">Become a Consultant</p>
            </Link>

            <p
              onClick={() => setShowSignInModal(true)}
              className="cursor-pointer hover:text-[#FFA500] transition-colors"
            >
              Sign in
            </p>

            <button
              className="text-black border border-black rounded-md px-3 md:px-5 py-1 md:py-2 hover:bg-[#FFA500] hover:text-white hover:border-[#FFA500] transition-colors duration-300"
              onClick={() => setShowSignInModal(true)}
            >
              Join
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="flex flex-col gap-0 w-full mt-4 lg:hidden font-semibold text-[#62646A] text-sm">
              {/* Mobile About Dropdown */}
              <div className="border-b">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() =>
                    setShowAboutDropdownMobile(!showAboutDropdownMobile)
                  }
                >
                  <span>About</span>
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
                          handleSubNavClick(item.name);
                          setShowAboutDropdownMobile(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        {item.name}
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
                Our Story
              </Link>

              <div className="flex items-center gap-2 p-4 border-b">
                <TfiWorld className="text-md" />
                <p>EN</p>
              </div>

              <Link
                to="/erpconsultant"
                className="p-4 border-b hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Register as ERP Consultant
              </Link>

              <div
                className="p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setShowSignInModal(true);
                  setIsMenuOpen(false);
                }}
              >
                Sign in
              </div>

              <button
                className="text-black border border-black rounded-md mx-4 my-2 px-4 py-3 w-fit hover:bg-[#FFA500] hover:text-white hover:border-[#FFA500] transition-colors"
                onClick={() => {
                  setShowSignInModal(true);
                  setIsMenuOpen(false);
                }}
              >
                Join
              </button>
            </div>
          )}
        </nav>

        {/* Sticky Sub Nav */}
        {isSticky && (
          <div className="sub-nav border-t border-b mt-2 py-2 bg-white">
            <div className="flex items-center max-w-7xl mx-auto px-4">
              {/* Left Arrow */}
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
                {subNavItems.map((item, index) => (
                  <p
                    key={index}
                    className="cursor-pointer flex-shrink-0 px-3 py-1 bg-[#708238]/20 text-[#708238] rounded-lg hover:bg-[#a3b56b] hover:text-white transition-colors text-xs sm:text-sm"
                    onClick={() => handleSubNavClick(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>

              {/* Right Arrow */}
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