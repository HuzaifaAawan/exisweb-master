import React from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import { Typography } from "antd";

const VehicleTransferOwnership = () => {
  return (
    <div
      className="transfer-ownership"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="transfer-ownership-content-container">
        <Typography.Title level={5} className="title">
          Vehicle Transfer Ownership
        </Typography.Title>
      </div>
      
    </div>
  );
};

export default VehicleTransferOwnership;
