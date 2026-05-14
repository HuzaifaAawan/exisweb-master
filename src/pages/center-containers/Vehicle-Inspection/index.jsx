/* eslint-disable no-unused-vars */
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import transferIcon from "../../../assets/icons/transfer_icon.JPG";
import noteIcon from "../../../assets/icons/note.png";
import "./media_transfer.scss";

import { Select, Row, Col } from "antd";
import { useState } from "react";

import { LabelDatePicker } from "../../../components/common/label-date-picker/index.js";
import UppercaseInput from "../../../components/CapitalizedInput.jsx";

const VehicleInspection = () => {
  const [showData, setShowData] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [regDate, setRegDate] = useState(null);
  const [engineNo, setEngineNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [processType, setProcessType] = useState(null);
  const [inspectionNumber, setInspectionNumber] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowData(true);

    // Temporary inspection number
    // Later backend/API se value yahan set kar dena
    setInspectionNumber(`VIN-${Date.now()}`);
  };

  return (
    <div
      className="transfer-ownership"
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
      <span className="page-title">
        POST-REGISTRATION PROCESS APPLICATION (PHYSICAL INSPECTION REQUEST)
      </span>

      {/* First Form */}
      <div
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
        <div className="py-3">
          <div className="mb-1">
            <span
              className="block font-bold text-lg leading-tight"
              style={{ lineHeight: "1.3", wordBreak: "break-word" }}
            >
              Physical Inspection Request
            </span>
          </div>

          <div className="mb-3">
            <span
              className="block text-gray-600 text-sm leading-normal"
              style={{ lineHeight: "1.5", wordBreak: "break-word" }}
            >
              Please provide the details below to proceed with physical
              inspection request
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
          <Row
            gutter={[20, 16]}
            className="items-end w-full"
            style={{
              flexWrap: "wrap",
              rowGap: "16px",
            }}
          >
            {/* Process Type */}
            <Col xs={24} sm={24} md={12} lg={7}>
              <div className="field-box">
                <label htmlFor="processType" className="Textfield-Label">
                  Select Process Type
                </label>

                <div className="process-type-field">
                  <Select
                    id="processType"
                    placeholder="Select"
                    className="w-full custom-select"
                    value={processType ?? null}
                    onChange={(value) => setProcessType(value ?? null)}
                    allowClear
                    options={[
                      {
                        value: "new_vehicle_registration",
                        label: "New Vehicle Registration",
                      },
                      {
                        value: "transfer_of_ownership",
                        label: "Transfer of Ownership",
                      },
                      {
                        value: "other_type_of_applications",
                        label: "Other type of applications",
                      },
                    ]}
                  />
                </div>
              </div>
            </Col>
            {/* Registration Date */}
            <Col xs={24} sm={24} md={12} lg={7}>
              <div className="w-full">
                <label className="Textfield-Label">
                  {processType === "new_vehicle_registration"
                    ? "Engine No."
                    : "Registration No."}
                </label>

                <UppercaseInput
                  placeholder="Enter here..."
                  value={
                    processType === "new_vehicle_registration"
                      ? engineNo
                      : regNo
                  }
                  onChange={(val) =>
                    processType === "new_vehicle_registration"
                      ? setEngineNo(val)
                      : setRegNo(val)
                  }
                  className="w-full px-3 py-2 h-12 border border-gray-300 rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-blue-500 
      focus:border-blue-500"
                />
              </div>
            </Col>

            {/* Registration Date */}
            <Col xs={24} sm={24} md={12} lg={7}>
              {processType === "new_vehicle_registration" ? (
                <div className="w-full">
                  <label className="Textfield-Label">Chassis No.</label>

                  <UppercaseInput
                    placeholder="Enter here..."
                    value={chassisNo}
                    onChange={(val) => setChassisNo(val)}
                    className="w-full px-3 py-2 h-12 border border-gray-300 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-blue-500"
                  />
                </div>
              ) : (
                <LabelDatePicker
                  label="Registration Date"
                  value={regDate}
                  setRegDate={setRegDate}
                  className="w-full"
                />
              )}
            </Col>

            {/* Submit Button */}
            <Col xs={24} sm={24} md={12} lg={3}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <button
                  type="submit"
                  className="submit-frame px-4 py-4 rounded-lg bg-[#ebf1f1] 
      text-[#04544f] font-bold text-sm hover:bg-[#d8e4e4] transition-all"
                  style={{ width: "150px" }}
                >
                  Submit
                </button>
              </div>
            </Col>

            {/* City - Next Line */}
            <Col xs={24} sm={24} md={12} lg={7}>
              <div>
                <label className="Textfield-Label">Select your city</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="city-select-field"
                >
                  <option value="">Choose city</option>
                  <option value="islamabad">ISLAMABAD</option>
                  <option value="lahore">LAHORE</option>
                  <option value="karachi">KARACHI</option>
                  <option value="multan">MULTAN</option>
                  <option value="faisalabad">FAISALABAD</option>
                </select>
              </div>
            </Col>
          </Row>
        </form>

        {/* Icon + Info */}
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
              Please enter the above information to proceed with the physical
              inspection request.
            </span>
          </div>
        )}

        {/* Data after submit */}
        {showData && (
          <>
            <hr
              style={{
                borderColor: "#e3e3e3",
                borderWidth: "1px 0 0 0",
                marginTop: "24px",
                marginBottom: "24px",
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="dummy-data-item">
                <span className="label">
                  {processType === "new_vehicle_registration"
                    ? "Engine No."
                    : "Registration No."}
                </span>
                <span className="value">
                  {processType === "new_vehicle_registration"
                    ? engineNo || "N/A"
                    : regNo || "N/A"}
                </span>
              </div>

              <div className="dummy-data-item">
                <span className="label">
                  {processType === "new_vehicle_registration"
                    ? "Chassis No."
                    : "Registration Date"}
                </span>
                <span className="value">
                  {processType === "new_vehicle_registration"
                    ? chassisNo || "N/A"
                    : regDate
                      ? regDate.format("DD-MM-YYYY")
                      : "N/A"}
                </span>
              </div>

              <div className="dummy-data-item">
                <span className="label">Process Type</span>
                <span className="value">
                  {processType === "new_vehicle_registration"
                    ? "New Vehicle Registration"
                    : processType === "transfer_of_ownership"
                      ? "Transfer of Ownership"
                      : processType === "other_type_of_applications"
                        ? "Other type of applications"
                        : "N/A"}
                </span>
              </div>

              <div className="dummy-data-item">
                <span className="label">City</span>
                <span className="value">
                  {city ? city.toUpperCase() : "N/A"}
                </span>
              </div>

              <div className="dummy-data-item">
                <span className="label">Chasis No.</span>
                <span className="value">MF52G-331556</span>
              </div>

              <div className="dummy-data-item">
                <span className="label">Engine No.</span>
                <span className="value">K2K-8760982</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Vehicle Inspection Number Section */}
      {showData && (
        <div className="Frame-1000009526">
          <div style={{ padding: "0 24px" }}>
            <div className="inspection-application-box">
              <div className="selected-process-text">
                SELECTED PROCESS:{" "}
                <span>
                  {processType === "new_vehicle_registration"
                    ? "New Vehicle Registration"
                    : processType === "transfer_of_ownership"
                      ? "Transfer Of Ownership"
                      : processType === "other_type_of_applications"
                        ? "Other Type Of Applications"
                        : "N/A"}
                </span>
              </div>

              <div className="inspection-application-title">
                PHYSICAL INSPECTION APPLICATION NUMBER :{" "}
                <span>{inspectionNumber || "N/A"}</span>
              </div>

              <ul className="inspection-instructions">
                <li>
                  KINDLY VISIT ETD OFFICE FOR YOUR VEHICLE PHYSICAL INSPECTION.
                </li>
                <li>
                  VEHICLES INSPECTED BY ETD STAFF MUST BE IMMEDIATELY HANDED
                  OVER TO THE BUYER.
                </li>
                <li>
                  IT IS THE BUYER'S DUTY TO ENSURE THEY RECEIVE SAME VEHICLE
                  INSPECTED BY ETD STAFF.
                </li>
                <li>
                  PLEASE ENSURE THAT BIOMETRIC VERIFICATION OF THE SELLER AND
                  BUYER ALIGN WITH THIS APPLICATION.
                </li>
                <li>
                  BIOMETRIC VERIFICATION IS ONLY ALLOWED AFTER THE VEHICLE HAS
                  BEEN INSPECTED BY ETD STAFF.
                </li>
                <li>
                  CHANGE OF OWNERSHIP IS SUBJECT TO CURRENT OWNER'S BIOMETRIC
                  VERIFICATION FROM NADRA.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleInspection;
