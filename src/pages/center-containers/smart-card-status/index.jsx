import React from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import { Typography } from "antd";

const CheckSmartCardStatus = () => {
  return (
    <div
      className="smart-card-status"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="smart-card-status-content-container">
        <Typography.Title level={5} className="title">
          Check Smart Card Status
        </Typography.Title>
      </div>
    </div>
  );
};

export default CheckSmartCardStatus;
