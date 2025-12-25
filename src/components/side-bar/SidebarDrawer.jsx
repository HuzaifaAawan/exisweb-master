import React from "react";
import { Drawer, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.scss";
import userProfile from "../../assets/icons/user-profile.jpg";
import bgImage from "../../assets/icons/popup-bg.png";

const SidebarDrawer = ({ open, onClose, menuItems }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      title="PUBLIC SERVICE PORTAL"
      placement="left"
      onClose={onClose}
      open={open}
      width={280}
      className="sidebar-drawer"
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => {
          navigate(key);
          onClose(); // close after click
        }}
        items={menuItems}
        className="custom-menu"
      />

      {/* Bottom profile section */}
      <div
        className="flex flex-col items-center p-6 bg-cover bg-bottom rounded-lg mt-auto"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <button className="flex items-center w-full px-4 py-2 text-gray-800 font-semibold rounded hover:bg-white/80 gap-2">
          <img src={userProfile} alt="User" className="w-6 h-6 rounded-full" />
          <span>User Account</span>
        </button>
        <button className="flex items-center w-full px-4 py-2 mt-2 text-red-600 font-semibold rounded hover:bg-white/80 gap-2">
          Logout Account
        </button>
      </div>
    </Drawer>
  );
};

export default SidebarDrawer;
