import React from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";

const NewVehicleRegistration = () => {
  return (
    <div
      className="new-reg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      NewVehicleRegistration
    </div>
  );
};

export default NewVehicleRegistration;
