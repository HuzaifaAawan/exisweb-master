<<<<<<< HEAD
// components/Header.jsx
import React, { useState } from "react";
import "./styles.scss"; // only if you have custom CSS for background image
import headerLogo from '../../assets/icons/header_logo-removebg-preview.png';
 // ✅ Correct import

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-green-800 text-white bg-header-pattern bg-cover bg-center">
      <div className="flex justify-between items-center px-4 py-4 md:px-8">
        <div className="flex items-center space-x-4">
            <img
  src={headerLogo}
  alt="Ictlogo"
  // className="Ictlogo  FLOGO-1 h-10 w-10"
  style={{ width: '4.11rem', height: '4.8rem' }} // ✅ width & height together
/>


          <div>
            <h1 className="text-base md:text-lg font-semibold">
              Excise & Taxation Department
            </h1>
            <p className="text-xs md:text-sm">Islamabad Capital Territory</p>
          </div>
        </div>

        {/* Right Side - Navigation for larger screens */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:underline">
            Office Timings
          </a>
          <a href="#" className="hover:underline">
            Announcement
          </a>
          <a href="#" className="hover:underline">
            Tenders
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              // Close icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon
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

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium">
          <a href="#" className="block hover:underline">
            Office Timings
          </a>
          <a href="#" className="block hover:underline">
            Announcement
          </a>
          <a href="#" className="block hover:underline">
            Tenders
          </a>
          <a href="#" className="block hover:underline">
            Contact
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
=======
// components/Header.jsx
import React, { useState } from "react";
import "./styles.scss"; // only if you have custom CSS for background image

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-green-800 text-white bg-header-pattern bg-cover bg-center">
      <div className="flex justify-between items-center px-4 py-4 md:px-8">
        <div className="flex items-center space-x-4">
          <img
            src="/logo.png" // replace with your logo path
            alt="ICT Logo"
            className="h-10 w-auto"
          />
          <div>
            <h1 className="text-base md:text-lg font-semibold">
              Excise & Taxation Department
            </h1>
            <p className="text-xs md:text-sm">Islamabad Capital Territory</p>
          </div>
        </div>

        {/* Right Side - Navigation for larger screens */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:underline">
            Office Timings
          </a>
          <a href="#" className="hover:underline">
            Announcement
          </a>
          <a href="#" className="hover:underline">
            Tenders
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              // Close icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon
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

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium">
          <a href="#" className="block hover:underline">
            Office Timings
          </a>
          <a href="#" className="block hover:underline">
            Announcement
          </a>
          <a href="#" className="block hover:underline">
            Tenders
          </a>
          <a href="#" className="block hover:underline">
            Contact
          </a>
        </div>
      )}
    </header>
  );
};
export default Header;
>>>>>>> 204ba91b83a6982270dbd52da0ed502f56ee68e0
