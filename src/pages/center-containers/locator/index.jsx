import React from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import { Typography } from "antd";

const ESahulatCentreLocator = () => {
  return (
    <div
      className="locator"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="locator-content-container">
        <Typography.Title level={5} className="title">
          ESahulat Centre Locator
        </Typography.Title>
      </div>
    </div>
  );
};

export default ESahulatCentreLocator;
