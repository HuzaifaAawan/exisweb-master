import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import { Input, DatePicker, Select, Switch, Row, Col } from "antd"; 
import transferIcon from "../../../assets/icons/transfer_icon.JPG";
import noteIcon from "../../../assets/icons/note.png";
 
import { useState } from "react";

const VehicleTransferOwnership = () => {
  const [showData, setShowData] = useState(false);
  const [showPurchaserForm, setShowPurchaserForm] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [regDate, setRegDate] = useState(null);
  const [processType, setProcessType] = useState(null);

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
        padding:"1.33rem"
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
          // maxWidth: "1100px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid #e3e3e3",
          backgroundColor: "#fff",
          marginTop: "16px",
          margin:"2rem",
          
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
          <div className="w-full">
            <label className="Textfield-Label">Registration No.</label>
            <div className="">
              <Input
                placeholder="Enter here..."
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                allowClear
                className="w-full shadow-none"
              />
            </div>
          </div>

          <div className="w-full items-center">
            <label className="Textfield-Label">Registration Date</label>
            <div className="input-frame">
              <DatePicker
                placeholder="Enter Date"
                className="w-full custom-datepicker"
                value={regDate}
                onChange={(date) => setRegDate(date)}
                allowClear
              />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="processType" className="Textfield-Label">
              Select Process Type
            </label>
            <div className="input-frame w-full">
              <Select
                id="processType"
                placeholder="Select"
                className="w-full custom-select"
                value={processType ?? null}
                onChange={(value) => setProcessType(value ?? null)}
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
<Row gutter={[16, 16]}>
  <Col xs={24} sm={8}>
    <span className="Dropdown-Label Textfield-Label">Owner Type*</span>
    <Select placeholder="Select..." className="uniform-input1">
      <Select.Option value="org">Organization</Select.Option>
      <Select.Option value="ind">Individual</Select.Option>
    </Select>
  </Col>

  <Col xs={24} sm={8}>
    <span className="Textfield-Label">NTN No.</span>
    <Input placeholder="Enter NTN..." className="uniform-input1" />
  </Col>

  <Col xs={24} sm={8}>
    <span className="Textfield-Label">CNIC No.</span>
    <Input placeholder="Enter CNIC..." className="uniform-input1" />
  </Col>

  <Col xs={24} sm={8}>
    <span className="Textfield-Label">Passport No.</span>
    <Input placeholder="Enter Passport No." className="uniform-input1" />
  </Col>

  <Col xs={24} sm={8}>
    <span className="Textfield-Label">Purchaser Name*</span>
    <Input placeholder="Enter Purchaser Name" className="uniform-input1" />
  </Col>

  <Col xs={24} sm={8}>
    <span className="Textfield-Label">F/H/W/O Name</span>
    <Input placeholder="Enter F/H/W/O Name" className="uniform-input1" />
  </Col>

  <Col xs={24} sm={12}>
    <span className="Textfield-Label">Contact Number</span>
    <Input placeholder="Enter Contact Number" className="uniform-input2" />
  </Col>

  <Col xs={24} sm={12}>
    <span className="Textfield-Label">Other Contact Number</span>
    <Input placeholder="Enter Other Contact Number" className="uniform-input2" />
  </Col>

  <Col xs={24} sm={12} className="relative">
  <span className="Textfield-Label">Present Address</span>
  <Input.TextArea
    rows={4}
    placeholder="Enter Address..."
    className="uniform-input2"
  />
  <div className="absolute bottom-2 right-4 text-gray-500 text-sm">
    40 characters left
  </div>
</Col>


  <Col xs={24} sm={12} className="relative">
  <span className="Textfield-Label">Permanent Address</span>
  <Input.TextArea
    rows={4}
    placeholder="Enter Address..."
    className="uniform-input2"
  />
  <div className="absolute bottom-2 right-4 text-gray-500 text-sm">
    40 characters left
  </div>
</Col>

 <Col xs={24} sm={12}>
  <span className="Dropdown-Label w-full Textfield-Label">District (Present Address)</span>
  <Select
    placeholder="Select District"
    className="uniform-input2 w-full max-w-full"
  >
   <Select.Option value="org">Islamabad</Select.Option>
    <Select.Option value="ind">Lahore</Select.Option>
    <Select.Option value="ind">Karachi</Select.Option>
  </Select>
</Col>
<Col xs={24} sm={12}>
  <span className="Dropdown-Label w-full Textfield-Label">District (Permanent Address)</span>
  <Select
    placeholder="Select District"
    className="uniform-input2 w-full max-w-full"
  >
    <Select.Option value="org">Islamabad</Select.Option>
    <Select.Option value="ind">Lahore</Select.Option>
    <Select.Option value="ind">Karachi</Select.Option>
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
  <div className="frame-1 w-full h-12 rounded-md overflow-hidden">
    <select className="w-full h-full bg-transparent px-3 outline-none">
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
      <div className="NOTE-Wrapper flex items-start gap-2">
        {/* Icon */}
        <img
          src={noteIcon}
          alt="Note Icon"
          className="w-5 h-5 mt-2"
        />

        {/* Text and Links */}
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
