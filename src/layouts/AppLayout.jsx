import React from "react";
import Sidebar from "../components/side-bar";
import { Outlet } from "react-router-dom";
import Header from "../components/top-bar";

const AppLayout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      className="app-layout-container"
    >
      <Header className="app-layout-container-header" />
      <div className="app-layout-content-container" style={{ display: "flex" }}>
        <Sidebar />

        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
