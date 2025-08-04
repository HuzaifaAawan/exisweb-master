import React from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import { Typography } from "antd";

const MyRegistrationNumbers = () => {
  return (
    <div
      className="my-numbers"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="my-numbers-content-container">
        <Typography.Title level={5} className="title">
          My Registration Numbers
        </Typography.Title>
      </div>
    </div>
  );
};

export default MyRegistrationNumbers;
