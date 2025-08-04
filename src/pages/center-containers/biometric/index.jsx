import React from "react";
import "./styles.scss"; // specific style file
import backgroundImage from "../../../assets/icons/background2.2.png";


const BiometricVerification = () => {
  return (
    <div className="biometric" style={{ backgroundImage: `url(${backgroundImage})` }}>
      BiometricVerification
    </div>
  );
};

export default BiometricVerification;
