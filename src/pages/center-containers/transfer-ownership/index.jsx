import React, { useState } from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import { Input, DatePicker, Select } from "antd";

// ✅ Correct image import
import transferIcon from "../../../assets/icons/transfer_icon.JPG";

const VehicleTransferOwnership = () => {
  const [showData, setShowData] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [regDate, setRegDate] = useState(null);
  const [processType, setProcessType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowData(true);
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
      }}
    >
      {/* Main Heading */}
      <span
        className="Main-Heading"
        style={{
          fontSize: "clamp(16px, 2.2vw, 24px)",
          fontWeight: "bold",
          textAlign: "center",
          maxWidth: "95%",
          lineHeight: "1.4",
        }}
      >
        POST-REGISTRATION PROCESS APPLICATION (PHYSICAL INSPECTION REQUEST)
      </span>

      {/* Form container */}
      <div
        style={{
          maxWidth: "1100px",
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
        {/* Form Heading */}
        <div className="text-center">
          <span className="Profiles-Manager block">Change of Ownership</span>
          <span className="Profiles-Manager2 block" style={{ marginTop: "8px" }}>
            Please provide the details below to view owner information
          </span>
          <hr
            style={{
              marginTop: "15px",
              border: "none",
              borderTop: "1px solid #e3e3e3",
            }}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2"
        >
          {/* Registration No */}
          <div className="Input-Field">
            <label className="Textfield-Label">Registration No.</label>
            <div className="input-frame">
              <Input
                placeholder="Enter here..."
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                allowClear
                style={{ border: "none", boxShadow: "none", width: "100%" }}
              />
            </div>
          </div>

          {/* Registration Date */}
          <div className="Input-Field">
            <label className="Textfield-Label">Registration Date</label>
            <div className="input-frame">
              <DatePicker
                style={{ width: "100%", border: "none", boxShadow: "none" }}
                value={regDate}
                onChange={(date) => setRegDate(date)}
                allowClear
              />
            </div>
          </div>

          {/* Process Type */}
          <div className="Input-Field">
            <label className="Textfield-Label">Select Process Type</label>
            <div className="input-frame">
              <Select
                value={processType}
                onChange={(value) => setProcessType(value)}
                allowClear
                style={{ width: "100%", border: "none", boxShadow: "none" }}
                options={[
                  { value: "transfer", label: "Ownership Transfer" },
                  { value: "inspection", label: "Inspection" },
                ]}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="Input-Field flex items-end">
            <button type="submit" className="submit-frame w-full">
              <span className="text-sm font-bold text-[#276749]">Submit</span>
            </button>
          </div>
        </form>

        {/* Icon + Info (when no data) */}
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

        {/* Dummy Data (when submitted) */}
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
                <span className="label">Registration No.</span>
                <span className="value">{regNo || "N/A"}</span>
              </div>
              <div className="dummy-data-item">
                <span className="label">Registration Date</span>
                <span className="value">
                  {regDate ? regDate.format("DD-MM-YYYY") : "N/A"}
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
              <div className="dummy-data-item">
                <span className="label">Current Owner CNIC</span>
                <span className="value">1730188367206</span>
              </div>
              <div className="dummy-data-item">
                <span className="label">Current Owner Name</span>
                <span className="value">Salman Ahmed</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VehicleTransferOwnership;
