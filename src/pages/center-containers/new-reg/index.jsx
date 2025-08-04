import React from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import { Typography } from "antd";

const NewVehicleRegistration = () => {
  return (
    <div
      className="new-reg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="new-reg-content-container">
        <Typography.Title level={5} className="title">
          New Vehicle Registration
        </Typography.Title>
      </div>
    </div>
  );
};

export default NewVehicleRegistration;
