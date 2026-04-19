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
import { useAuthFetch } from "../../../libs/hooks/useAuthFetch";
import { API_ENDPOINTS } from "../../../constants";

const VehicleTransferOwnership = () => {
  const authFetch = useAuthFetch();
  const [showData, setShowData] = useState(false);
  const [showPurchaserForm, setShowPurchaserForm] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [regDate, setRegDate] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nicImage, setNicImage] = useState(null);
  const [transferLetterImage, setTransferLetterImage] = useState(null);
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
  const [biometricNo, setBiometricNo] = useState("");
  const [currentOwnerName, setCurrentOwnerName] = useState("");
  const [permAddress, setPermAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerCnic, setOwnerCnic] = useState("");
  const [transferDate, setTransferDate] = useState(dayjs());
  const [ownerFatherName, setOwnerFatherName] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [firstOwnerName, setFirstOwnerName] = useState("");
  const [firstOwnerFatherName, setFirstOwnerFatherName] = useState("");
  const [firstOwnerCnic, setFirstOwnerCnic] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    purchaserName: "",
    fatherName: "",
    cnic: "",
    address: "",
  });

  const [previewData, setPreviewData] = useState(null);
  const [challanData, setChallanData] = useState(null);
  const [challanLoading, setChallanLoading] = useState(false);
  const [challanError, setChallanError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setVehicleData(null);
    setShowData(false);
    setShowPurchaserForm(false);
    setLoading(true);

    try {
      const formattedDate = regDate ? dayjs(regDate).format("DD/MM/YYYY") : "";

      const response = await authFetch(API_ENDPOINTS.GET_BIO_DET, {
        method: "POST",
        body: JSON.stringify({
          TRANSACTION_NO: biometricNo,
          REG_NO: regNo.toUpperCase(),
          REG_DATE: formattedDate,
        }),
      });

      if (!response) return; // 401 handled by authFetch

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        // API returns non-standard format: {ErrorCode=001, ErrorMessage="..."}
        const inner = text.trim().replace(/^\{|\}$/g, "");
        result = {};
        inner.split(",").forEach((pair) => {
          const eqIdx = pair.indexOf("=");
          if (eqIdx !== -1) {
            const key = pair.slice(0, eqIdx).trim();
            const val = pair.slice(eqIdx + 1).trim().replace(/^"|"$/g, "");
            result[key] = val;
          }
        });
      }

      if (result.ErrorCode) {
        throw new Error(result.ErrorMessage || "An error occurred. Please try again.");
      }

      const vehicle = result.vehicle?.[0] || {};
      const bio = result.bio?.[0] || {};

      setVehicleData(vehicle);
      setOwnerName(vehicle.OWNER_NAME || "");
      setCurrentOwnerName(vehicle.OWNER_NAME || "");
      setOwnerCnic(bio.CNIC || "");
      setOwnerFatherName("");
      setOwnerAddress("");
      setCnic(bio.PURCHASERID || "");
      setFirstOwnerName(vehicle.FIRST_OWNER_NAME || "");
      setFirstOwnerFatherName(vehicle.FIRST_OWNER_FATHERNAME || "");
      setFirstOwnerCnic(vehicle.FIRST_OWNER_CNIC || "");
      setShowData(true);
      setShowPurchaserForm(true);
    } catch (err) {
      console.error("Error fetching bio details:", err);
      setError(err.message || "Unable to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
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
                    placeholder="e.g., ALB-572"
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
                placeholder="e.g., 1234567890"
                value={biometricNo}
                onChange={(e) => setBiometricNo(e.target.value.toUpperCase())}
                className="w-full"
              />
            </Col>

            <Col flex="150px">
              <button
                type="submit"
                className="submit-frame w-full"
                disabled={loading || !regNo || !regDate || !biometricNo}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </Col>
          </Row>
        </form>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Info Before Submit */}
        {!showData && !error && (
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
                <span className="label">Engine No.</span>
                <div className="value">{vehicleData?.VEH_ENGINE_NO || "N/A"}</div>
              </div>

              <div className="dummy-data-item">
                <span className="label">First Owner Name</span>
                <div className="value">{firstOwnerName || "N/A"}</div>
              </div>

              <div className="dummy-data-item">
                <span className="label">First Owner F/H/W/O</span>
                <div className="value">{firstOwnerFatherName || "N/A"}</div>
              </div>

              <div className="dummy-data-item">
                <span className="label">First Owner CNIC</span>
                <div className="value">{firstOwnerCnic || "N/A"}</div>
              </div>

              <div className="dummy-data-item">
                <span className="label">Chasis No.</span>
                <div className="value">{vehicleData?.VEH_CHASIS_NO || "N/A"}</div>
              </div>

              <div className="dummy-data-item">
                <span className="label">Current Owner CNIC</span>
                <div className="value">{ownerCnic || "N/A"}</div>
              </div>

              <div className="dummy-data-item">
                <span className="label">Current Owner Name</span>
                <div className="value">{ownerName || "N/A"}</div>
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
                <Input
                  value={cnic}
                  readOnly
                  placeholder="Auto-filled from biometric"
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
                  onChange={(e) => {
                    const val = e.target.value;
                    setEmail(val);
                    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                      setEmailError("Please enter a valid email address");
                    } else {
                      setEmailError("");
                    }
                  }}
                  placeholder="Enter Email Address"
                  className="uniform-input1"
                  status={emailError ? "error" : ""}
                />
                {emailError && (
                  <span style={{ color: "#ff4d4f", fontSize: "12px" }}>
                    {emailError}
                  </span>
                )}
              </Col>

              <Col xs={24} sm={12} style={{ marginTop: "8px" }}>
                <span className="Textfield-Label">Upload CNIC Image</span>
                <div
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                  style={{ height: "100px", marginTop: "4px" }}
                  onClick={() => document.getElementById("nic-upload").click()}
                >
                  {nicImage ? (
                    <img
                      src={URL.createObjectURL(nicImage)}
                      alt="CNIC"
                      className="h-full w-full object-contain rounded-lg"
                    />
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
                      </svg>
                      <span className="text-sm text-gray-500">Click to upload CNIC</span>
                    </>
                  )}
                  <input
                    id="nic-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setNicImage(e.target.files[0] || null)}
                  />
                </div>
                {nicImage && (
                  <button
                    type="button"
                    className="text-xs text-red-500 mt-1"
                    onClick={() => setNicImage(null)}
                  >
                    Remove
                  </button>
                )}
              </Col>

              <Col xs={24} sm={12} style={{ marginTop: "8px" }}>
                <span className="Textfield-Label">Upload Transfer Letter</span>
                <div
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                  style={{ height: "100px", marginTop: "4px" }}
                  onClick={() => document.getElementById("transfer-letter-upload").click()}
                >
                  {transferLetterImage ? (
                    <img
                      src={URL.createObjectURL(transferLetterImage)}
                      alt="Transfer Letter"
                      className="h-full w-full object-contain rounded-lg"
                    />
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
                      </svg>
                      <span className="text-sm text-gray-500">Click to upload Transfer Letter</span>
                    </>
                  )}
                  <input
                    id="transfer-letter-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setTransferLetterImage(e.target.files[0] || null)}
                  />
                </div>
                {transferLetterImage && (
                  <button
                    type="button"
                    className="text-xs text-red-500 mt-1"
                    onClick={() => setTransferLetterImage(null)}
                  >
                    Remove
                  </button>
                )}
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

              <Col xs={24} sm={12} style={{ marginTop: "8px" }}>
                <div className="w-full">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Bank / Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter...."
                    className="w-full h-12 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              <Col xs={24} sm={12} style={{ marginTop: "8px" }}>
                <span className="city-select-label">Select your city</span>
                <div className="frame-1 w-full h-12 rounded-md overflow-hidden" style={{ marginTop: "4px" }}>
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

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="Save_button"
                style={{ width: "30%" }}
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
                  <span className="card-value">{firstOwnerName || "N/A"}</span>
                </div>

                <div className="field father-name">
                  <span className="card-label">F/O/W Name:</span>
                  <span className="card-value">{firstOwnerFatherName || "N/A"}</span>
                </div>

                <div className="field cnic-field">
                  <span className="card-label">CNIC:</span>
                  <span className="card-value">{firstOwnerCnic || "N/A"}</span>
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
                  <span className="card-value">{fatherName || "N/A"}</span>
                </div>

                <div className="field transfer-cnic">
                  <span className="card-label">CNIC No:</span>
                  <span className="card-value">{ownerCnic || "N/A"}</span>
                </div>

                <div className="field transfer-address">
                  <span className="card-label">Present Address:</span>
                  <span className="card-value">{tempAddress || "N/A"}</span>
                </div>

                {/* RIGHT SIDE FIELDS */}

                <div className="field back-field chassis-back">
                  <span className="card-label">Chassis Number:</span>
                  <span className="card-value">{vehicleData?.VEH_CHASIS_NO || "N/A"}</span>
                </div>

                <div className="field back-field engine-back">
                  <span className="card-label">Engine Number:</span>
                  <span className="card-value">{vehicleData?.VEH_ENGINE_NO || "N/A"}</span>
                </div>

                <div className="field back-field hpa-back">
                  <span className="card-label">HPA:</span>
                  <span className="card-value">{vehicleData?.HPA || "N/A"}</span>
                </div>

                <div className="field back-field cylinder-back">
                  <span className="card-label">Engine Size:</span>
                  <span className="card-value">{vehicleData?.VEH_ENGINE_SIZE ? `${vehicleData.VEH_ENGINE_SIZE} CC` : "N/A"}</span>
                </div>

                <div className="field back-field body-back">
                  <span className="card-label">Type of Body/Color:</span>
                  <span className="card-value">{vehicleData?.BODYTYPE && vehicleData?.COLOR ? `${vehicleData.BODYTYPE} / ${vehicleData.COLOR}` : vehicleData?.COLOR || "N/A"}</span>
                </div>

                <div className="field back-field prev-reg-back">
                  <span className="card-label">Year of Manufacture:</span>
                  <span className="card-value">{vehicleData?.VEH_YEAR_OF_MANF || "-"}</span>
                </div>

                <div className="field back-field maker-back">
                  <span className="card-label">Maker's / Make Name:</span>
                  <span className="card-value">{vehicleData?.["MAKER/ MAKE"] || "N/A"}</span>
                </div>

                <div className="field back-field class-back">
                  <span className="card-label">Purchase Type:</span>
                  <span className="card-value">{vehicleData?.VPT_TYPE || "N/A"}</span>
                </div>

                <div className="field back-field unladen-back">
                  <span className="card-label">Unladen Weight:</span>
                  <span className="card-value">-</span>
                </div>

                <div className="field back-field laden-back">
                  <span className="card-label">Registerd Laden Weight:</span>
                  <span className="card-value">-</span>
                </div>

                <div className="field back-field tyre-heading">
                  <span className="card-label" style={{ fontWeight: "800" }}>
                    Tyre Size:
                  </span>
                  <span className="card-value"></span>
                </div>

                <div className="field back-field tyre-front">
                  <span className="card-label">Front Axle:</span>
                  <span className="card-value">-</span>
                </div>

                <div className="field back-field tyre-rear">
                  <span className="card-label">Rear Axle:</span>
                  <span className="card-value">-</span>
                </div>

                <div className="field back-field tyre-other">
                  <span className="card-label">Other Axle:</span>
                  <span className="card-value">-</span>
                </div>
              </div>
            </div>

            {/* SMART CARD END */}

            <div className="preview-buttons">
              <button
                className="back-button"
                onClick={() => setShowPreview(false)}
              >
                GO BACK AND EDIT
              </button>

              <button
                className="confirm-button"
                disabled={challanLoading}
                onClick={async () => {
                  setChallanError(null);
                  setChallanLoading(true);
                  try {
                    const formattedDate = regDate ? dayjs(regDate).format("DD/MM/YYYY") : "";
                    const response = await authFetch(API_ENDPOINTS.PROCESS_BIO, {
                      method: "POST",
                      body: JSON.stringify({
                        TRANSACTION_NO: biometricNo,
                        REG_NO: regNo.toUpperCase(),
                        REG_DATE: formattedDate,
                        PURCHASER_NAME: purchaserName,
                        PURCHASER_FATHER_NAME: fatherName,
                        PURCHASER_CONTACT_NUMBER: contactNumber,
                        PURCHASER_CONTACT_NUMBER2: otherContactNumber,
                        PURCHASER_EMAIL: email,
                      }),
                    });
                    if (!response) return;
                    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                    const result = await response.json();
                    setChallanData(result);
                    setShowChallan(true);
                  } catch (err) {
                    setChallanError(err.message || "Failed to process. Please try again.");
                  } finally {
                    setChallanLoading(false);
                  }
                }}
              >
                {challanLoading ? "Processing..." : "CONFIRM AND SUBMIT"}
              </button>
              {challanError && (
                <div style={{ color: "#ff4d4f", fontSize: "12px", textAlign: "center", marginTop: "8px", width: "100%" }}>
                  {challanError}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =======================================
           CHALLAN SECTION (FIXED)
         ======================================== */}
      {showChallan && (
        <div className="nbp-challan-wrapper">
          <div id="challan" className="nbp-challan">
            <div className="challan-inner">
              <div className="challan-header">
                <h2>NATIONAL BANK OF PAKISTAN</h2>
                <h3>Dues Payment Receipt</h3>
              </div>

              <div className="challan-info">
                <div className="left">
                  <p>
                    <strong>Registration No:</strong> {challanData?.REGISTRATION_NO || regNo || "-"}
                  </p>
                  <p>
                    <strong>Application Type:</strong> TRANSFER OF OWNERSHIP
                  </p>
                  <p>
                    <strong>Chassis No.:</strong> {challanData?.CHASSIS_NO || vehicleData?.VEH_CHASIS_NO || "-"}
                  </p>
                  <p>
                    <strong>Category:</strong> {challanData?.CATEGORY || "-"}
                  </p>
                  <p>
                    <strong>Body Type:</strong> {challanData?.BODYTYPE || "-"}
                  </p>
                  <p>
                    <strong>Owner Name:</strong> {ownerName || "-"}
                  </p>
                  <p>
                    <strong>Father / Husband Name:</strong> {fatherName || "-"}
                  </p>
                  <p>
                    <strong>Vehicle Status:</strong> {challanData?.VEHICLE_STATUS || "-"}
                  </p>
                  <p>
                    <strong>Payment From:</strong> {challanData?.TAX_PAID_FROM ? dayjs(challanData.TAX_PAID_FROM).format("DD-MM-YYYY") : "-"}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> {challanData?.TOTAL_AMOUNT?.toLocaleString() || "-"}
                  </p>
                </div>

                <div className="right">
                  <p>
                    <strong>Challan No:</strong> {challanData?.VCT_CHALLAN_NO || "-"}
                  </p>
                  <p>
                    <strong>Challan Date:</strong> {challanData?.CHALLAN_DATE || "-"}
                  </p>
                  <p>
                    <strong>Challan Status:</strong> {challanData?.CHALLAN_STATUS || "-"}
                  </p>
                  <p>
                    <strong>Maker / Brand:</strong> {challanData?.MAKER_MAKE || vehicleData?.["MAKER/ MAKE"] || "-"}
                  </p>
                  <p>
                    <strong>Filer Status:</strong> {challanData?.FILER_STATUS || "-"}
                  </p>
                  <p>
                    <strong>Payment Upto:</strong> {challanData?.TAX_PAID_UPTO || "-"}
                  </p>
                  <p>
                    <strong>Life Time Tax:</strong> {challanData?.VEH_TAX_PAID_LIFE_TIME || "-"}
                  </p>
                  <p>
                    <strong>Payment Date:</strong> {challanData?.PAYMENT_DATE || "-"}
                  </p>
                </div>
              </div>

              <div className="challan-note">
                Kindly make payment of following dues at bank booth situated in
                this office or online system for electronic payment. Please
                check the vehicle particulars and amount carefully.
              </div>

              <table className="challan-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {challanData?.TAX_FINE_DETAIL?.map((item) => (
                    <tr key={item.TAT_ID}>
                      <td>{item.TAT_NAME}</td>
                      <td>{item.VTH_AMOUNT_PAID?.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td>Total</td>
                    <td>{challanData?.TOTAL_AMOUNT?.toLocaleString() || "-"}</td>
                  </tr>
                </tbody>
              </table>

              <div className="challan-footer">
                <div>
                  Print on: {dayjs().format("DD/MM/YYYY")}
                </div>

                <div className="branch-info">
                  National Bank of Pakistan <br />
                  E.T.D Office H9 Branch <br />
                  Islamabad <br />
                  Challan No: {challanData?.VCT_CHALLAN_NO || "-"}
                </div>
              </div>

            </div>
          </div>

          {/* BUTTONS - outside #challan so they are excluded from PDF */}
          <div className="preview-buttons" style={{ marginTop: "24px", width: "100%", maxWidth: "1200px" }}>
            <button
              className="back-button"
              onClick={() => {
                setShowChallan(false);
                setShowPreview(false);
                setShowPurchaserForm(false);
                setShowData(false);
              }}
            >
              Back to Homepage
            </button>

            <button
              className="confirm-button"
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

                      pdf.addImage(
                        imgData,
                        "PNG",
                        0,
                        0,
                        pdfWidth,
                        pdfHeight,
                      );
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
      )}
    </div>
  );
};

export default VehicleTransferOwnership;
