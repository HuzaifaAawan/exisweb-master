import React from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";

const VehicleTransferOwnership = () => {
  return (
    <div
      className="transfer-ownership"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      VehicleTransferOwnership
    </div>
  );
};

export default VehicleTransferOwnership;
