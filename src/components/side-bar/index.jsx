import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Button, Divider, Layout, Menu, Typography } from "antd";
import { useNavigate } from "react-router-dom";

// Icon Imports
import OpenMenuIcon from "../../assets/icons/slider_open.png";
import CloseMenuIcon from "../../assets/icons/slider_close.svg";

import CarIcon from "../../assets/icons/icon-home-simple-door.svg";
import TransferIcon from "../../assets/icons/icon-home-simple-door.svg";
import DetailIcon from "../../assets/icons/icon-calendar.svg";
import SmartCardIcon from "../../assets/icons/icon-calendar-2.svg";
import ChallanIcon from "../../assets/icons/icon-calendar-2.svg";
import ReserveIcon from "../../assets/icons/icon-reports.svg";
import RegistrationIcon from "../../assets/icons/icon-home-simple-door.svg";
import BiometricIcon from "../../assets/icons/icon-calendar-4.svg";
import LocatorIcon from "../../assets/icons/icon-calendar-5.svg";

const Sidebar = () => {
  const { Sider } = Layout;
  const { Title } = Typography;
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "1",
      icon: <img src={CarIcon} alt="Car" className="menu-icon" />,
      label: "New Vehicle Registration",
      path: "/new-reg",
    },
    {
      key: "2",
      icon: <img src={TransferIcon} alt="Transfer" className="menu-icon" />,
      label: "Vehicle Transfer of Ownership",
      path: "/transfer-ownership",
    },
    {
      key: "3",
      icon: <img src={DetailIcon} alt="Detail" className="menu-icon" />,
      label: "Check Vehicle Detail",
      path: "/vehicle-detail",
    },
    {
      key: "4",
      icon: <img src={SmartCardIcon} alt="Smart Card" className="menu-icon" />,
      label: "Check Smart Card Status",
      path: "/smart-card-status",
    },
    {
      key: "5",
      icon: <img src={ChallanIcon} alt="Challan" className="menu-icon" />,
      label: "Vehicle Challan Verification",
      path: "/challan-verification",
    },
    {
      key: "6",
      icon: <img src={ReserveIcon} alt="Reserve" className="menu-icon" />,
      label: "Reserve Reg. Number",
      path: "/registration",
    },
    {
      key: "7",
      icon: <img src={RegistrationIcon} alt="Registration" className="menu-icon" />,
      label: "My Registration Numbers",
      path: "/my-numbers",
    },
    {
      key: "8",
      icon: <img src={BiometricIcon} alt="Biometric" className="menu-icon" />,
      label: "Biometric Verification",
      path: "/biometric",
    },
    {
      key: "9",
      icon: <img src={LocatorIcon} alt="Locator" className="menu-icon" />,
      label: "eSahulat Centre Locator",
      path: "/locator",
    },
  ];

  useEffect(() => {
    setSidebarWidth(collapsed ? 0 : 250);
  }, [collapsed]);

  return (
    <>
      <Button
        type="text"
        icon={
          <img
            src={collapsed ? OpenMenuIcon : CloseMenuIcon}
            alt="Toggle Menu"
            className={`transition-icon ${collapsed ? "rotate" : ""}`}
            style={{ width: 18, height: 18 }}
          />
        }
        onClick={() => setCollapsed(!collapsed)}
        className="sidebar-toggle-btn"
        style={{
          position: "relative",
          top: 4,
          left: sidebarWidth + 4,
          zIndex: 1001,
          transition: "left 0.3s ease",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      />
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        collapsedWidth={0}
        trigger={null}
        style={{
          minHeight: "100vh",
          background: "#fff",
          color: "#000",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            color: "#556485",
            textAlign: "left",
            backgroundColor: "fff",
            fontSize: "14px",
            padding: "10px",
          }}
        >
          {!collapsed && (
            <Title level={5} style={{ color: "#556485", margin: 0 }}>
              Public Service Portal
            </Title>
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={menuItems}
          onClick={({ key }) => {
            const selectedItem = menuItems.find((item) => item.key === key);
            if (selectedItem) navigate(selectedItem.path);
          }}
          style={{ color: "#000" }}
        />
        <Divider />
        <div className="profile-box p-4 bg-white rounded shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/profile.jpg"
              alt="User"
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="font-medium text-gray-800">User Account</span>
          </div>
          <button className="flex items-center gap-2 text-red-500 font-medium hover:text-red-600">
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
      </Sider>
    </>
  );
};

export default Sidebar;
