import React, { useEffect, useRef, useState } from "react";
import logo from "../Assets/images/logo.jpeg";
import SignInForm from "../Components/SignIn";
import { FaChevronRight, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";


import Modal from "./Modal";

const subNavItems = [
  "Trending 🔥",
  "Graphics & Design",
  "Programming & Tech",
  "Digital Marketing",
  "Video & Animation",
  "Writing & Translation",
  "Music & Audio",
  "Business",
  "Finance",
];

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const subNavRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubNavClick = (item) => {
    console.log(`Clicked: ${item}`);
  };

  const handleChevronClick = () => {
    if (subNavRef.current) {
      subNavRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="pt-4 bg-white fixed w-full z-50 shadow-sm">
        <nav className="max-w-7xl px-4 pb-4 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          {/* Logo + Hamburger */}
          <div className="w-full lg:w-max flex items-center justify-between lg:justify-start">
            <img src={logo} className="w-48 rounded-lg" />
            <button
              className="text-2xl lg:hidden text-gray-700"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

      
          {/* Desktop Nav Items */}
          <div className="hidden lg:flex gap-2 xl:gap-6 font-semibold items-center text-[#62646A] text-sm xl:text-[15px]">
            <div className="flex items-center gap-2">
              <p className="text-[#62646A]">Our Story</p>
           <FaChevronDown className="text-sm" />
            </div>
            <div className="flex items-center gap-2">
              <p>Explore</p>
              <FaChevronDown className="text-sm" />
            </div>
            <div className="flex items-center gap-2">
              <TfiWorld className="text-md" />
              <p>EN</p>
            </div>
            <p>Become a seller</p>
            <p
              onClick={() => setShowSignInModal(true)}
              className="cursor-pointer"
            >
              Sign in
            </p>

            <button className="text-black border border-black rounded-md px-5 py-2" onClick={() => setShowSignInModal(true)}>
              Join
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="flex flex-col gap-4 w-full mt-4 lg:hidden font-semibold text-[#62646A] text-sm">
              <div className="flex items-center gap-2">
                <p className="text-black">justERPs Pro</p>
                <FaChevronDown className="text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <p>Explore</p>
                <FaChevronDown className="text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <TfiWorld className="text-md" />
                <p>EN</p>
              </div>
              <p>Become a seller</p>
              <p onClick={() => setShowSignInModal(true)}>Sign in</p>
              <button className="text-black border border-black rounded-md px-4 py-1 w-fit">
                Join
              </button>
            </div>
          )}
        </nav>

        {isSticky && (
          <div className="sub-nav border-t border-b mt-2 py-2 bg-white">
            <div className="flex items-center max-w-7xl mx-auto px-4">
              <div
                className="flex overflow-x-auto lg:gap-10 gap-4 scrollbar-hide text-[#62646A] whitespace-nowrap w-full"
                ref={subNavRef}
              >
                {subNavItems.map((item, index) => (
                  <p
                    key={index}
                    className="cursor-pointer flex-shrink-0"
                    onClick={() => handleSubNavClick(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>
              <button
                onClick={handleChevronClick}
                className="ml-2 text-gray-600 flex-shrink-0"
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
        <Modal
          isOpen={showSignInModal}
          onClose={() => setShowSignInModal(false)}
        >
          <SignInForm />
        </Modal>
      )}
    </>
  );
}

export default Navbar;
