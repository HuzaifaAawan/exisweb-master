// components/Header.jsx
import React, { useState } from "react";
import "./styles.scss"; // for background pattern
import headerLogo from '../../assets/icons/header_logo-removebg-preview.png';
import menuTopImage from '../../assets/icons/top_right.jpg'; // apni image ka path aur naam yahaan set karo


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="relative bg-green-800 text-white bg-header-pattern bg-cover bg-center">
      <div className="relative flex flex-col md:flex-row items-start md:items-start px-4 py-4 md:px-8 min-h-[100px]">
        
        {/* Logo & Department Name */}
        <div className="flex items-center space-x-4 w-full md:w-auto font-inter">
          <img
            src={headerLogo}
            alt="Ictlogo"
            className="w-28 h-28 object-contain"
          />
          <div>
            <h1 className="text-white text-[26px] font-bold leading-[49px] font-[Inter] text-left">
              Excise & Taxation Department
            </h1>
            <h1 className="text-white text-[26px] font-bold leading-[1.5] font-[Inter]">
              Islamabad Capital Territory
            </h1>
          </div>
        </div>

        {/* Navigation with top image - Desktop only */}
        <div className="hidden md:flex flex-col items-end space-y-2 absolute bottom-2 right-0">
          
         <div className="relative w-[325px] h-[110px] ml-[250px] rounded overflow-hidden">
            {/* Gradient Layer */}
           <div className="absolute inset-0 bg-gradient-to-r from-[#0a4247] via-[#179a66] to-[#179a66] opacity-80 z-0" />

            {/* Image Layer */}
             <img
  src={menuTopImage}
  alt="menu-top-logo"
  className=" menu-top-logo w-full h-full object-contain opacity-90 relative z-30"
/>
             </div>
          {/* Navigation Links */}
          <nav className="flex space-x-6 text-sm font-medium px-8">
            <button className="hover">Office Timings</button>
            <button className="hover">Announcement</button>
            <button className="hover">Tenders</button>
            <button className="hover">Contact</button>
          </nav>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden self-end mt-4">
          <button className="focus:outline-none" onClick={toggleMenu}>
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Links */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium  px-3">
         <button className="block hover">Office Timings</button>
         <button className="block hover">Announcement</button>
         <button className="block hover">Tenders</button>
         <button className="block hover">Contact</button>
        </div>
      )}
    </header>
  );
};

export default Header;
