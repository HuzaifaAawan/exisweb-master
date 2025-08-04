import React from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import { Typography } from "antd";

const VehicleChallanVerification = () => {
  return (
    <div
      className="challan-verification"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="challan-verification-content-container">
        <Typography.Title level={5} className="title">
          Vehicle Challan Verification
        </Typography.Title>
      </div>
    </div>
  );
};

export default VehicleChallanVerification;
