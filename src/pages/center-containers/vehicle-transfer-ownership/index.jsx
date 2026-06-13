import React, { useEffect, useState } from "react";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import transferIcon from "../../../assets/icons/transfer_icon.JPG";
// import noteIcon from "../../../assets/icons/note.png";
import exciseLogo from "../../../assets/icons/exciselogo.jpeg";
import { QRCodeCanvas } from "qrcode.react";
import { message } from "antd";
import VehicleCardPreview from "./VehicleCardPreview";
import { LabelDatePicker } from "../../../components/common/label-date-picker/index.js";
import AttentionModal from "../../../components/attention-modal";
import { Row, Col, Input, Form, Switch, Radio, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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
  const [submittedData, setSubmittedData] = useState(null);
  const [showChallan, setShowChallan] = useState(false);
  const [showAttention, setShowAttention] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [refreshTable, setRefreshTable] = useState(0);
  const [noResultMessage, setNoResultMessage] = useState("");

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
  const [hpaParty, setHpaParty] = useState("");
  const [hpaLetterNo, setHpaLetterNo] = useState("");

  const [presentAddress, setpresentAddress] = useState("");
  const [presentAddressCity, setpresentAddressCity] = useState("");
  const [presentAddressDistrict, setpresentAddressDistrict] = useState("");
  const [permanentAddress, setpermanentAddress] = useState("");
  const [permanentAddressCity, setpermanentAddressCity] = useState("");
  const [permanentAddressDistrict, setpermanentAddressDistrict] = useState("");
  const [purchaserUrduName, setPurchaserUrduName] = useState("");
  const [fatherUrduName, setFatherUrduName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [cnic, setCnic] = useState("");
  const [purchaserType, setPurchaserType] = useState("INDIVIDUAL");
  const [purchaserIdNo, setPurchaserIdNo] = useState("");
  const [purchaserIdType, setPurchaserIdType] = useState("CNIC");
  const [idAutoFilled, setIdAutoFilled] = useState(false);
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
  const formatCnic = (value) => {
    const digits = String(value || "")
      .replace(/\D/g, "")
      .slice(0, 13);

    if (digits.length <= 5) return digits;
    if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;

    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
  };

  const getCnicDigits = (value) => {
    return String(value || "").replace(/\D/g, "");
  };
  const formatPhoneForPayload = (value) => {
    const digits = String(value || "").replace(/\D/g, "");

    if (!digits) return "";

    if (digits.startsWith("92")) {
      return `+92-${digits.slice(2)}`;
    }

    if (digits.startsWith("0")) {
      return `+92-${digits.slice(1)}`;
    }

    return `+92-${digits}`;
  };
  const handlePurchaserNext = () => {
    if (!purchaserName?.trim()) {
      message.error("Purchaser Name is required");
      return;
    }

    if (!fatherName?.trim()) {
      message.error("F/H/W/O Name is required");
      return;
    }

    if (!purchaserIdNo?.trim() && !cnic?.trim()) {
      const idLabel =
        purchaserType.toUpperCase() === "COMPANY"
          ? "NTN"
          : !biometricNo?.trim()
            ? purchaserIdType === "PASSPORT"
              ? "Passport No."
              : purchaserIdType === "NTN"
                ? "NTN"
                : "CNIC"
            : "CNIC / Passport No.";
      message.error(`${idLabel} is required`);
      return;
    }
    if (
      purchaserIdType === "CNIC" &&
      getCnicDigits(purchaserIdNo || cnic).length !== 13
    ) {
      message.error("CNIC No. must be 13 digits");
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

    if (otherContactNumber?.trim() && otherContactNumber.length < 13) {
      message.error("Other Mobile Number is incomplete");
      return;
    }

    if (email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
  }, [currentPage, pageSize, searchText, refreshTable]);

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
    setUploadedDocs([]);
    setCnic("");
    setCnic("");
    setPurchaserType("INDIVIDUAL");
    setPurchaserIdNo("");
    setPurchaserIdType("CNIC");
    setIdAutoFilled(false);
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
    setPurchaserUrduName("");
    setFatherUrduName("");
    setVehicleData(null);
    setLoading(false);
    setError(null);
    setChallanData(null);
    setNoResultMessage("");
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
    setRefreshTable((prev) => prev + 1);
  };
  const isNtnValue = (value) => {
    const val = String(value || "").trim();

    if (!val) return false;

    const onlyDigits = val.replace(/\D/g, "");

    if (val.includes("-") && onlyDigits.length <= 9) return true;

    if (
      onlyDigits.length > 0 &&
      onlyDigits.length !== 13 &&
      onlyDigits.length <= 9
    ) {
      return true;
    }

    return false;
  };

  const getOwnerIdLabel = (value, ownerType) => {
    const type = String(ownerType || "").toUpperCase();

    if (
      type.includes("ORG") ||
      type.includes("ORGANIZATION") ||
      type.includes("COMPANY")
    ) {
      return "NTN";
    }

    return isNtnValue(value) ? "NTN" : "CNIC / Passport No.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setVehicleData(null);
    setShowData(false);
    setNoResultMessage("");
    setShowPurchaserForm(false);
    setLoading(true);
    setPurchaserIdNo("");
    setCnic("");
    setPurchaserName("");
    setFatherName("");
    setContactNumber("");
    setOtherContactNumber("");
    setEmail("");
    setEmailError("");
    setTempAddress("");
    setPermAddress("");
    setTempDistrict("");
    setPermDistrict("");
    setHpaParty("");
    setHpaLetterNo("");
    
    setUploadedDocs([]);
    form.resetFields();
    setSubmittedData({
      regNo,
    });

    try {
      const formattedDate = regDate ? dayjs(regDate).format("DD/MM/YYYY") : "";

      const endpoint = API_ENDPOINTS.GET_BIO_DET;

      const requestBody = {
        TRANSACTION_NO: biometricNo?.trim() || "",
        REG_NO: regNo.toUpperCase(),
        REG_DATE: formattedDate,
      };

      const response = await authFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(requestBody),
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
        setError(result.ErrorMessage || "An error occurred. Please try again.");
        setShowData(false);
        setShowPurchaserForm(false);
        setVehicleData(null);
        return;
      }

      if (String(result?.result || "").toUpperCase() === "NO RESULT") {
        setNoResultMessage(
          "Please provide correct parameters to start application or contact ETO office.",
        );

        setShowData(true);
        setShowPurchaserForm(false);
        setShowPreview(false);
        setVehicleData(null);

        return;
      }

      const vehicle = result.vehicle?.[0] || {};
      const bio = result.bio?.[0] || {};
      setBiometricNo(bio.TRANSACTION_NO || "");
      setPurchaserUrduName(bio.PURCHASERNAME || "");
      setFatherUrduName(bio.PURCHASERNAME || "");
      setBiometricNo(bio.TRANSACTION_NO || "");

      setNoResultMessage("");
      console.log("VEHICLE API DATA:", vehicle);
      console.log("BIO API DATA:", bio);
      const getValue = (...values) => {
        return (
          values.find(
            (v) => v !== undefined && v !== null && String(v).trim() !== "",
          ) || ""
        );
      };

      const rawPurchaserType = getValue(
        bio.PURCHASERTYPE,
        bio.PURCHASER_TYPE,
        bio.PURCHASER_CATEGORY,
        bio.PURCHASER_STATUS,
        bio.OWNER_TYPE,
        bio.APPLICANT_TYPE,
        bio.TYPE,
      )
        .toString()
        .toUpperCase();

      const organizationNtn = getValue(
        bio.PURCHASER_NTN,
        bio.PURCHASERNTN,
        bio.NTN,
        bio.NTN_NO,
        bio.ORGANIZATION_NTN,
        bio.ORGANIZATIONNTN,
      );

      const individualId = getValue(
        bio.PURCHASERID,
        bio.PURCHASER_ID,
        bio.PURCHASER_CNIC,
        bio.PURCHASERCNIC,
        bio.CNIC,
        bio.PASSPORT_NO,
        bio.PASSPORTNO,
      );

      const isOrganization =
        rawPurchaserType.includes("COMPANY") ||
        rawPurchaserType.includes("ORG") ||
        rawPurchaserType.includes("ORGANIZATION");

      const finalPurchaserType = isOrganization ? "COMPANY" : "INDIVIDUAL";

      const finalPurchaserIdNo = isOrganization
        ? organizationNtn
        : individualId;

      setPurchaserType(finalPurchaserType);
      setPurchaserIdNo(finalPurchaserIdNo);
      setCnic(finalPurchaserIdNo);
      setIdAutoFilled(!!finalPurchaserIdNo?.trim());

      console.log("PURCHASER TYPE CHECK:", {
        rawPurchaserType,
        organizationNtn,
        individualId,
        finalPurchaserType,
        finalPurchaserIdNo,
      });

      console.log("FIRST OWNER CHECK:", {
        FIRST_OWNER_NAME: vehicle.FIRST_OWNER_NAME,
        FIRST_OWNER_NAME_SPACE: vehicle["FIRST OWNER NAME"],
        OWNER_NAME: vehicle.OWNER_NAME,
        fullVehicle: vehicle,
      });

      setVehicleData(vehicle);

      setVehicleData(vehicle);
      // Current Owner
      const currentOwner =
        vehicle.CURRENT_OWNER_NAME ||
        vehicle.OWNER_NAME ||
        vehicle["OWNER NAME"] ||
        "";

      const currentOwnerFather =
        vehicle.CURRENT_OWNER_FNAME ||
        vehicle.OWNER_FNAME ||
        vehicle.FATHER_NAME ||
        vehicle.FNAME ||
        vehicle["FATHER NAME"] ||
        vehicle["F/H/W/O"] ||
        "";

      const currentOwnerCnic =
        vehicle.CURRENT_OWNER_CNIC ||
        vehicle.CURRENT_OWNER_NTN ||
        vehicle.CURRENT_OWNER_CNIC_NO ||
        vehicle.CURRENT_OWNER_NIC ||
        vehicle.CURRENT_OWNER_NIC_NO ||
        vehicle.OWNER_CNIC ||
        vehicle.OWNER_NTN ||
        vehicle.OWNER_CNIC_NO ||
        vehicle.OWNER_NIC ||
        vehicle.CNIC ||
        vehicle.NIC ||
        vehicle.NTN ||
        vehicle["CURRENT_OWNER_CNIC"] ||
        vehicle["CURRENT OWNER CNIC"] ||
        vehicle["CURRENT OWNER NTN"] ||
        vehicle["CURRENT OWNER CNIC NO"] ||
        vehicle["OWNER CNIC"] ||
        vehicle["OWNER NTN"] ||
        vehicle["CNIC NO"] ||
        vehicle["NTN"] ||
        bio.CNIC ||
        bio.NTN ||
        bio.OWNER_CNIC ||
        bio.OWNER_NTN ||
        bio.CURRENT_OWNER_CNIC ||
        bio.CURRENT_OWNER_NTN ||
        "";

      // First Owner
      const firstOwner =
        vehicle.FIRST_OWNER_NAME || vehicle["FIRST OWNER NAME"] || "";

      const firstOwnerFather =
        vehicle.FIRST_OWNER_FNAME ||
        vehicle["FIRST OWNER FNAME"] ||
        vehicle["FIRST OWNER F/H/W/O"] ||
        "";

      const firstOwnerCnicValue =
        vehicle.FIRST_OWNER_CNIC ||
        vehicle.FIRST_OWNER_NTN ||
        vehicle.FIRST_OWNER_CNIC_NO ||
        vehicle.FIRST_OWNER_NIC ||
        vehicle.FIRST_OWNER_NIC_NO ||
        vehicle["FIRST OWNER CNIC"] ||
        vehicle["FIRST OWNER NTN"] ||
        vehicle["FIRST OWNER CNIC NO"] ||
        vehicle["FIRST OWNER NIC"] ||
        vehicle["FIRST OWNER NIC NO"] ||
        "";

      setOwnerName(currentOwner);

      setCurrentOwnerName(currentOwner);
      setOwnerFatherName(currentOwnerFather);
      setOwnerCnic(currentOwnerCnic);

      setOwnerAddress("");

      // setCnic(bio.PURCHASERID || "");

      setFirstOwnerName(firstOwner);
      setFirstOwnerFatherName(firstOwnerFather);
      setFirstOwnerCnic(firstOwnerCnicValue);

      setShowData(true);
      setShowPurchaserForm(true);
    } catch (err) {
      console.error("Error fetching bio details:", err);
      setError(err.message || "Unable to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isNtnField =
    purchaserType.toUpperCase() === "COMPANY" ||
    ["ORG", "ORGANIZATION", "COMPANY"].some((t) =>
      String(vehicleData?.CURRENT_OWNER_TYPE || "")
        .toUpperCase()
        .includes(t),
    );
  const displayChallanNo =
    challanData?.VCT_CHALLAN_NO ||
    challanData?.CHALLAN_NO ||
    challanData?.CHALLANNO ||
    "-";

  const displayChallanStatus =
    challanData?.CHALLAN_STATUS || challanData?.STATUS || "-";

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
        minHeight: "100%",
        boxSizing: "border-box",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1.33rem",
      }}
    >
      <span className="page-title">Vehicle Transfer Of Ownership</span>

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

          {!apiLoading && !apiError && apiData.length === 0 ? (
            <div className="request-empty-state">
              <div className="request-empty-icon">🗂️</div>
              <p>No Transfer of Ownership Applications Found.</p>
              <span>Request a New Transfer to view details</span>
            </div>
          ) : (
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
                  ) : (
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
                  )}
                </tbody>
              </table>
            </div>
          )}
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
                    placeholder="Biometric number will be fetched automatically"
                    value={biometricNo}
                    readOnly
                    className="w-full"
                    style={{
                      backgroundColor: "#f5f5f5",
                      cursor: "not-allowed",
                    }}
                  />
                </Col>

                <Col flex="150px">
                  <button
                    type="submit"
                    className="submit-frame w-full"
                    disabled={loading || !regNo || !regDate}
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
                  {noResultMessage ? (
                    <div
                      style={{
                        width: "174%",
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center",
                        padding: "14px",
                      }}
                    >
                      {noResultMessage}
                    </div>
                  ) : (
                    <>
                      <div className="dummy-data-item">
                        <span className="label">Registration No.</span>
                        <div className="value">
                          {submittedData?.regNo || "N/A"}
                        </div>
                      </div>

                      <div className="dummy-data-item">
                        <span className="label">Registration Date</span>
                        <div className="value">
                          {regDate
                            ? dayjs(regDate).format("DD-MM-YYYY")
                            : "N/A"}
                        </div>
                      </div>

                      <div className="dummy-data-item">
                        <span className="label">Chasis No.</span>
                        <div className="value">
                          {vehicleData?.VEH_CHASIS_NO || "N/A"}
                        </div>
                      </div>

                      <div className="dummy-data-item">
                        <span className="label">
                          First Owner{" "}
                          {getOwnerIdLabel(
                            firstOwnerCnic,
                            vehicleData?.FIRST_OWNER_TYPE,
                          )}
                        </span>
                        <div className="value">{firstOwnerCnic || "N/A"}</div>
                      </div>

                      <div className="dummy-data-item">
                        <span className="label">First Owner Name</span>
                        <div className="value">{firstOwnerName || "N/A"}</div>
                      </div>

                      <div className="dummy-data-item">
                        <span className="label">First Owner F/H/W/O</span>
                        <div className="value">
                          {firstOwnerFatherName || "N/A"}
                        </div>
                      </div>

                      <div className="dummy-data-item">
                        <span className="label">
                          Current Owner{" "}
                          {getOwnerIdLabel(
                            ownerCnic,
                            vehicleData?.CURRENT_OWNER_TYPE,
                          )}
                        </span>
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
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {showPurchaserForm && !showPreview && (
            <div className="Frame-1000009526">
              <div style={{ padding: "0 24px" }}>
                <div className="mb-1">
                  <span className="block font-bold text-lg">
                    Purchaser Information{" "}
                    {purchaserType ? `(${purchaserType.toUpperCase()})` : ""}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="block text-gray-600 text-sm">
                    Please provide the details of the purchaser to whom the
                    ownership is being transferred
                  </span>
                </div>

                <hr
                  style={{
                    marginTop: "25px",
                    marginBottom: "18px",
                    border: "none",
                    borderTop: "1px solid #e3e3e3",
                    width: "100%",
                    margin: "0 auto",
                  }}
                />

                {!biometricNo?.trim() && (
                  <div style={{ marginTop: "14px", marginBottom: "20px" }}>
                    <span
                      className="Textfield-Label"
                      style={{ display: "block", marginBottom: "6px" }}
                    >
                      Select Purchaser Type{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>
                    <Radio.Group
                      value={purchaserIdType}
                      onChange={(e) => {
                        setPurchaserIdType(e.target.value);
                        setPurchaserIdNo("");
                        setCnic("");
                      }}
                    >
                      <Radio value="CNIC">Individual (Pakistani)</Radio>
                      <Radio value="PASSPORT">Individual (Foreigner)</Radio>
                      <Radio value="NTN">Bank/ Company</Radio>
                    </Radio.Group>
                  </div>
                )}
              </div>

              <div style={{ padding: "0 24px" }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <span
                      className="Textfield-Label"
                      style={{ color: "black" }}
                    >
                      {!biometricNo?.trim()
                        ? purchaserIdType === "PASSPORT"
                          ? "Passport No."
                          : purchaserIdType === "NTN"
                            ? "NTN No."
                            : "CNIC No."
                        : isNtnField
                          ? "NTN No."
                          : "CNIC / Passport No."}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </span>

                    <Input
                      value={purchaserIdNo || cnic}
                      readOnly={!!biometricNo?.trim() && !isNtnField}
                      maxLength={
                        !biometricNo?.trim() && purchaserIdType === "CNIC"
                          ? 15
                          : undefined
                      }
                      onChange={
                        !biometricNo?.trim() || isNtnField
                          ? (e) => {
                              let value = e.target.value;

                              const shouldFormatAsCnic =
                                !biometricNo?.trim() &&
                                purchaserIdType === "CNIC";

                              if (shouldFormatAsCnic) {
                                value = formatCnic(value);
                              } else {
                                value = value.toUpperCase();
                              }

                              setPurchaserIdNo(value);
                              setCnic(value);
                            }
                          : undefined
                      }
                      placeholder={
                        !biometricNo?.trim()
                          ? `Enter ${
                              purchaserIdType === "PASSPORT"
                                ? "Passport No."
                                : purchaserIdType === "NTN"
                                  ? "NTN No."
                                  : "CNIC No."
                            }`
                          : isNtnField
                            ? "Enter NTN No."
                            : "Auto-filled CNIC / Passport No."
                      }
                      className="uniform-input1"
                      style={{
                        color: "black",
                        backgroundColor:
                          !!biometricNo?.trim() && !isNtnField
                            ? "#f5f5f5"
                            : "#fff",
                        cursor:
                          !!biometricNo?.trim() && !isNtnField
                            ? "not-allowed"
                            : "text",
                      }}
                    />
                  </Col>

                  <Col xs={24} sm={12}>
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

                  <Col xs={24}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={12}>
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

                      <Col xs={24} sm={12}>
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
                    </Row>
                  </Col>

                  <Col xs={24} sm={12}>
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

                  <Col xs={24} sm={12}>
                    <span className="Textfield-Label">
                      Other Mobile Number{" "}
                    </span>
                    <UppercaseInput
                      value={otherContactNumber}
                      onChange={setOtherContactNumber}
                      isPhone
                      placeholder="Enter Other Contact Number"
                    />
                  </Col>

                  <Col xs={24} sm={12} className="relative">
                    <span className="Textfield-Label">
                      Temporary Address <span style={{ color: "red" }}>*</span>
                    </span>

                    <UppercaseInput
                      textarea
                      value={tempAddress}
                      onChange={(val) => setTempAddress(val)}
                      showCount
                      maxLength={40}
                      rows={4}
                      placeholder="Enter Address"
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
                      maxLength={40}
                      rows={4}
                      placeholder="Enter Address"
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
                        placeholder="Enter Bank / Company Name"
                        value={hpaParty}
                        className="w-full h-12 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setHpaParty(e.target.value.toUpperCase())
                        }
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
                        placeholder="Enter Letter No"
                        value={hpaLetterNo}
                        className="w-full h-12 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setHpaLetterNo(e.target.value.toUpperCase())
                        }
                      />
                    </div>
                  </Col>

                  {/* Upload CNIC PDF */}
                  <Col xs={24}>
                    <div className="upload-doc-section-card">
                      <div className="upload-doc-section-header">
                        <div>
                          <div className="mb-1">
                            <span className="block font-bold text-lg">
                              Upload Documents
                            </span>
                          </div>
                          <div>
                            <span className="block text-gray-600 text-sm">
                              Please upload the required documents in PDF or
                              JPEG format.
                            </span>
                          </div>
                        </div>

                        <label className="add-main-doc-btn">
                          + Add File
                          <input
                            type="file"
                            accept="application/pdf,image/jpeg,image/jpg"
                            hidden
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (!file) return;

                              const isDuplicate = uploadedDocs.some(
                                (item) =>
                                  item.file &&
                                  item.file.name === file.name &&
                                  item.file.size === file.size,
                              );

                              if (isDuplicate) {
                                message.error("This file is already uploaded");
                                e.target.value = "";
                                return;
                              }

                              const allowedTypes = [
                                "application/pdf",
                                "image/jpeg",
                              ];

                              if (!allowedTypes.includes(file.type)) {
                                message.error(
                                  "Only PDF and JPEG files are allowed",
                                );
                                e.target.value = "";
                                return;
                              }

                              setUploadedDocs((prev) => [
                                ...prev,
                                { file, type: "" },
                              ]);
                              e.target.value = "";
                            }}
                          />
                        </label>
                      </div>

                      {uploadedDocs.length > 0 && (
                        <div className="upload-doc-grid">
                          <div className="upload-doc-header">
                            <div>Serial #</div>
                            <div>File</div>
                            <div>Upload Type</div>
                            <div>Action</div>
                          </div>

                          {uploadedDocs.map((doc, index) => (
                            <div className="upload-doc-row" key={index}>
                              <div>{index + 1}</div>

                              <div className="uploaded-file-name">
                                {doc.file?.name || "No file selected"}
                              </div>

                              <div>
                                <Select
                                  value={doc.type || undefined}
                                  placeholder="Select type"
                                  style={{ width: "100%" }}
                                  onChange={(val) => {
                                    const updated = [...uploadedDocs];
                                    updated[index].type = val;
                                    setUploadedDocs(updated);
                                  }}
                                  options={[
                                    {
                                      value: "CNIC Front",
                                      label: "CNIC Front",
                                    },
                                    { value: "CNIC Back", label: "CNIC Back" },
                                    {
                                      value: "Transfer Letter",
                                      label: "Transfer Letter",
                                    },
                                    { value: "Affidavit", label: "Affidavit" },
                                    {
                                      value: "NOC Issued from Bank",
                                      label: "NOC Issued from Bank",
                                    },
                                    {
                                      value:
                                        "NOC Issued from Seller Organization",
                                      label:
                                        "NOC Issued from Seller Organization",
                                    },
                                  ]}
                                />
                              </div>

                              <div>
                                <button
                                  type="button"
                                  className="upload-remove-btn"
                                  onClick={() => {
                                    const updated = uploadedDocs.filter(
                                      (_, i) => i !== index,
                                    );
                                    setUploadedDocs(updated);
                                  }}
                                >
                                  <DeleteOutlined />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>

                <div
                  style={{
                    marginTop: "45px",
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
                  ownerCnic={purchaserIdNo || cnic}
                  hpaParty={hpaParty}
                  hpaLetterNo={hpaLetterNo}
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

                              PURCHASER_TYPE:
                                purchaserIdType === "NTN"
                                  ? "ORGANIZATION"
                                  : "INDIVIDUAL",

                              PURCHASER_ID: (
                                purchaserIdNo ||
                                cnic ||
                                ""
                              ).replace(/\D/g, ""),

                              PURCHASER_CNIC:
                                purchaserIdType === "CNIC"
                                  ? (purchaserIdNo || cnic || "").replace(
                                      /\D/g,
                                      "",
                                    )
                                  : "",

                              PURCHASER_PASSPORT:
                                purchaserIdType === "PASSPORT"
                                  ? purchaserIdNo || cnic || ""
                                  : "",

                              PURCHASER_NTN:
                                purchaserIdType === "NTN"
                                  ? purchaserIdNo || cnic || ""
                                  : "",
                              PURCHASER_NAME: purchaserName,
                              PURCHASER_FATHER_NAME: fatherName,
                              PURCHASER_CONTACT_NUMBER:
                                formatPhoneForPayload(contactNumber),
                              PURCHASER_CONTACT_NUMBER2:
                                formatPhoneForPayload(otherContactNumber),
                              PURCHASER_EMAIL: email,
                              PURCHASER_TEMP_ADDRESS: tempAddress,
                              PURCHASER_TEMP_CITY: presentAddressCity,
                              PURCHASER_TEMP_DISTRICT: presentAddressDistrict,
                              PURCHASER_PRMNT_ADDRESS: permAddress,
                              PURCHASER_PRMNT_CITY: permanentAddressCity,
                              PURCHASER_PRMNT_DISTRICT:
                                permanentAddressDistrict,
                              HPA_PARTY: hpaParty,
                              HPA_LETTER_NO: hpaLetterNo,
                            }),
                          },
                        );

                        if (!response) return;

                        if (!response.ok) {
                          throw new Error(`Error: ${response.statusText}`);
                        }

                        const text = await response.text();

                        let result = {};

                        try {
                          result = JSON.parse(text);
                        } catch {
                          const inner = text.trim().replace(/^\{|\}$/g, "");

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
                          setChallanError(
                            result.ErrorMessage ||
                              "Failed to process. Please try again.",
                          );
                          return;
                        }
                        console.log("PROCESS_BIO RESULT:", result);

                        if (result.ERROR) {
                          setChallanError(result.ERROR);
                          return;
                        }

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
          {/* ================= OLD CHALLAN ================= */}
          <div id="challan" className="nbp-challan">
            <div className="challan-inner">
              <div className="challan-header">
                <h2>Excise & Taxation Department ICT, Islamabad</h2>
                <div className="challan-title-2">
                  <h3>Dues Payment Receipt</h3>
                </div>
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
                    <strong>Category:</strong>{" "}
                    {challanData?.CATEGORY || vehicleData?.CATEGORY || "-"}
                  </p>

                  <p>
                    <strong>Body Type:</strong>{" "}
                    {challanData?.BODYTYPE || vehicleData?.BODYTYPE || "-"}
                  </p>

                  <p>
                    <strong>Owner Name:</strong> {ownerName || "-"}
                  </p>

                  <p>
                    <strong>Father / Husband Name:</strong>{" "}
                    {ownerFatherName || "-"}
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
                    <strong>Challan No:</strong> {displayChallanNo}
                  </p>

                  <p>
                    <strong>Challan Date:</strong>{" "}
                    {challanData?.CHALLAN_DATE || "-"}
                  </p>

                  <p>
                    <strong>Challan Status:</strong>
                    <span
                      style={{
                        color:
                          displayChallanStatus?.toLowerCase() === "paid"
                            ? "green"
                            : displayChallanStatus?.toLowerCase() === "unpaid"
                              ? "red"
                              : "inherit",
                        fontWeight: "bold",
                      }}
                    >
                      {displayChallanStatus}
                    </span>
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
                Kindly Make Payment of Following Dues at Bank Booth in Excise &
                Taxation Office or Go To City Islamabad App for Digital Payment.
              </div>

              <table className="challan-table">
                <tbody>
                  {challanData?.TAX_FINE_DETAIL?.map((item) => (
                    <tr key={item.TAT_ID}>
                      <td>{item.TAT_NAME}</td>
                      <td>{item.VTH_AMOUNT_PAID?.toLocaleString()}</td>
                    </tr>
                  ))}

                  <tr className="total-row">
                    <td>Total</td>
                    <td>{(challanData?.TOTAL_AMOUNT || 0).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="challan-footer">
                <div>Print on: {dayjs().format("DD/MM/YYYY")}</div>

                <div className="branch-info">
                  {/* National Bank of Pakistan <br />
                  E.T.D Office H9 Branch <br />
                  Islamabad <br /> */}
                  Challan No: {displayChallanNo}
                </div>
              </div>
            </div>
          </div>

          {/* ================= TRANSFER LETTER ================= */}

          <div id="transfer-letter" className="transfer-letter-doc">
            <div className="transfer-letter-header-row">
              <div className="transfer-letter-logo-box">
                <img src={exciseLogo} alt="Excise Logo" />
              </div>

              <div className="transfer-letter-title">
                <h2>Excise & Taxation Department ICT, Islamabad</h2>
                <h3>TRANSFER OF OWNERSHIP</h3>
              </div>

              <div className="transfer-letter-qr-box">
                <QRCodeCanvas
                  value={`Challan No: ${displayChallanNo}`}
                  size={90}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>
            <div className="transfer-letter-vehicle-grid">
              <p>
                <strong>Registration No:</strong>
                <span>{challanData?.REGISTRATION_NO || regNo || "-"}</span>
              </p>

              <p>
                <strong>Challan No:</strong>
                <span>{displayChallanNo}</span>
              </p>

              <p>
                <strong>Registration Date:</strong>
                <span>
                  {regDate ? dayjs(regDate).format("DD-MM-YYYY") : "-"}
                </span>
              </p>

              <p>
                <strong>Challan Date:</strong>
                <span>{challanData?.CHALLAN_DATE || "-"}</span>
              </p>

              <p>
                <strong>Application Type:</strong>
                <span>TRANSFER OF OWNERSHIP</span>
              </p>

              <p>
                <strong>Chassis No:</strong>
                <span>
                  {challanData?.CHASSIS_NO || vehicleData?.VEH_CHASIS_NO || "-"}
                </span>
              </p>

              <p>
                <strong>Maker / Brand:</strong>
                <span>
                  {challanData?.MAKER_MAKE ||
                    vehicleData?.["MAKER/ MAKE"] ||
                    "-"}
                </span>
              </p>

              <p>
                <strong>Category:</strong>
                <span>
                  {challanData?.CATEGORY || vehicleData?.CATEGORY || "PRIVATE"}
                </span>
              </p>

              <p>
                <strong>Color:</strong>
                <span>{vehicleData?.COLOR || "-"}</span>
              </p>

              <p>
                <strong>Body Type:</strong>
                <span>
                  {challanData?.BODYTYPE ||
                    vehicleData?.BODYTYPE ||
                    "MOTOR CAR"}
                </span>
              </p>

              <p>
                <strong>Filer Status:</strong>
                <span>{challanData?.FILER_STATUS || "-"}</span>
              </p>

              <p>
                <strong>Vehicle Status:</strong>
                <span>{challanData?.VEHICLE_STATUS || "TRANSFERRED"}</span>
              </p>

              <p>
                <strong>Life Time Tax:</strong>
                <span>{challanData?.VEH_TAX_PAID_LIFE_TIME || "-"}</span>
              </p>

              <p>
                <strong>Payment From:</strong>
                <span>
                  {challanData?.TAX_PAID_FROM
                    ? dayjs(challanData.TAX_PAID_FROM).format("DD-MM-YYYY")
                    : "-"}
                </span>
              </p>

              <p>
                <strong>Payment Date:</strong>
                <span>{challanData?.PAYMENT_DATE || "-"}</span>
              </p>
            </div>

            <div className="transfer-letter-separator"></div>

            {/* SELLER + PURCHASER ONLY */}

            <div className="transfer-letter-two-boxes">
              <div className="transfer-letter-box">
                <div className="transfer-letter-box-title">SELLER DETAILS</div>

                <div className="transfer-letter-box-body">
                  <p>
                    <strong>Owner Name:</strong> {ownerName || "-"}
                  </p>

                  <p>
                    <strong>Father / Husband Name:</strong>{" "}
                    {ownerFatherName || "-"}
                  </p>

                  <p>
                    <strong>CNIC / NTN:</strong> {ownerCnic || "-"}
                  </p>

                  <p>
                    <strong>Address:</strong> {ownerAddress || "-"}
                  </p>
                </div>
              </div>

              <div className="transfer-letter-box">
                <div className="transfer-letter-box-title">
                  PURCHASER DETAILS
                </div>

                <div className="transfer-letter-box-body">
                  <p>
                    <strong>Purchaser Name:</strong> {purchaserName || "-"}
                  </p>

                  <p>
                    <strong>Father / Husband Name:</strong> {fatherName || "-"}
                  </p>

                  <p>
                    <strong>CNIC / NTN:</strong> {purchaserIdNo || cnic || "-"}
                  </p>

                  <p>
                    <strong>Contact No:</strong> {contactNumber || "-"}
                  </p>

                  <p>
                    <strong>Other Contact No:</strong>{" "}
                    {otherContactNumber || "-"}
                  </p>

                  <p>
                    <strong>Email:</strong> {email || "-"}
                  </p>

                  <p>
                    <strong>Present Address:</strong> {tempAddress || "-"}
                  </p>

                  <p>
                    <strong>Permanent Address:</strong> {permAddress || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="transfer-letter-separator"></div>

            <div className="transfer-letter-footer-row">
              <span>
                <strong>Print Date:</strong>{" "}
                {dayjs().format("DD/MM/YYYY HH:mm:ss")}
              </span>
            </div>

            {/*  */}
          </div>

          {/* ================= BUTTONS ================= */}

          <div
            className="preview-buttons"
            style={{
              marginTop: "24px",
              width: "100%",
              maxWidth: "1200px",
            }}
          >
            <button className="back-button" onClick={goBackToTable}>
              Back to Requests
            </button>

            {/* DOWNLOAD CHALLAN */}

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

            {/* DOWNLOAD TRANSFER LETTER */}

            <button
              className="confirm-button"
              onClick={() => {
                const transferElement =
                  document.getElementById("transfer-letter");

                import("html2canvas").then((html2canvas) => {
                  html2canvas
                    .default(transferElement, {
                      scale: 2,
                      useCORS: true,
                      backgroundColor: "#ffffff",
                    })
                    .then((canvas) => {
                      import("jspdf").then((jsPDF) => {
                        const pdf = new jsPDF.jsPDF("p", "mm", "a4");

                        const imgData = canvas.toDataURL("image/png");

                        const imgProps = pdf.getImageProperties(imgData);

                        const pdfWidth = pdf.internal.pageSize.getWidth();

                        const pdfHeight =
                          (imgProps.height * pdfWidth) / imgProps.width;

                        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

                        pdf.save("transfer-letter.pdf");
                      });
                    });
                });
              }}
            >
              Download Transfer Letter
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
