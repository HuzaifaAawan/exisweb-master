import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.scss";

// Icons
import OpenMenuIcon from "../../assets/icons/slider_open.png";
import CloseMenuIcon from "../../assets/icons/slider_close.svg";
import bgImage from "../../assets/icons/download2.jpg";

import newVehicleRegIcon from "../../assets/icons/New Vehicle Registration-Unselected.svg";
import newVehicleRegIconActive from "../../assets/icons/New Vehicle Registration-Selected.svg";

import vehTransferOwnership from "../../assets/icons/Vehicle Transfer of Ownership-Unselected.svg";
import vehTransferOwnershipActive from "../../assets/icons/Vehicle Transfer of Ownership-Selected.svg";

import checkVehicleDetail from "../../assets/icons/Check Vehicle Detail-Unselected.svg";
import checkVehicleDetailActive from "../../assets/icons/Check Vehicle Detail-Selected.svg";

import smartCardStatus from "../../assets/icons/Check Vehicle Smart Card Status-Unselected.svg";
import smartCardStatusActive from "../../assets/icons/Check Vehicle Smart Card Status-Selected.svg";

import challanVerification from "../../assets/icons/Vehicle Challan Verification-Unselected.svg";
import challanVerificationActive from "../../assets/icons/Vehicle Challan Verification-Selected.svg";

import resrvRegNo from "../../assets/icons/Reserve Registration No.-Unselected.svg";
import resrvRegNoActive from "../../assets/icons/Reserve Registration No.-Selected.svg";

import myRegNo from "../../assets/icons/My Registration No.-Unselected.svg";
import myRegNoActive from "../../assets/icons/My Registration No.-Selected.svg";

import biometricVerif from "../../assets/icons/Biometric Verification-Unselected.svg";
import biometricVerifActive from "../../assets/icons/Biometric Verification-Selected.svg";

import eSahulat from "../../assets/icons/eSahulat Centre Locator-Unselected.svg";
import eSahulatActive from "../../assets/icons/eSahulat Centre Locator-Selected.svg";

const Sidebar = () => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const currentPath = location.pathname;

  const menuItems = [
    {
      key: "/new-reg",
      label: "New Vehicle Registration",
      icon: newVehicleRegIcon,
      iconActive: newVehicleRegIconActive,
    },
    {
      key: "/transfer-ownership",
      label: "Vehicle Transfer of Ownership",
      icon: vehTransferOwnership,
      iconActive: vehTransferOwnershipActive,
    },
    {
      key: "/vehicle-detail",
      label: "Check Vehicle Detail",
      icon: checkVehicleDetail,
      iconActive: checkVehicleDetailActive,
    },
    {
      key: "/smart-card-status",
      label: "Check Vehicle Smart Card Status",
      icon: smartCardStatus,
      iconActive: smartCardStatusActive,
    },
    {
      key: "/challan-verification",
      label: "Vehicle Challan Verification",
      icon: challanVerification,
      iconActive: challanVerificationActive,
    },
    {
      key: "/registration",
      label: "Reserve Registration Number",
      icon: resrvRegNo,
      iconActive: resrvRegNoActive,
    },
    {
      key: "/my-numbers",
      label: "My Registration Numbers",
      icon: myRegNo,
      iconActive: myRegNoActive,
    },
    {
      key: "/biometric",
      label: "Biometric Verification",
      icon: biometricVerif,
      iconActive: biometricVerifActive,
    },
    {
      key: "/locator",
      label: "eSahulat Centre Locator",
      icon: eSahulat,
      iconActive: eSahulatActive,
    },
  ];

  const menuItemsForAntd = menuItems.map((item) => ({
    key: item.key,
    icon: (
      <img
        src={currentPath === item.key ? item.iconActive : item.icon}
        className="menu-icon"
        alt={item.label}
      />
    ),
    label: item.label,
  }));

  return (
    <>
      <div className="sidebar-wrapper">
        <Button
          type="text"
          icon={
            <img
              src={collapsed ? OpenMenuIcon : CloseMenuIcon}
              className="toggle-icon"
              alt="Toggle Sidebar"
            />
          }
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-toggle-btn"
          style={{
            position: "absolute",
            top: "10px",
            right: collapsed ? "-40px" : "-17px",
            transition: "right 0.3s ease",
            zIndex: 1000,
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
                items={menuItemsForAntd}
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
                <img
                  src=""
                  alt="User"
                  className="w-6 h-6 rounded-full object-cover"
                />
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
      </div>
    </>
  );
};

export default Sidebar;
