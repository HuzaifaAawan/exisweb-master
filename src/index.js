import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import "antd/dist/reset.css"; // ✅ Ant Design ka CSS reset (zaroori)
import "./index.css"; // ✅ tumhari apni global styles
import AppRoutes from "./routes/AppRoutes";
// import "@fontsource/inter/variable.css"; // optional: import weights you need

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
