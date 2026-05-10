import React, { useEffect, useState } from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import transferIcon from "../../../assets/icons/transfer_icon.JPG";
// import noteIcon from "../../../assets/icons/note.png";
import { message } from "antd";
import VehicleCardPreview from "./VehicleCardPreview";
import { LabelDatePicker } from "../../../components/common/label-date-picker/index.js";
import AttentionModal from "../../../components/attention-modal";
import { Row, Col, Input, Form, Switch } from "antd";
import UppercaseInput, {
  DistrictDropdowns,
} from "../../../components/CapitalizedInput.jsx";

import dayjs from "dayjs";
import { useAuthFetch } from "../../../libs/hooks/useAuthFetch";
import { API_ENDPOINTS } from "../../../constants";

const VehicleTransferOwnership = () => {
  const authFetch = useAuthFetch();
  const [form] = Form.useForm();

  const [showData, setShowData] = useState(false);
  const [showPurchaserForm, setShowPurchaserForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showChallan, setShowChallan] = useState(false);
  const [showAttention, setShowAttention] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  // API Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [tempCity, setTempCity] = useState("");
  const [tempDistrict, setTempDistrict] = useState("");
  const [permCity, setPermCity] = useState("");
  const [permDistrict, setPermDistrict] = useState("");
  const [regNo, setRegNo] = useState("");
  const [regDate, setRegDate] = useState(null);
  const [email, setEmail] = useState("");
  

  
  const [presentAddress, setpresentAddress] = useState(""); 
  const [presentAddressCity, setpresentAddressCity] = useState(""); 
  const [presentAddressDistrict, setpresentAddressDistrict] = useState(""); 
  const [permanentAddress, setpermanentAddress] = useState(""); 
  const [permanentAddressCity, setpermanentAddressCity] = useState(""); 
  const [permanentAddressDistrict, setpermanentAddressDistrict] = useState(""); 
  const [emailError, setEmailError] = useState("");
  const [nicImage, setNicImage] = useState(null);
  const [transferLetterImage, setTransferLetterImage] = useState(null);
  const [cnic, setCnic] = useState("");
  const [purchaserName, setPurchaserName] = useState("");
  const [fhwoName, setFhwoName] = useState("");
  const [ntn, setNtn] = useState("");
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
  const handlePurchaserNext = () => {
    if (!purchaserName?.trim()) {
      message.error("Purchaser Name is required");
      return;
    }

    if (!fatherName?.trim()) {
      message.error("F/H/W/O Name is required");
      return;
    }

    if (!cnic?.trim()) {
      message.error("CNIC No. is required");
      return;
    }

    if (!contactNumber?.trim()) {
      message.error("Mobile Number is required");
      return;
    }

    if (contactNumber.length < 13) {
      message.error("Mobile Number is incomplete");
      return;
    }

    if (!otherContactNumber?.trim()) {
      message.error("Other Mobile Number is required");
      return;
    }

    if (otherContactNumber.length < 13) {
      message.error("Other Mobile Number is incomplete");
      return;
    }

    if (!email?.trim()) {
      message.error("Email Address is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.error("Please enter a valid email address");
      return;
    }

    if (!tempAddress?.trim()) {
      message.error("Temporary Address is required");
      return;
    }

    if (!permAddress?.trim()) {
      message.error("Permanent Address is required");
      return;
    }

    // if (!nicImage) {
    //   message.error("Upload CNIC PDF is required");
    //   return;
    // }

    // if (!transferLetterImage) {
    //   message.error("Upload Transfer Letter PDF is required");
    //   return;
    // }

    setpresentAddressDistrict(tempDistrict || "");
    setpermanentAddressDistrict(permDistrict || "");
    setShowPreview(true);
  };
  const [challanData, setChallanData] = useState(null);
  const [challanLoading, setChallanLoading] = useState(false);
  const [challanError, setChallanError] = useState(null);

  // Fetch data from API when page, pageSize, or search changes
  useEffect(() => {
    const fetchPostRegApps = async () => {
      setApiLoading(true);
      setApiError(null);

      try {
        const response = await authFetch(API_ENDPOINTS.GET_POSTREG_APPS, {
          method: "POST",
          body: JSON.stringify({
            RECORDS_PER_PAGE: pageSize.toString(),
            PAGE_NO: currentPage.toString(),
            SEARCH: searchText.trim(),
          }),
        });

        if (!response) {
          setApiLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        
        setTotalRecords(parseInt(result.TOTAL_RECORDS) || 0);
        setApiData(result.DATA || []);
      } catch (err) {
        console.error("Error fetching post-registration apps:", err);
        setApiError(err.message || "Failed to fetch data. Please try again.");
      } finally {
        setApiLoading(false);
      }
    };

    fetchPostRegApps();
  }, [currentPage, pageSize, searchText]);

  const resetEntireFlow = () => {
    setShowData(false);
    setShowPurchaserForm(false);
    setShowPreview(false);
    setShowChallan(false);
    setShowRequestForm(false);
    setRegNo("");
    setRegDate(null);
    setEmail("");
    setEmailError("");
    setNicImage(null);
    setTransferLetterImage(null);
    setCnic("");
    setPurchaserName("");
    setFhwoName("");
    setNtn("");
    setFatherName("");
    setContactNumber("");
    setOtherContactNumber("");
    setTempAddress("");
    setBiometricNo("");
    setCurrentOwnerName("");
    setPermAddress("");
    setOwnerName("");
    setOwnerCnic("");
    setTransferDate(dayjs());
    setOwnerFatherName("");
    setOwnerAddress("");
    setFirstOwnerName("");
    setFirstOwnerFatherName("");
    setFirstOwnerCnic("");
    setVehicleData(null);
    setLoading(false);
    setError(null);
    setChallanData(null);
    setChallanLoading(false);
    setChallanError(null);
    setHpaParty("");
    setHpaLetterNo("");
    form.resetFields();
  };

  const openNewRequestForm = () => {
    resetEntireFlow();
    setShowRequestForm(true);
  };

  const goBackToTable = () => {
    setShowData(false);
    setShowPurchaserForm(false);
    setShowPreview(false);
    setShowChallan(false);
    setShowRequestForm(false);
    // Reset pagination to first page
    setCurrentPage(1);
  };

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

      if (!response) return;

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        const inner = text.trim().replace(/^\{|\}$/g, "");
        result = {};

        inner.split(",").forEach((pair) => {
          const eqIdx = pair.indexOf("=");

          if (eqIdx !== -1) {
            const key = pair.slice(0, eqIdx).trim();
            const val = pair
              .slice(eqIdx + 1)
              .trim()
              .replace(/^"|"$/g, "");

            result[key] = val;
          }
        });
      }

      if (result.ErrorCode) {
        throw new Error(
          result.ErrorMessage || "An error occurred. Please try again.",
        );
      }

      const vehicle = result.vehicle?.[0] || {};
      const bio = result.bio?.[0] || {};

      console.log("VEHICLE API DATA:", vehicle);
      console.log("BIO API DATA:", bio);

      setVehicleData(vehicle);

      // Current Owner
      setOwnerName(vehicle.CURRENT_OWNER_NAME || "");
      setCurrentOwnerName(vehicle.CURRENT_OWNER_NAME || "");
      setOwnerFatherName(vehicle.CURRENT_OWNER_FNAME || "");  
       setOwnerCnic(
         vehicle.CURRENT_OWNER_CNIC ||
           vehicle.CURRENT_OWNER_CNIC_NO ||
           vehicle.CURRENT_OWNER_NIC ||
           vehicle.CURRENT_OWNER_NIC_NO ||
           vehicle.OWNER_CNIC ||
           vehicle.OWNER_CNIC_NO ||
           vehicle.OWNER_NIC ||
           vehicle.CNIC ||
           vehicle.NIC ||
           vehicle["CURRENT_OWNER_CNIC"] ||
           vehicle["CURRENT OWNER CNIC"] ||
           vehicle["CURRENT OWNER CNIC NO"] ||
           vehicle["OWNER CNIC"] ||
           vehicle["CNIC NO"] ||
           bio.CNIC ||
           bio.OWNER_CNIC ||
           bio.CURRENT_OWNER_CNIC ||
           "",
       );

      // Owner address
      setOwnerAddress("");

      // Purchaser CNIC from biometric
      setCnic(bio.PURCHASERID || "");

      // First Owner
      setFirstOwnerName(vehicle.FIRST_OWNER_NAME || "");
      setFirstOwnerFatherName(vehicle.FIRST_OWNER_FNAME || "");
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
      className="transfer-ownership-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        alignItems: "center",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1.33rem",
      }}
    >
      <span className="page-title">VEHICLE TRANSFER OF OWNERSHIP</span>

      {!showRequestForm && (
        <div className="request-table-card">
          <div className="request-table-header">
            <div>
              <h3 className="request-table-title">
                Transfer of Ownership Applications
              </h3>
            </div>

            <div className="request-table-actions">
              <div className="request-search-box">
                <span className="request-search-icon">⌕</span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="request-new-btn"
                onClick={() => setShowAttention(true)}
              >
                Request New Transfer of Ownership
              </button>
            </div>
          </div>

          <div className="request-table-wrapper">
            <table className="request-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Application Number</th>
                  <th>Application Date</th>
                  <th>Process Name</th>
                  <th>Biometric Tracking ID</th>
                  <th>Biometric Date</th>
                  <th>Vehicle Reg No.</th>
                  <th>Challan No.</th>
                  <th>Challan Status</th>
                  <th>Challan Payment Date</th>
                  <th>Application Status</th>
                </tr>
              </thead>

              <tbody>
                {apiLoading ? (
                  <tr>
                    <td
                      colSpan="11"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      Loading...
                    </td>
                  </tr>
                ) : apiError ? (
                  <tr>
                    <td
                      colSpan="11"
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "red",
                      }}
                    >
                      {apiError}
                    </td>
                  </tr>
                ) : apiData.length > 0 ? (
                  apiData.map((item, index) => (
                    <tr key={item.APPLICATION_NO || index}>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{item.APPLICATION_NO || "-"}</td>
                      <td>{item.APPLICATION_DATE || "-"}</td>
                      <td>{item["PROCESS NAME"] || "-"}</td>
                      <td>{item.BIO_TRACKING_ID || "-"}</td>
                      <td>{item.BIO_DATE || "-"}</td>
                      <td>{item.VEH_REG_NO || "-"}</td>
                      <td>{item.CHALLAN_NO || "-"}</td>
                      <td>{item.CHALLAN_STATUS || "-"}</td>
                      <td>{item.CHALLAN_PAYMENT_DATE || "-"}</td>
                      <td>
                        <span className="status-badge">
                          {item.APPLICATION_STATUS || "-"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <div className="request-empty-state">
                        <div className="request-empty-icon">🗂️</div>
                        <p>No Transfer of Ownership Applications Found.</p>
                        <span>Request a New Transfer to view details</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="request-table-footer">
            <div className="request-page-size">
              {totalRecords} Records Found | {pageSize} Per Page
            </div>

            <div className="request-pagination">
              {(() => {
                const totalPages = Math.ceil(totalRecords / pageSize);
                const pages = [];
                const maxPagesToShow = 7;

                if (totalPages <= maxPagesToShow) {
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  pages.push(1, 2, 3);
                  if (currentPage > 5) pages.push("...");
                  pages.push(totalPages - 2, totalPages - 1, totalPages);
                }

                return pages.map((page, idx) =>
                  page === "..." ? (
                    <span key={idx} className="page-btn dots">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      className={`page-btn ${currentPage === page ? "active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ),
                );
              })()}
            </div>

            <div className="request-footer-actions">
              <button
                type="button"
                className="footer-nav-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                ‹ Previous
              </button>
              <button
                type="button"
                className="footer-nav-btn"
                disabled={currentPage >= Math.ceil(totalRecords / pageSize)}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(totalRecords / pageSize)),
                  )
                }
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}

      {showRequestForm && !showChallan && (
        <>
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
            <div className="back-link-row">
              <button
                type="button"
                className="top-back-button"
                onClick={goBackToTable}
              >
                ← Back to Requests
              </button>
            </div>

            <div>
              <div className="mb-1">
                <span className="block font-bold text-lg">
                  Change of Ownership
                </span>
              </div>

              <div className="mb-3">
                <span className="block text-gray-600 text-sm">
                  Please provide the details below to start your application
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

                <Col xs={24} sm={24} md={12} lg={7}>
                  <LabelDatePicker
                    label="Registration Date"
                    value={regDate}
                    setRegDate={setRegDate}
                    className="w-full"
                  />
                </Col>

                <Col flex="auto">
                  <label className="Textfield-Label">
                    Biometric Verification Tracking Number
                  </label>
                  <Input
                    placeholder="e.g., 1234567890"
                    value={biometricNo}
                    onChange={(e) =>
                      setBiometricNo(e.target.value.toUpperCase())
                    }
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

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

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
                  Please enter the above information to proceed with the change
                  of ownership application.
                </span>
              </div>
            )}

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
                    <div className="value">
                      {vehicleData?.VEH_CHASIS_NO || "N/A"}
                    </div>
                  </div>

                  <div className="dummy-data-item">
                    <span className="label">First Owner CNIC</span>
                    <div className="value">{firstOwnerCnic || "N/A"}</div>
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
                    <span className="label">Current Owner CNIC</span>
                    <div className="value">{ownerCnic || "N/A"}</div>
                  </div>

                  <div className="dummy-data-item">
                    <span className="label">Current Owner Name</span>
                    <div className="value">{ownerName || "N/A"}</div>
                  </div>

                  <div className="dummy-data-item">
                    <span className="label">Current Owner F/H/W/O</span>
                    <div className="value">{ownerFatherName || "N/A"}</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {showPurchaserForm && !showPreview && (
            <div className="Frame-1000009526">
              <div style={{ padding: "0 24px" }}>
                <span className="Profiles-Manager-form2-h1">
                  Purchaser Information
                </span>
                <span className="Profiles-Manager-form2-h2">
                  Please provide the details of the purchaser to whom the
                  ownership is being transferred
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
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={8}>
                    <span className="Dropdown-Label Textfield-Label">
                      Purchaser Name <span style={{ color: "red" }}>*</span>
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
                    <span className="Textfield-Label">
                      F/H/W/O Name <span style={{ color: "red" }}>*</span>
                    </span>
                    <UppercaseInput
                      value={fatherName}
                      onChange={setFatherName}
                      placeholder="Enter Father Name"
                      className="uniform-input1"
                      maxLength={32}
                    />
                  </Col>

                  <Col xs={24} sm={8}>
                    <span className="Textfield-Label">
                      CNIC No. <span style={{ color: "red" }}>*</span>
                    </span>
                    <Input
                      value={cnic}
                      readOnly
                      placeholder="Auto-filled from biometric"
                      className="uniform-input1"
                    />
                  </Col>

                  <Col xs={24} sm={8}>
                    <span className="Textfield-Label">
                      Mobile Number <span style={{ color: "red" }}>*</span>
                    </span>
                    <UppercaseInput
                      value={contactNumber}
                      onChange={setContactNumber}
                      isPhone
                      placeholder="Enter Contact Number"
                    />
                  </Col>

                  <Col xs={24} sm={8}>
                    <span className="Textfield-Label">
                      Other Mobile Number{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <UppercaseInput
                      value={otherContactNumber}
                      onChange={setOtherContactNumber}
                      isPhone
                      placeholder="Enter Other Contact Number"
                    />
                  </Col>

                  <Col xs={24} sm={8}>
                    <span className="Textfield-Label">
                      Email Address <span style={{ color: "red" }}>*</span>
                    </span>
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

                  {/* <Col xs={24} sm={12} style={{ marginTop: "8px" }}>
                    <span className="Textfield-Label">Upload CNIC .PDF</span>
                    <div
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                      style={{ height: "100px", marginTop: "4px" }}
                      onClick={() =>
                        document.getElementById("nic-upload").click()
                      }
                    >
                      {nicImage ? (
                        <img
                          src={URL.createObjectURL(nicImage)}
                          alt="CNIC"
                          className="h-full w-full object-contain rounded-lg"
                        />
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-400 mb-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
                            />
                          </svg>
                          <span className="text-sm text-gray-500">
                            Click to upload CNIC
                          </span>
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
                  </Col> */}

                  {/* <Col xs={24} sm={12} style={{ marginTop: "8px" }}>
                    <span className="Textfield-Label">
                      Upload Transfer Letter .PDF
                    </span>
                    <div
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                      style={{ height: "100px", marginTop: "4px" }}
                      onClick={() =>
                        document
                          .getElementById("transfer-letter-upload")
                          .click()
                      }
                    >
                      {transferLetterImage ? (
                        <img
                          src={URL.createObjectURL(transferLetterImage)}
                          alt="Transfer Letter"
                          className="h-full w-full object-contain rounded-lg"
                        />
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-400 mb-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
                            />
                          </svg>
                          <span className="text-sm text-gray-500">
                            Click to upload Transfer Letter
                          </span>
                        </>
                      )}
                      <input
                        id="transfer-letter-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          setTransferLetterImage(e.target.files[0] || null)
                        }
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
                  </Col> */}

                  <Col xs={24} sm={12} className="relative">
                    <span className="Textfield-Label">
                      Temporary Address <span style={{ color: "red" }}>*</span>
                    </span>

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
                    <span className="Textfield-Label">
                      Permanent Address <span style={{ color: "red" }}>*</span>
                    </span>
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
                    <Form layout="vertical" form={form}>
                      <DistrictDropdowns
                        tempDistrict={tempDistrict}
                        setTempDistrict={setTempDistrict}
                        permDistrict={permDistrict}
                        setPermDistrict={setPermDistrict}
                      />
                    </Form>
                  </Col>
                </Row>

                <Row gutter={[16, 20]} style={{ marginTop: "32px" }}>
                  <Col span={24}>
                    <div className="my-6 border-t border-gray-300"></div>

                    <div className="hire-purchase-container mt-6">
                      <span className="Hire-Purchase-Agreement block">
                        Hire Purchase Agreement
                      </span>
                      {/* <Switch /> */}
                    </div>
                  </Col>

                  {/* Bank / Company Name */}
                  <Col xs={24} sm={12}>
                    <div className="w-full">
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Bank / Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Bank / Company Name"
                        value={hpaParty}
                        className="w-full h-12 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setHpaParty(e.target.value.toUpperCase())}
                      />
                    </div>
                  </Col>

                  {/* Letter No */}
                  <Col xs={24} sm={12}>
                    <div className="w-full">
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Hire Purchase Agreement Letter No.
                      </label>
                      <input
                        type="text"
                        placeholder="Letter No....."
                        value={hpaLetterNo}
                        className="w-full h-12 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setHpaLetterNo(e.target.value.toUpperCase())}
                      />
                    </div>
                  </Col>

                  {/* Upload CNIC PDF */}
                  <Col xs={24} sm={12}>
                    <span className="Textfield-Label">
                      Upload CNIC .PDF <span style={{ color: "red" }}>*</span>
                    </span>

                    <div
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                      style={{ height: "100px", marginTop: "8px" }}
                      onClick={() =>
                        document.getElementById("nic-pdf-upload").click()
                      }
                    >
                      {nicImage ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-sm text-gray-700 font-medium">
                            {nicImage.name}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            Click to change file
                          </span>
                        </div>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-400 mb-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
                            />
                          </svg>

                          <span className="text-sm text-gray-500">
                            Click to upload CNIC
                          </span>
                        </>
                      )}

                      <input
                        id="nic-pdf-upload"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => setNicImage(e.target.files[0] || null)}
                      />
                    </div>

                    {nicImage && (
                      <button
                        type="button"
                        className="text-xs text-red-500 mt-1"
                        onClick={() => {
                          setNicImage(null);
                          document.getElementById("nic-pdf-upload").value = "";
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </Col>

                  {/* Upload Transfer Letter PDF */}
                  <Col xs={24} sm={12}>
                    <span className="Textfield-Label">
                      UPLOAD TRANSFER LETTER .PDF <span style={{ color: "red" }}>*</span>
                    </span>

                    <div
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                      style={{ height: "100px", marginTop: "8px" }}
                      onClick={() =>
                        document
                          .getElementById("transfer-letter-pdf-upload")
                          .click()
                      }
                    >
                      {transferLetterImage ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-sm text-gray-700 font-medium">
                            {transferLetterImage.name}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            Click to change file
                          </span>
                        </div>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-400 mb-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
                            />
                          </svg>

                          <span className="text-sm text-gray-500">
                            Click to upload Transfer Letter
                          </span>
                        </>
                      )}

                      <input
                        id="transfer-letter-pdf-upload"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) =>
                          setTransferLetterImage(e.target.files[0] || null)
                        }
                      />
                    </div>

                    {transferLetterImage && (
                      <button
                        type="button"
                        className="text-xs text-red-500 mt-1"
                        onClick={() => {
                          setTransferLetterImage(null);
                          document.getElementById(
                            "transfer-letter-pdf-upload",
                          ).value = "";
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </Col>
                </Row>

                <div
                  style={{
                    marginTop: "24px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    className="Save_button"
                    style={{ width: "30%" }}
                    onClick={handlePurchaserNext}
                  >
                    Next
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
                  Vehicle Identification Card. If no changes are required,
                  please confirm and submit.
                </span>

                <VehicleCardPreview
                  purchaserName={firstOwnerName}
                  fatherName={firstOwnerFatherName}
                  cnic={firstOwnerCnic}
                  regDate={regDate}
                  currentOwnerName={purchaserName}
                  newFatherName={fatherName}
                  transferDate={transferDate}
                  tempAddress={tempAddress}
                  vehicleData={vehicleData}
                  ownerCnic={cnic}
                />

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
                        const formattedDate = regDate
                          ? dayjs(regDate).format("DD/MM/YYYY")
                          : "";

                        const response = await authFetch(
                          API_ENDPOINTS.PROCESS_BIO,
                          {
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
                              PURCHASER_TEMP_ADDRESS: tempAddress,
                              PURCHASER_TEMP_CITY: presentAddressCity,
                              PURCHASER_TEMP_DISTRICT: presentAddressDistrict,
                              PURCHASER_PRMNT_ADDRESS: permAddress,
                              PURCHASER_PRMNT_CITY: permanentAddressCity,
                              PURCHASER_PRMNT_DISTRICT: permanentAddressDistrict,
                              HPA_PARTY: hpaParty,
                              HPA_LETTER_NO: hpaLetterNo
                            }),
                          },
                        );

                        if (!response) return;

                        if (!response.ok) {
                          throw new Error(`Error: ${response.statusText}`);
                        }

                        const result = await response.json();
                        console.log("PROCESS_BIO RESULT:", result);

                        setChallanData(result);
                        setShowChallan(true);
                        // Refresh the table
                        setCurrentPage(1);
                      } catch (err) {
                        setChallanError(
                          err.message || "Failed to process. Please try again.",
                        );
                      } finally {
                        setChallanLoading(false);
                      }
                    }}
                  >
                    {challanLoading ? "Processing..." : "CONFIRM AND SUBMIT"}
                  </button>

                  {challanError && (
                    <div
                      style={{
                        color: "#ff4d4f",
                        fontSize: "12px",
                        textAlign: "center",
                        marginTop: "8px",
                        width: "100%",
                      }}
                    >
                      {challanError}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

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
                    <strong>Registration No:</strong>{" "}
                    {challanData?.REGISTRATION_NO || regNo || "-"}
                  </p>
                  <p>
                    <strong>Application Type:</strong> TRANSFER OF OWNERSHIP
                  </p>
                  <p>
                    <strong>Chassis No.:</strong>{" "}
                    {challanData?.CHASSIS_NO ||
                      vehicleData?.VEH_CHASIS_NO ||
                      "-"}
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
                    <strong>Vehicle Status:</strong>{" "}
                    {challanData?.VEHICLE_STATUS || "-"}
                  </p>
                  <p>
                    <strong>Payment From:</strong>{" "}
                    {challanData?.TAX_PAID_FROM
                      ? dayjs(challanData.TAX_PAID_FROM).format("DD-MM-YYYY")
                      : "-"}
                  </p>
                  <p>
                    <strong>Total Amount:</strong>{" "}
                    {challanData?.TOTAL_AMOUNT?.toLocaleString() || "-"}
                  </p>
                </div>

                <div className="right">
                  <p>
                    <strong>Challan No:</strong>{" "}
                    {challanData?.VCT_CHALLAN_NO || "-"}
                  </p>
                  <p>
                    <strong>Challan Date:</strong>{" "}
                    {challanData?.CHALLAN_DATE || "-"}
                  </p>
                  <p>
                    <strong>Challan Status:</strong>{" "}
                    {challanData?.CHALLAN_STATUS || "-"}
                  </p>
                  <p>
                    <strong>Maker / Brand:</strong>{" "}
                    {challanData?.MAKER_MAKE ||
                      vehicleData?.["MAKER/ MAKE"] ||
                      "-"}
                  </p>
                  <p>
                    <strong>Filer Status:</strong>{" "}
                    {challanData?.FILER_STATUS || "-"}
                  </p>
                  <p>
                    <strong>Payment Upto:</strong>{" "}
                    {challanData?.TAX_PAID_UPTO || "-"}
                  </p>
                  <p>
                    <strong>Life Time Tax:</strong>{" "}
                    {challanData?.VEH_TAX_PAID_LIFE_TIME || "-"}
                  </p>
                  <p>
                    <strong>Payment Date:</strong>{" "}
                    {challanData?.PAYMENT_DATE || "-"}
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
                    <td>
                      {challanData?.TOTAL_AMOUNT?.toLocaleString() || "-"}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="challan-footer">
                <div>Print on: {dayjs().format("DD/MM/YYYY")}</div>

                <div className="branch-info">
                  National Bank of Pakistan <br />
                  E.T.D Office H9 Branch <br />
                  Islamabad <br />
                  Challan No: {challanData?.VCT_CHALLAN_NO || "-"}
                </div>
              </div>
            </div>
          </div>

          <div
            className="preview-buttons"
            style={{ marginTop: "24px", width: "100%", maxWidth: "1200px" }}
          >
            <button
              className="back-button"
              onClick={() => {
                goBackToTable();
              }}
            >
              Back to Requests
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
      )}
      <AttentionModal
        open={showAttention}
        onClose={() => setShowAttention(false)}
        onContinue={() => {
          setShowAttention(false);
          openNewRequestForm();
        }}
      />
    </div>
  );
};

export default VehicleTransferOwnership;
