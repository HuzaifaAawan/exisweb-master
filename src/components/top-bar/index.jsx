// components/Header.jsx
import React, { useState } from "react";
import "./styles.scss";
import headerLogo from "../../assets/icons/header_logo-removebg-preview.png";
import menuTopImage from "../../assets/icons/top_right.jpg";
import bannerBg from "../../assets/icons/Banner-bg.jpg"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      className="relative text-white bg-header-pattern"
      style={{
        backgroundImage: `url(${bannerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "120px",
        position: "relative",
        zIndex: "1",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: "1",
        }}
      ></div>
 
      <div
        className="hearder-container"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Logo & Department Name */}
        <div className="flex items-center flex-nowrap header-title">
          <img
            src={headerLogo}
            alt="Ictlogo"
            className="header-logo"
            height={97}
            width={84}
          />
          <div className="whitespace-nowrap ml-2">
            <h1 className="text-white heading">Excise & Taxation Department</h1>
            <h1 className="text-white heading">Islamabad Capital Territory</h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="header-right-items">
          <img src={menuTopImage} alt="menu-top-logo" className="rightImg" />
          <nav className="navigation-menu">
            <button className="nav-menu-item">Office Timings</button>
            <button className="nav-menu-item">Announcement</button>
            <button className="nav-menu-item">Tenders</button>
            <button className="nav-menu-item">Contact</button>
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="hidden laptop:block self-end mt-4">
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

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="mobile-menu-popup">
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