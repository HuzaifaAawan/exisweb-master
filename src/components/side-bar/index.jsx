import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.scss";

// Icons
import OpenMenuIcon from "../../assets/icons/slider_open.png";
import CloseMenuIcon from "../../assets/icons/slider_close.svg";
import CarIcon from "../../assets/icons/1st.png";
import TransferIcon from "../../assets/icons/icon-user-1.png";
import DetailIcon from "../../assets/icons/icon-calendar.svg";
import SmartCardIcon from "../../assets/icons/icon-calendar-2.svg";
import ChallanIcon from "../../assets/icons/icon-calendar-2.svg";
import ReserveIcon from "../../assets/icons/icon-reports.svg";
import RegistrationIcon from "../../assets/icons/icon-home-simple-door.svg";
import BiometricIcon from "../../assets/icons/icon-calendar-4.svg";
import LocatorIcon from "../../assets/icons/icon-calendar-5.svg";
import bgImage from "../../assets/icons/download2.jpg";



const Sidebar = () => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(310);

  const menuItems = [
    { key: "/new-reg", icon: <img src={CarIcon} className="menu-icon" />, label: "New Vehicle Registration" },
    { key: "/transfer-ownership", icon: <img src={TransferIcon} className="menu-icon" />, label: "Vehicle Transfer of Ownership" },
    { key: "/vehicle-detail", icon: <img src={DetailIcon} className="menu-icon" />, label: "Check Vehicle Detail" },
    { key: "/smart-card-status", icon: <img src={SmartCardIcon} className="menu-icon" />, label: "Check Vehicle Smart Card Status" },
    { key: "/challan-verification", icon: <img src={ChallanIcon} className="menu-icon" />, label: "Vehicle Challan Verification" },
    { key: "/registration", icon: <img src={ReserveIcon} className="menu-icon" />, label: "Reserve Registration Number" },
    { key: "/my-numbers", icon: <img src={RegistrationIcon} className="menu-icon" />, label: "My Registration Numbers" },
    { key: "/biometric", icon: <img src={BiometricIcon} className="menu-icon" />, label: "Biometric Verification" },
    { key: "/locator", icon: <img src={LocatorIcon} className="menu-icon" />, label: "eSahulat Centre Locator" },
  ];

  useEffect(() => {
    setSidebarWidth(collapsed ? 0 : 310);
  }, [collapsed]);

  return (
    <>
      <Button
        type="text"
        icon={<img src={collapsed ? OpenMenuIcon : CloseMenuIcon} className="toggle-icon" />}
        onClick={() => setCollapsed(!collapsed)}
        className="sidebar-toggle-btn"
        style={{
          position: "relative",
          top: 6,
          left: sidebarWidth + 2,
          zIndex: 1001,
          transition: "left 0.3s ease",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
        }}
      />

     <Sider
  width={299}
  collapsedWidth={0}
  collapsed={collapsed}
  className="sidebar-container"
  trigger={null}
>
  <div className="sidebar-inner">
    <div className="top-section">
      <div className="portal-title">PUBLIC SERVICE PORTAL</div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={menuItems}
        className="custom-menu"
      />
    </div>

    {/* PROFILE BOX START */}
    <div
      className="profile-box p-6 rounded-lg shadow-md bg-cover bg-center flex flex-col items-center mt-[10px]"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Profile Button */}
      <button
        className="flex items-center justify-start gap-2 text-gray-800 font-semibold bg-gray-100 px-4 py-2 rounded hover:bg-white/80 transition w-full"
        onClick={() => {
          console.log("Profile clicked");
        }}
      >
        <span className="font-semibold text-gray-800">User Account</span>
      </button>

      {/* Logout Button */}
      <button className="flex items-center gap-2 text-red-600 font-semibold bg-gray-100 px-4 py-2 rounded hover:bg-white/80 transition w-full justify-start mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
        Logout Account
      </button>
    </div>
    {/* PROFILE BOX END */}
  </div>
</Sider>

    </>
  );
};

export default Sidebar;
