/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Layout, Menu, Button, Divider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.scss";
import userProfile from "../../assets/icons/user-profile.jpg";
// Icons
import OpenMenuIcon from "../../assets/icons/slider_open.png";
import CloseMenuIcon from "../../assets/icons/slider_close.svg";

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
import AttentionModal from "../attention-modal";
import bgImage from "../../assets/icons/popup-bg.png";

const Sidebar = () => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [showAttention, setShowAttention] = useState(false);

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
  const getMenuItems = (activeKey) => [
    {
      key: "/new-reg",
      icon: (
        <img
          src={
            activeKey === "/new-reg"
              ? newVehicleRegIconActive
              : newVehicleRegIcon
          }
          className="menu-icon"
          alt=""
        />
      ),
      label: "New Vehicle Registration",
    },
    {
      key: "/transfer-ownership",
      icon: (
        <img
          src={
            activeKey === "/transfer-ownership"
              ? vehTransferOwnershipActive
              : vehTransferOwnership
          }
          className="menu-icon"
          alt=""
        />
      ),
      label: "Vehicle Transfer of Ownership",
    },
    {
      key: "/vehicle-detail",
      icon: (
        <img
          src={
            activeKey === "/vehicle-detail"
              ? checkVehicleDetailActive
              : checkVehicleDetail
          }
          className="menu-icon"
          alt=""
        />
      ),
      label: "Check Vehicle Detail",
    },
    {
      key: "/smart-card-status",
      icon: (
        <img
          src={
            activeKey === "/smart-card-status"
              ? smartCardStatusActive
              : smartCardStatus
          }
          className="menu-icon"
          alt=""
        />
      ),
      label: "Check Vehicle Smart Card Status",
    },
    {
      key: "/challan-verification",
      icon: (
        <img
          src={
            activeKey === "/challan-verification"
              ? challanVerificationActive
              : challanVerification
          }
          className="menu-icon"
          alt=""
        />
      ),
      label: "Vehicle Challan Verification",
    },
    {
      key: "/registration",
      icon: (
        <img
          src={activeKey === "/registration" ? resrvRegNoActive : resrvRegNo}
          className="menu-icon"
          alt=""
        />
      ),
      label: "Reserve Registration Number",
    },
    {
      key: "/my-numbers",
      icon: (
        <img
          src={activeKey === "/my-numbers" ? myRegNoActive : myRegNo}
          className="menu-icon"
          alt=""
        />
      ),
      label: "My Registration Numbers",
    },
    {
      key: "/biometric",
      icon: (
        <img
          src={
            activeKey === "/biometric" ? biometricVerifActive : biometricVerif
          }
          className="menu-icon"
          alt=""
        />
      ),
      label: "Biometric Verification",
    },
    {
      key: "/locator",
      icon: (
        <img
          src={activeKey === "/locator" ? eSahulatActive : eSahulat}
          className="menu-icon"
          alt=""
        />
      ),
      label: "eSahulat Centre Locator",
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
            transition: "right 1s ease",
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
          <div className="sidebar-inner bg-no-repeat bg-bottom bg-contain flex flex-col h-full">
            {/* TOP SECTION (Menu) */}
            <div className="flex-1">
              <div className="portal-title">PUBLIC SERVICE PORTAL</div>

              <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                onClick={({ key }) => {
                  if (key === "/transfer-ownership") {
                    setShowAttention(true);
                    navigate(key);
                  } else {
                    navigate(key);
                  }
                }}
                items={menuItemsForAntd}
                className="custom-menu"
              />
            </div>

            {/* BOTTOM SECTION (Profile + Logout) */}
            <div className="mt-auto">
              <Divider
                style={{
                  minWidth: "90%",
                  width: "90%",
                  margin: "24px 12px",
                }}
              />

              <div
                className="profile-box p-6 rounded-lg bg-cover bg-center flex flex-col items-center"
                style={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: "cover", // or 'contain' based on what you want
                  backgroundPosition: "bottom", // or 'center'
                  backgroundRepeat: "no-repeat",
                }}
              >
                <button
                  className="flex items-center justify-start gap-2 text-gray-800 font-semibold bg-gray-100 px-4 py-2 rounded hover:bg-white/80 transition w-full user-account"
                  onClick={() => {
                    console.log("Profile clicked");
                  }}
                >
                  <img
                    src={userProfile}
                    alt="User"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-semibold text-gray-800">
                    User Account
                  </span>
                </button>

                {/* Logout Button */}
                <button className="flex items-center gap-2 text-red-600 font-semibold bg-gray-100 px-4 py-2 rounded hover:bg-white/80 transition w-full justify-start mt-2 logout-btn">
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
            </div>
          </div>
        </Sider>
        <AttentionModal
          open={showAttention}
          onClose={() => setShowAttention(false)}
        />
      </div>
    </>
  );
};

export default Sidebar;
