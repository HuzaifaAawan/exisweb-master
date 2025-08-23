import React from "react";
import { Modal, Button } from "antd";
import attentionIcon from "../../assets/icons/attention_icon.svg";
import "./styles.scss";

const AttentionModal = ({ open, onClose }) => {
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
        <h2 className="modal-title">ATTENTION...!</h2>

        <ol
          style={{
            listStyleType: "decimal",
            paddingLeft: "20px",
            paddingTop: "14px",
            paddingBottom: "14x",
          }}
          className="notice-list"
        >
          <li>
            Please provide correct information, otherwise application will be
            rejected by Excise office.
          </li>
          <li>
            Biometric verification is subject to physical inspection by E&T
            staff.
          </li>
          <li>
            Following vehicles category / body type does not require inspection
            by E&T staff:
            <ol
              type="a"
              style={{
                listStyleType: "disc",
                paddingLeft: "20px",
                marginTop: "6px",
              }}
            >
              <li>
                <b>
                  Commercial Vehicles (Only passing required from motor vehicle
                  examiner)
                </b>
              </li>
              <li>
                <b>Government Vehicles</b>
              </li>
              <b>Motorcycles</b>
            </ol>
          </li>
        </ol>
        <p
          className="!h-[36px] !w-full !flex !justify-center !items-center !gap-[6px] !p-[8px_10px] !rounded-[8px] !mt-4 !mb-2 text-center !text-xs"
          style={{
            backgroundColor: "#fde8e9",
            color: "#dc2626",
            padding: "8px 10px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "bold",
            margin: "18px 0",
          }}
        >
          PAY YOUR TOKEN TAX ON TIME TO AVOID SUSPENSION & HEAVY FINES
        </p>
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

export default AttentionModal;
