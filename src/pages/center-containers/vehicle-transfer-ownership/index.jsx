import React, { useState } from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import transferIcon from "../../../assets/icons/transfer_icon.JPG";
import noteIcon from "../../../assets/icons/note.png";
import cardBg from "../../../assets/icons/islamabad smart card-Photoroom.png";
import { LabelDatePicker } from "../../../components/common/label-date-picker/index.js";

import {
  Typography,
  Row,
  Col,
  Select,
  DatePicker,
  Input,
  Form,
  Switch,
} from "antd";

import UppercaseInput, {
  EngineSizeInput,
} from "../../../components/CapitalizedInput.jsx";
import { DistrictDropdowns } from "../../../components/CapitalizedInput.jsx";

import dayjs from "dayjs";

const VehicleTransferOwnership = () => {
  const [showData, setShowData] = useState(false);
  const [showPurchaserForm, setShowPurchaserForm] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [regDate, setRegDate] = useState(null);
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [passport, setPassport] = useState("");
  const [purchaserName, setPurchaserName] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [fhwoName, setFhwoName] = useState("");
  const [ntn, setNtn] = useState("");
  const [showChallan, setShowChallan] = useState(false);
  const [fatherName, setFatherName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [otherContactNumber, setOtherContactNumber] = useState("");
  const [tempAddress, setTempAddress] = useState("");
  const [currentOwnerName, setCurrentOwnerName] = useState("Salman Ahmed");
  const [permAddress, setPermAddress] = useState("");
  const [ownerName, setOwnerName] = useState("Salman Ahmed");
  const [ownerCnic, setOwnerCnic] = useState("1730188367206");
  const [transferDate, setTransferDate] = useState(dayjs());
  const [ownerFatherName, setOwnerFatherName] = useState("Ahmed Raza");
  const [ownerAddress, setOwnerAddress] = useState("Islamabad, Pakistan");
  const [formData, setFormData] = useState({
    purchaserName: "",
    fatherName: "",
    cnic: "",
    address: "",
  });

  const [previewData, setPreviewData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowData(true);
    setShowPurchaserForm(true);
  };

  return (
    <div
      className="my-numbers"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        paddingTop: "42px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1.33rem",
      }}
    >
      {/* Main Heading */}
      <span
        className="title"
        style={{
          fontSize: "clamp(16px, 2.2vw, 24px)",
          fontWeight: "bold",
          textAlign: "center",
          maxWidth: "95%",
          lineHeight: "1.4",
        }}
      >
        Vehicle Transfer of Ownership
      </span>

      {/* First Form Wrapper */}
      <div
        className="form-card"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid #e3e3e3",
          backgroundColor: "#fff",
          marginTop: "16px",
        }}
      >
        {/* --------- Existing First Form Content (UNCHANGED) --------- */}
        <div>
          <div className="mb-1">
            <span className="block font-bold text-lg">Change of Ownership</span>
          </div>

          <div className="mb-3">
            <span className="block text-gray-600 text-sm">
              Please provide the details below to view owner information
            </span>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e3e3e3",
              width: "80%",
              margin: "0 auto",
            }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <Row gutter={[16, 8]} align="bottom">
            {/* Registration No */}
            <Col xs={24} sm={24} md={12} lg={7}>
              <div className="w-full">
                <label className="Textfield-Label">Registration No.</label>
                <div className="w-full">
                  <UppercaseInput
                    placeholder="Enter here..."
                    value={regNo}
                    onChange={(val) => setRegNo(val)}
                    className="w-full px-3 py-2 h-12 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500"
                  />
                </div>
              </div>
            </Col>

            {/* Registration Date */}
            <Col xs={24} sm={24} md={12} lg={7}>
              <div className="w-full">
                <LabelDatePicker
                  label="Registration Date"
                  value={regDate}
                  setRegDate={setRegDate}
                  className="w-full"
                />
              </div>
            </Col>

            <Col flex="auto">
              <label className="Textfield-Label">
                Biometric Verification Tracking Number
              </label>
              <Input
                placeholder="Enter here..."
                value={regNo}
                onChange={(e) => setRegNo(e.target.value.toUpperCase())}
                className="w-full"
              />
            </Col>

            <Col flex="150px">
              <button type="submit" className="submit-frame w-full">
                Submit
              </button>
            </Col>
          </Row>
        </form>

        {/* Info Before Submit */}
        {!showData && (
          <div className="flex flex-col items-center mt-2 px-4">
            {transferIcon ? (
              <img src={transferIcon} alt="icon" className="w-11 h-11" />
            ) : (
              <div className="w-11 h-11 bg-black rounded"></div>
            )}
            <span
              className="mt-2 font-[Inter] text-sm text-center text-[#556485]"
              style={{
                maxWidth: "392px",
                whiteSpace: "normal",
                overflowWrap: "break-word",
              }}
            >
              Please enter the above information to proceed with the change of
              ownership process.
            </span>
          </div>
        )}

        {/* Dummy Data */}
        {showData && (
          <>
            <hr className="dummy-divider" />
            <div className="dummy-data-container no-bg">
              <div className="dummy-data-item">
                <span className="label">Registration No.</span>
                <div className="value">{regNo || "N/A"}</div>
              </div>

              <div className="dummy-data-item">
                <span className="label">Registration Date</span>
                <div className="value">
                  {regDate ? dayjs(regDate).format("DD-MM-YYYY") : "N/A"}
                </div>
              </div>

              <div className="dummy-data-item">
                <span className="label">Chasis No.</span>
                <div className="value">MF52G-331556</div>
              </div>

              <div className="dummy-data-item">
                <span className="label">Engine No.</span>
                <div className="value">K2K-8760982</div>
              </div>

              <div className="dummy-data-item">
                <span className="label">Current Owner CNIC</span>
                <div className="value">{ownerCnic}</div>
              </div>

              <div className="dummy-data-item">
                <span className="label">Current Owner Name</span>
                <div className="value">{ownerName}</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Second Form - Purchaser Information */}
      {showPurchaserForm && !showPreview && (
        <div className="Frame-1000009526">
          {/* --------- Entire Second Form Content (UNCHANGED) --------- */}
          <div style={{ padding: "0 24px" }}>
            <span className="Profiles-Manager-form2-h1">
              Purchaser Information
            </span>
            <span className="Profiles-Manager-form2-h2">
              Please provide the details of the purchaser to whom the ownership
              is being transferred
            </span>
            <hr
              style={{
                marginTop: "15px",
                border: "none",
                borderTop: "1px solid #e3e3e3",
              }}
            />
          </div>

          <div style={{ padding: "0 24px" }}>
            {/* Row 1: Normal Fields */}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <span className="Dropdown-Label Textfield-Label">
                  Purchaser Name
                </span>

                <Input
                  placeholder="Enter Purchaser Name"
                  className="uniform-input1"
                  value={purchaserName}
                  onChange={(e) =>
                    setPurchaserName(e.target.value.toUpperCase())
                  }
                />
              </Col>

              <Col xs={24} sm={8}>
                <span className="Textfield-Label">F/H/W/O Name</span>
                <UppercaseInput
                  value={fatherName}
                  onChange={setFatherName}
                  placeholder="Enter Father Name"
                  className="uniform-input1"
                  maxLength={32}
                />
              </Col>

              <Col xs={24} sm={8}>
                <span className="Textfield-Label">CNIC No.</span>
                <UppercaseInput
                  isCNIC
                  value={cnic}
                  onChange={(val) => setCnic(val)}
                  placeholder="Enter CNIC (e.g. 37406-3833198-7)"
                  className="uniform-input1"
                />
              </Col>

              <Col xs={24} sm={8}>
                <span className="Textfield-Label">Contact Number</span>
                <UppercaseInput
                  value={contactNumber}
                  onChange={setContactNumber}
                  isPhone
                  placeholder="Enter Contact Number"
                />
              </Col>

              <Col xs={24} sm={8}>
                <span className="Textfield-Label">Other Contact Number</span>
                <UppercaseInput
                  value={otherContactNumber}
                  onChange={setOtherContactNumber}
                  isPhone
                  placeholder="Enter Other Contact Number"
                />
              </Col>
              <Col xs={24} sm={8}>
                <span className="Textfield-Label">Email Address</span>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="uniform-input1"
                />
              </Col>

              <Col xs={24} sm={12} className="relative">
                <span className="Textfield-Label">Temporary Address</span>
                <UppercaseInput
                  textarea
                  value={tempAddress}
                  onChange={(val) => setTempAddress(val)}
                  showCount
                  maxLength={30}
                  rows={4}
                  placeholder="Enter Address..."
                  className="uniform-input2"
                />
              </Col>

              <Col xs={24} sm={12} className="relative">
                <span className="Textfield-Label">Permanent Address</span>
                <UppercaseInput
                  textarea
                  value={permAddress}
                  onChange={(val) => setPermAddress(val)}
                  showCount
                  maxLength={30}
                  rows={4}
                  placeholder="Enter Address..."
                  className="uniform-input2"
                />
              </Col>

              <Col xs={24} sm={24}>
                <Form layout="vertical">
                  <DistrictDropdowns />
                </Form>
              </Col>
            </Row>

            {/* Row 2: Hire Purchase + Physical Inspection */}
            <Row gutter={[16, 0]} style={{ marginTop: "32px" }}>
              <Col span={24}>
                <div className="my-6 border-t border-gray-300"></div>

                <div className="hire-purchase-container mt-6">
                  <span className="Hire-Purchase-Agreement block">
                    Hire Purchase Agreement
                  </span>
                  <Switch />
                </div>
              </Col>

              <Col span={24} style={{ marginTop: "8px" }}>
                <div className="w-full">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Bank / Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter...."
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </Col>

              {/* <Col span={24}>
                <div className="mt-8">
                  <span className="Physical-Inspection-Request">
                    Physical Inspection Request
                  </span>
                </div>
              </Col> */}

              <Col span={24} style={{ marginTop: "8px", marginBottom: "8px" }}>
                <span className="city-select-label">Select your city</span>
              </Col>

              <Col span={24}>
                <div className="frame-1 w-full h-12 rounded-md overflow-hidden">
                  <select className="w-full h-full bg-transparent px-3 outline-none">
                    <option value="">Choose city</option>
                    <option value="karachi">ISLAMABAD</option>
                    <option value="lahore">LAHORE</option>
                    <option value="islamabad">KARACHI</option>
                    <option value="islamabad">MULTAN</option>
                    <option value="islamabad">FAISALABAD</option>
                  </select>
                </div>
              </Col>
            </Row>

            {/* Note Section */}
            {/* <div style={{ marginTop: "16px" }} className="Note">
              <div className="NOTE-Wrapper flex items-start gap-2">
                <img src={noteIcon} alt="Note Icon" className="w-5 h-5 mt-2" />
                <div>
                  <span className="text-style-1 font-semibold">
                    NOTE: For updates please visit our pages
                  </span>
                  <div className="links flex space-x-2">
                    <a
                      href="https://www.facebook.com/IslamabadExcise"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.facebook.com/IslamabadExcise
                    </a>
                    <a
                      href="https://twitter.com/ICT_Excise"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://twitter.com/ICT_Excise
                    </a>
                  </div>
                </div>
              </div>
            </div> */}

            <div style={{ marginTop: "24px" }}>
              <button
                type="button"
                className="Save_button"
                onClick={() => setShowPreview(true)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showPreview && (
        <div className="preview-card-wrapper">
          <div className="preview-card">
            <h2 className="preview-title">
              Vehicle Identification Card Preview
            </h2>

            <span className="Profiles-Manager-form2-h2">
              Kindly review the information below as it will appear on your
              Vehicle Identification Card. If no changes are required, please
              confirm and submit.
            </span>

            {/* SMART CARD START */}
            <div className="smart-card">
              <img src={cardBg} alt="card background" className="card-bg" />

              <div className="card-overlay">
                {/* LEFT SIDE FIELDS */}
                <div className="field purchaser-name">
                  <span className="card-label">Purchaser Name:</span>
                  <span className="card-value">{purchaserName || "N/A"}</span>
                </div>

                <div className="field father-name">
                  <span className="card-label">F/O/W Name:</span>
                  <span className="card-value">{fatherName || "N/A"}</span>
                </div>

                <div className="field cnic-field">
                  <span className="card-label">CNIC:</span>
                  <span className="card-value">{cnic || "N/A"}</span>
                </div>
                <div className="field registration-date">
                  <span className="card-label">Reg Date:</span>
                  <span className="card-value">
                    {regDate ? dayjs(regDate).format("DD-MM-YYYY") : "N/A"}
                  </span>
                </div>
                <div className="field transferred-to">
                  <span className="card-label">Transferred To:</span>
                  <span className="card-value">
                    {currentOwnerName || "N/A"}
                  </span>
                </div>
                <div className="field transfer-date">
                  <span className="card-label">Date of Transfer:</span>
                  <span className="card-value">
                    {transferDate
                      ? dayjs(transferDate).format("DD-MM-YYYY")
                      : "N/A"}
                  </span>
                </div>

                <div className="field transfer-father">
                  <span className="card-label">F/O/W Name:</span>
                  <span className="card-value">{ownerFatherName || "N/A"}</span>
                </div>

                <div className="field transfer-cnic">
                  <span className="card-label">CNIC No:</span>
                  <span className="card-value">{ownerCnic || "N/A"}</span>
                </div>

                <div className="field transfer-address">
                  <span className="card-label">Present Address:</span>
                  <span className="card-value">{ownerAddress || "N/A"}</span>
                </div>

                {/* RIGHT SIDE FIELDS */}

                <div className="field engine-field">
                  <span className="card-label">Engine No:</span>
                  <span className="card-value">K2K-8760982</span>
                </div>

                <div className="field chassis-field">
                  <span className="card-label">Chassis No:</span>
                  <span className="card-value">MF52G-331556</span>
                </div>
              </div>
            </div>

            {/* SMART CARD END */}

            <div className="preview-buttons">
              <button
                className="back-button"
                onClick={() => setShowPreview(false)}
              >
                Go Back and Edit
              </button>

              <button
                className="confirm-button"
                onClick={() => setShowChallan(true)}
              >
                Save & Generate Challan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
               CHALLAN SECTION
========================================= */}
      {showChallan && (
        <div
          className="challan-wrapper"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <div
            id="challan"
            style={{
              width: "100%",
              maxWidth: "700px",
              border: "1px solid #e3e3e3",
              borderRadius: "12px",
              padding: "24px",
              backgroundColor: "#fff",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
              VEHICLE TRANSFER OF OWNERSHIP
            </h2>

            {/* Header Info */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div>
                <strong>Registration No:</strong> {regNo || "N/A"} <br />
                <strong>Chassis No:</strong> MF52G-331556 <br />
                <strong>Engine No:</strong> K2K-8760982
              </div>
              <div>
                <strong>Date of Transfer:</strong>{" "}
                {transferDate
                  ? dayjs(transferDate).format("DD-MM-YYYY")
                  : "N/A"}{" "}
                <br />
                <strong>Reg Date:</strong>{" "}
                {regDate ? dayjs(regDate).format("DD-MM-YYYY") : "N/A"} <br />
              </div>
            </div>

            {/* Owner Info */}
            <div style={{ marginBottom: "16px" }}>
              <strong>Current Owner:</strong> {ownerName} <br />
              <strong>F/O/W Name:</strong> {ownerFatherName} <br />
              <strong>CNIC No:</strong> {ownerCnic} <br />
              <strong>Present Address:</strong> {ownerAddress}
            </div>

            {/* Purchaser Info */}
            <div style={{ marginBottom: "16px" }}>
              <strong>Purchaser Name:</strong> {purchaserName || "N/A"} <br />
              <strong>F/O/W Name:</strong> {fatherName || "N/A"} <br />
              <strong>CNIC No:</strong> {cnic || "N/A"} <br />
              <strong>Contact Number:</strong> {contactNumber || "N/A"} <br />
              <strong>Other Contact:</strong> {otherContactNumber || "N/A"}{" "}
              <br />
              <strong>Email:</strong> {email || "N/A"} <br />
              <strong>Temporary Address:</strong> {tempAddress || "N/A"} <br />
              <strong>Permanent Address:</strong> {permAddress || "N/A"}
            </div>

            <hr style={{ border: "1px dashed #ccc", margin: "16px 0" }} />

            <p style={{ fontSize: "12px" }}>
              Kindly make payment of all applicable dues at your bank or online
              system. Once the payment is done, the transaction will be recorded
              in the system.
            </p>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "24px",
                gap: "16px",
              }}
            >
              <button
                style={{
                  flex: 1,
                  padding: "12px 0",
                  backgroundColor: "#e3e3e3",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() => {
                  setShowChallan(false);
                  setShowData(false);
                  setShowPurchaserForm(false);
                  setShowPreview(false);
                  // Reset form if needed
                }}
              >
                Back to Homepage
              </button>

              <button
                style={{
                  flex: 1,
                  padding: "12px 0",
                  backgroundColor: "#04544f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() => {
                  const challanElement = document.getElementById("challan");
                  import("html2canvas").then((html2canvas) => {
                    html2canvas.default(challanElement).then((canvas) => {
                      import("jspdf").then((jsPDF) => {
                        const pdf = new jsPDF.jsPDF("p", "mm", "a4");
                        const imgData = canvas.toDataURL("image/png");
                        const imgProps = pdf.getImageProperties(imgData);
                        const pdfWidth = pdf.internal.pageSize.getWidth();
                        const pdfHeight =
                          (imgProps.height * pdfWidth) / imgProps.width;
                        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                        pdf.save("vehicle-challan.pdf");
                      });
                    });
                  });
                }}
              >
                Download Challan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleTransferOwnership;
