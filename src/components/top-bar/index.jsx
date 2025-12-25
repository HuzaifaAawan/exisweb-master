// components/Header.jsx
import React, { useState, useEffect } from "react";
import "./styles.scss";
import headerLogo from "../../assets/icons/header_logo-removebg-preview.png";
import menuTopImage from "../../assets/icons/top_right.jpg";
import bannerBg from "../../assets/icons/Banner-bg.jpg";
import { Dropdown, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Desktop menu items (same as old popup)
  const menuItems = [
    { key: "1", label: "Office Timings" },
    { key: "2", label: "Announcement" },
    { key: "3", label: "Tenders" },
    { key: "4", label: "Contact" },
  ];

  const menuStructure = {
    items: menuItems.map((item) => ({
      key: item.key,
      label: item.label,
    })),
  };

  // Close menu automatically on resize > 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

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
      {/* Transparent Overlay */}
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
        {/* Left Side: Logo & Title */}
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

        {/* Right Side Menu (Desktop) */}
        <div className="header-right-items">
          <img src={menuTopImage} alt="menu-top-logo" className="rightImg" />
          <nav className="navigation-menu">
            {menuItems.map((item) => (
              <button key={item.key} className="nav-menu-item">
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Toggle with AntD Dropdown */}
        <div className="hidden laptop:block self-end mt-2">
          <Dropdown
            menu={menuStructure}
            placement="bottomRight"
            trigger={["click"]}
            open={menuOpen}
            onOpenChange={setMenuOpen}
            overlayClassName="custom-header-dropdown"
          >
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 22, color: "#fff" }} />}
            />
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
