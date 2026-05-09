import React from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";

const ReserveRegNumber = () => {
  return (
    <div
      className="reserve-number"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <span className="page-title">Reserve Registration Number</span>
    </div>
  );
};

export default ReserveRegNumber;
