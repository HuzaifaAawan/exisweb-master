import React, { useState } from "react";
import "./styles.scss";
import { Button, Divider, Layout, Menu, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const Sidebar = () => {
  const { Sider } = Layout;
  const { Title } = Typography;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const selectedKey = location.pathname.split("/")[1] || "1";

  const menuItems = [
    {
      key: "1",
      icon: "",
      label: "New Vehicle Registration",
      path: "/new-reg",
    },
    {
      key: "2",
      icon: "",
      label: "Vehicle Transfer of Ownership",
      path: "/transfer-ownership",
    },
    {
      key: "3",
      icon: "",
      label: "Check Vehicle Detail",
      path: "/vehicle-detail",
    },
    {
      key: "4",
      icon: "",
      label: "Check Smart Card Status",
      path: "/smart-card-status",
    },
    {
      key: "5",
      icon: "",
      label: "Vehicle Challan Verification",
      path: "/challan-verification",
    },
    {
      key: "6",
      icon: "",
      label: "Reserve Reg. Number",
      path: "/reserve-number",
    },
    {
      key: "7",
      icon: "",
      label: "My Registration Numbers",
      path: "/my-numbers",
    },
    { key: "8", icon: "", label: "Biometric Verification", path: "/biometric" },
    { key: "9", icon: "", label: "eSahulat Centre Locator", path: "/locator" },
  ];
  return (
    <>
      {/* <div className="Sidebar">
         <span className="sidebar-heading">Public Service Portal</span>
        <div className="sidebar-buttons">
          // <label>My Registration Number 1</label>
          // <label>My Registration Number 2</label>
          // <label>My Registration Number 3</label>
          // <label>My Registration Number 4</label>
          // <label>My Registration Number 5</label>
          // <label>My Registration Number 6</label>
          // <label>My Registration Number 7</label>
          // <label>My Registration Number 8</label>
        </div>
        <div className="sidebar-footer">
          <div className="profile-box">
             <button className="profile-btn">👤 User Profile</button>
            <button className="logout-btn">🚪 Logout</button>
          </div>
        </div>
      </div> */}
      <Button
        type="primary"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "absolute",
          top: 84,
          left: collapsed ? 4 : 226,
          zIndex: 1000,
        }}
      />
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        collapsedWidth={0} // FULLY collapse
        trigger={null}
        style={{
          minHeight: "100vh",
          background: "#fff",
          color: "#000",
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
          // selectedKeys={[selectedKey]}
          // defaultSelectedKeys={["1"]}
          items={menuItems}
          onClick={({ key }) => {
            const selectedItem = menuItems.find((item) => item.key === key);
            console.debug(selectedItem, "selectedItem");
            if (selectedItem) navigate(selectedItem.path);
          }}
          style={{ color: "#000" }}
        />
        <Divider />
        <div className="sidebar-footer">
          <div className="profile-box">
            <button className="profile-btn"> Hamad Ahmad</button>
            <button className="logout-btn">Logout Profile</button>
          </div>
        </div>
      </Sider>
    </>
  );
};
export default Sidebar;
