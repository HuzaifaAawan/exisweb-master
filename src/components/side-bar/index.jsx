import { useState, useEffect } from "react";
import { Layout, Menu, Button, Popover, Divider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.scss";
import userProfile from "../../assets/icons/user-profile.jpg";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1030);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1030);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentPath = location.pathname;

  const menuItems = [
    {
      key: "/new-reg",
      label: "New Vehicle Registration",
      icon: newVehicleRegIcon,
      iconActive: newVehicleRegIconActive,
    },
    {
      key: "/vehicle-inspection",
      label: "Vehicle Inspection",
      icon: vehTransferOwnership,
      iconActive: vehTransferOwnershipActive,
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

  const popoverContent = (
    <div className="mobile-popover-menu">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => {
          navigate(key);
          setPopoverOpen(false);
        }}
        items={menuItemsForAntd}
        className="custom-menu"
      />
      <Divider className="my-3" />
      <div
        className="flex flex-col items-center p-4 bg-cover bg-bottom rounded-lg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <button className="flex items-center w-full px-4 py-2 text-gray-800 font-semibold rounded hover:bg-white/80 gap-2">
          <img src={userProfile} alt="User" className="w-6 h-6 rounded-full" />
          <span>User Account</span>
        </button>
        <button className="flex items-center w-full px-4 py-2 mt-2 text-red-600 font-semibold rounded hover:bg-white/80 gap-2">
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
  );

  return (
    <div className="sidebar-wrapper">
    
      {!isMobile && (
        <>
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
            <div className="sidebar-inner flex flex-col h-full bg-no-repeat bg-bottom bg-contain">
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

              <div className="mt-auto w-full">
                <Divider className="w-[90%] mx-3 my-6" />
                <div
                  className="flex flex-col items-center p-6 bg-cover bg-bottom rounded-lg"
                  style={{ backgroundImage: `url(${bgImage})` }}
                >
                  <button className="flex items-center w-full px-4 py-2 text-gray-800 font-semibold rounded hover:bg-white/80 gap-2">
                    <img
                      src={userProfile}
                      alt="User"
                      className="w-6 h-6 rounded-full"
                    />
                    <span>User Account</span>
                  </button>
                  <button className="flex items-center w-full px-4 py-2 mt-2 text-red-600 font-semibold rounded hover:bg-white/80 gap-2">
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
        </>
      )}

      
      {isMobile && (
        <Popover
          content={popoverContent}
          trigger="click"
          placement="bottomLeft"
          open={popoverOpen}
          onOpenChange={(visible) => setPopoverOpen(visible)}
          overlayClassName="mobile-sidebar-popover"
        >
          <Button
            type="text"
            icon={
              <img
                src={OpenMenuIcon}
                className="toggle-icon"
                alt="Open Popover"
              />
            }
            className="sidebar-burger-btn"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 2000,
            }}
          />
        </Popover>
      )}

      <AttentionModal
        open={showAttention}
        onClose={() => setShowAttention(false)}
      />
    </div>
  );
};

export default Sidebar;
