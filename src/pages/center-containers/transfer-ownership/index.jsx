import React, { useState } from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import { Input, DatePicker, Select, Switch, Row, Col } from "antd";
import transferIcon from "../../../assets/icons/transfer_icon.JPG";

const VehicleTransferOwnership = () => {
  const [showData, setShowData] = useState(false);
  const [showPurchaserForm, setShowPurchaserForm] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [regDate, setRegDate] = useState(null);
  const [processType, setProcessType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowData(true);

    if (processType === "transfer") {
      setShowPurchaserForm(true);
    } else {
      setShowPurchaserForm(false);
    }
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

      {/* First Form */}
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
        <div className="text-center">
          <span className="Profiles-Manager block">Change of Ownership</span>
          <span
            className="Profiles-Manager2 block"
            style={{ marginTop: "8px" }}
          >
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

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2"
        >
          <div className="Input-Field w-full ">
            <label className="Textfield-Label">Registration No.</label>
            <div className="input-frame w-full reg-no-div">
              <Input
                placeholder="Enter here..."
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                allowClear
                className="w-full border-0 shadow-none reg-no-input"
              />
            </div>
          </div>

          <div className="Input-Field w-full">
            <label className="Textfield-Label">Registration Date</label>
            <div className="input-frame w-full reg-no-div">
              <DatePicker
                placeholder="Enter Date"
                className="w-full border-0 shadow-none date-picker-cls"
                value={regDate}
                onChange={(date) => setRegDate(date)}
                allowClear
              />
            </div>
          </div>

          <div className="Input-Field w-full ">
            <label className="Textfield-Label">Select Process Type</label>
            <div className="input-frame w-full select-div">
              <Select
                placeholder="Select"
                className="w-full border-0 shadow-none slect-proceess-type-cls"
                value={processType}
                onChange={(value) => setProcessType(value)}
                allowClear
                options={[
                  { value: "transfer", label: "Ownership Transfer" },
                  { value: "inspection", label: "Inspection" },
                ]}
              />
            </div>
          </div>

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

      {/* Second Form - Purchaser Information */}
      {showPurchaserForm && (
        <div className="Frame-1000009526">
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
            <Row gutter={[16, 32]}>
              <Col xs={24} sm={8}>
                <span className="Dropdown-Label">Owner Type*</span>
                <Select placeholder="Select..." style={{ width: "100%" }} />
              </Col>
              <Col xs={24} sm={8}>
                <span className="Textfield-Label">NTN No.</span>
                <Input placeholder="Enter NTN..." />
              </Col>
              <Col xs={24} sm={8}>
                <span className="Textfield-Label">CNIC No.</span>
                <Input placeholder="Enter CNIC..." />
              </Col>
              <Col xs={24} sm={8}>
                <span className="Textfield-Label">Passport No.</span>
                <Input placeholder="Enter Passport No." />
              </Col>
              <Col xs={24} sm={8}>
                <span className="Textfield-Label">Purchaser Name*</span>
                <Input placeholder="Enter Purchaser Name" />
              </Col>
              <Col xs={24} sm={8}>
                <span className="Textfield-Label">F/H/W/O Name</span>
                <Input placeholder="Enter F/H/W/O Name" />
              </Col>
              <Col xs={24} sm={12}>
                <span className="Phone-Number font-bold">Contact Number</span>

                <Input placeholder="Enter Contact Number" />
              </Col>
              <Col xs={24} sm={12}>
                <span className="Phone-Number font-bold">
                  Other Contact Number
                </span>
                <Input placeholder="Enter Other Contact Number" />
              </Col>
              <Col xs={24} sm={12}>
                <span className="Description font-bold">Present Address</span>
                <Input.TextArea placeholder="Enter Address..." rows={2} />
              </Col>
              <Col xs={24} sm={12}>
                <span className="Description font-bold">Permanent Address</span>
                <Input.TextArea placeholder="Enter Address..." rows={2} />
              </Col>
              <Col xs={24} sm={12}>
                <span className="Dropdown-Label">
                  District (Present Address)
                </span>
                <Select placeholder="Select District" style={{ width: "100%" }}>
                  <Select.Option value="district1">District 1</Select.Option>
                  <Select.Option value="district2">District 2</Select.Option>
                </Select>
              </Col>
              <Col xs={24} sm={12}>
                <span className="Dropdown-Label font-bold">
                  District (Permanent Address)
                </span>
                <Select placeholder="Select District" style={{ width: "100%" }}>
                  <Select.Option value="district1">District 1</Select.Option>
                  <Select.Option value="district2">District 2</Select.Option>
                </Select>
              </Col>
            </Row>

            {/* Row 2: Hire Purchase + Physical Inspection */}
            <Row gutter={[16, 0]} style={{ marginTop: "32px" }}>
              <Col span={24}>
                <div className="my-6 border-t border-gray-300"></div>

                <div className="hire-purchase-container mt-6">
                  {/* Title */}
                  <span className="Hire-Purchase-Agreement block">
                    Hire Purchase Agreement
                  </span>
                  {/* Switch */}
                  <Switch />
                </div>
              </Col>

              <Col span={24} style={{ marginTop: "8px" }}>
                <div className="input-wrapper full-width">
                  <span className="Textfield-Label">Bank / Company Name</span>
                  <Input placeholder="Enter Bank / Company Name" />
                </div>
              </Col>

              <Col span={24}>
                <div className="mt-8">
                  <span className="Physical-Inspection-Request">
                    Physical Inspection Request
                  </span>
                </div>
              </Col>

              <Col span={24} style={{ marginTop: "8px", marginBottom: "8px" }}>
                <span className="city-select-label">Select your city</span>
              </Col>

              <Col span={24}>
                <div className="Frame-1">
                  <select className="city-select-dropdown">
                    <option value="">Choose city</option>
                    <option value="karachi">Karachi</option>
                    <option value="lahore">Lahore</option>
                    <option value="islamabad">Islamabad</option>
                  </select>
                </div>
              </Col>
            </Row>

            {/* Note Section */}
            <div style={{ marginTop: "16px" }} className="Note">
              <div className="NOTE-Wrapper">
                <span className="text-style-1">
                  NOTE: For updates please visit our pages
                </span>
                <div className="links">
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

            <div style={{ marginTop: "24px" }}>
              <button className="Save_button">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleTransferOwnership;
