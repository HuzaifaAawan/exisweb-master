import React from "react";
import Sidebar from "../components/side-bar";
import { Outlet } from "react-router-dom";
import Header from "../components/top-bar";

const AppLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
      className="app-layout-container"
    >
      <Header className="app-layout-container-header" />

      <div
        className="app-layout-content-container"
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            minWidth: 0,
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
