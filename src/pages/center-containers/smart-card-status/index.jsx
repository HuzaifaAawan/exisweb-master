import React from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";

const CheckSmartCardStatus = () => {
  return (
    <div
      className="smart-card-status"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      CheckSmartCardStatus
    </div>
  );
};

export default CheckSmartCardStatus;
