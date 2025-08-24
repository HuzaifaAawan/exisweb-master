import React from "react";
import { Modal, Button } from "antd";
import attentionIcon from "../../assets/icons/Application ID icon.svg";
import "./styles.scss";

const InfoModal = ({ computerNumber, open, onClose }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      className="attention-modal"
      width={460}
    >
      <div className="modal-content">
        <div
          className="attention-svg"
          style={{
            width: "88.1px",
            height: "71.2px",
            margin: "4.4px 0 0",
            justifySelf: "center",
          }}
        >
          <img
            src={attentionIcon}
            alt="Attention"
            className="w-full h-full object-contain"
          />
        </div>
        <span
          className="Profiles-Manager"
          style={{
            width: "299px",
            height: "96px",
            flexGrow: 0,
            fontFamily: "Inter",
            fontSize: "14px",
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
              fontSize: "38px",
              fontWeight: 800,
              lineHeight: "1.25",
              color: "#161a23",
              fontFamily: "Inter",
              marginBottom: "24px",
            }}
          >
            {computerNumber || "1003328"}
          </span>
        </span>
        <span
          className="Please-visit-ETD-Islamabad-Office-along-with-original-documents-Vehicles-registration-is-subject"
          style={{
            height: "48px",
            alignSelf: "stretch",
            flexGrow: 0,
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.5",
            letterSpacing: "normal",
            textAlign: "left",
            color: "#fb0004",
            display: "block",
          }}
        >
          Please visit E.T.D Islamabad Office along with original documents.
          Vehicle's registration is subject to:
        </span>

        <ol
          style={{
            listStyleType: "decimal",
            paddingLeft: "20px",
            paddingTop: "14px",
            paddingBottom: "14px",
            fontFamily: "Inter",

          }}
          className="notice-list"
        >
          <li>Owner's biometric verification from NADRA.</li>
          <li>Vehicle's physical inspection.</li>
          <li>Owner's proof of residence in Islamabad Capital TERRITORY</li>
        </ol>
        <Button
          type="primary"
          onClick={onClose}
          className="understood-btn"
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            fontFamily: "Inter",
            padding: "15px",
            fontSize: "14px",
            backgroundColor: "#04544f",
            color: "#ffffff",
            border: "1px solid #ffffff",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          OK, UNDERSTOOD
        </Button>
      </div>
    </Modal>
  );
};

export default InfoModal;
