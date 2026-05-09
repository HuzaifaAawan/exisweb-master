import React from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
const MyRegistrationNumbers = () => {
  return (
    <div
      className="my-numbers"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="my-numbers-content-container">
        <span className="page-title">My Registration Numbers</span>
      </div>
    </div>
  );
};

export default MyRegistrationNumbers;
