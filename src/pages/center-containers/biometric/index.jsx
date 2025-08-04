import React from "react";
import "./styles.scss"; // specific style file
import backgroundImage from "../../../assets/icons/background2.2.png";
import { Typography } from "antd";

const BiometricVerification = () => {
  return (
    <div
      className="biometric"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="biometric-content-container">
        <Typography.Title level={5} className="title">
          Biometric Verification
        </Typography.Title>
      </div>
    </div>
  );
};

export default BiometricVerification;
