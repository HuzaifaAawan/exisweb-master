import React from "react";
import backgroundIcon from "../../assets/icons/attention-icon.png"; 

const AttentionNumber = ({ computerNumber, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 text-center"
        style={{
          width: "520px",
          height: "530px",
        }}
      >
        {/* Icon */}
        <img
          src={backgroundIcon}
          alt="Attention Icon"
          className="mx-auto w-20 h-20 mb-4"
        />

        {/* Computer Number Heading */}
<span
  className="Profiles-Manager"
  style={{
    width: "299px",
    height: "96px",
    flexGrow: 0,
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "2.13",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#161a23",
    display: "block", 
    margin: "0 auto", 
  }}
>
  Your application's Computer Number is:{" "}
  <span
    className="text-style-1"
    style={{
      fontSize: "48px",
      fontWeight: 800,
      lineHeight: "1.25",
      color: "#161a23",
      marginBottom:"24px"
    }}
  >
    {computerNumber}
  </span>
</span>


      {/* Warning Text */}
<span
  className="Please-visit-ETD-Islamabad-Office-along-with-original-documents-Vehicles-registration-is-subject"
  style={{
    height: "48px",
    alignSelf: "stretch",
    flexGrow: 0,
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#fb0004",
    display: "block", 
    marginBottom: "16px", 
  }}
>
  Please visit E.T.D Islamabad Office along with original documents. Vehicle's registration is subject to:
</span>

       {/* List */}
<span
  className="Owners-biometric-verification-from-NADRA-Vehicles-physical-inspection-Owners-proof-of-residence"
  style={{
    height: "108px",
    alignSelf: "stretch",
    flexGrow: 0,
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.69",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#161a23",
    display: "block",
    marginBottom: "24px",
  }}
>
  Owner's biometric verification from NADRA. <br />
  Vehicle's physical inspection. <br />
  Owner's proof of residence in Islamabad Capital TERRITORY
</span>


       
       {/* Button */}
<button
  onClick={onClose}
  style={{
    height: "50px",
    alignSelf: "stretch",
    flexGrow: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#04544f", 
    cursor: "pointer",
    border: "none",
    marginBottom:"24px"
  }}
>
  <span
    style={{
      width: "127px",
      height: "20px",
      flexGrow: 0,
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "1.43",
      letterSpacing: "normal",
      textAlign: "center",
      color: "#fff",
    }}
  >
    OK, Understood
  </span>
</button>

      </div>
    </div>
  );
};

export default AttentionNumber;
