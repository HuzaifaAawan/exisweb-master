// components/Header.jsx
import React, { useState } from "react";
import "./styles.scss"; // for background pattern
import headerLogo from "../../assets/icons/header_logo-removebg-preview.png";
import menuTopImage from "../../assets/icons/top_right.jpg"; // apni image ka path aur naam yahaan set karo

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="relative bg-green-800 text-white bg-header-pattern bg-cover bg-center">
      <div className="hearder-container">
        {/* Logo & Department Name */}
        <div className="flex items-center header-title">
          <img
            src={headerLogo}
            alt="Ictlogo"
            className="header-logo"
            height={97}
            width={84}
          />
          <div>
            <h1 className="text-white heading">Excise & Taxation Department</h1>
            <h1 className="text-white heading">Islamabad Capital Territory</h1>
          </div>
        </div>

        {/* Navigation with top image - Desktop only */}
        <div className="header-right-items">
            {/* Image Layer */}
            <img src={menuTopImage} alt="menu-top-logo" className="rightImg" />
          {/* Navigation Links */}
          <nav className="navigation-menu">
            <button className="nav-menu-item">Office Timings</button>
            <button className="nav-menu-item">Announcement</button>
            <button className="nav-menu-item">Tenders</button>
            <button className="nav-menu-item">Contact</button>
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
