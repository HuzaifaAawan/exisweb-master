/* eslint-disable no-unused-vars */
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import transferIcon from "../../../assets/icons/transfer_icon.JPG";
import noteIcon from "../../../assets/icons/note.png";
import "./media_transfer.scss";

import { Select, Radio, Row, Col, message } from "antd";
import { useEffect, useState } from "react";

import { LabelDatePicker } from "../../../components/common/label-date-picker/index.js";
import UppercaseInput from "../../../components/CapitalizedInput.jsx";
import { useAuthFetch } from "../../../libs/hooks/useAuthFetch";
import { API_ENDPOINTS } from "../../../constants";

const PROCESS_TYPE_OPTIONS = [
  { value: "new_vehicle_registration", label: "New Vehicle Registration" },
  { value: "transfer_of_ownership", label: "Transfer of Ownership" },
  { value: "other_type_of_applications", label: "Other type of applications" },
];

const VehicleInspection = () => {
  const authFetch = useAuthFetch();

  const [showData, setShowData] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [regDate, setRegDate] = useState(null);
  const [engineNo, setEngineNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [processType, setProcessType] = useState("new_vehicle_registration");
  const [inspectionNumber, setInspectionNumber] = useState("");
  const [noResultMessage, setNoResultMessage] = useState("");
  const [city, setCity] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchInspectionRequests = async () => {
      setApiLoading(true);
      setApiError(null);

      try {
        const response = await authFetch(API_ENDPOINTS.GET_PHYSICAL_INSP_APPS, {
          method: "POST",
          body: JSON.stringify({
            RECORDS_PER_PAGE: pageSize.toString(),
            PAGE_NO: currentPage.toString(),
          }),
        });

        if (!response) return;

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const result = await response.json();

        setTotalRecords(parseInt(result.TOTAL_RECORDS) || 0);
        setApiData(result.DATA || []);
      } catch (err) {
        console.error("Inspection table API error:", err);
        setApiError(
          "API certificate issue. Please open API URL in browser and proceed/allow certificate, then refresh page.",
        );
      } finally {
        setApiLoading(false);
      }
    };

    if (!showRequestForm) {
      fetchInspectionRequests();
    }
  }, [currentPage, pageSize, showRequestForm]);

  const resetForm = () => {
    setShowData(false);
    setRegNo("");
    setRegDate(null);
    setEngineNo("");
    setChassisNo("");
    setProcessType("new_vehicle_registration");
    setInspectionNumber("");
    setNoResultMessage("");
    setCity("");
  };

  const openNewInspectionRequest = () => {
    resetForm();
    setShowRequestForm(true);
  };

  const goBackToTable = () => {
    resetForm();
    setShowRequestForm(false);
    setCurrentPage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!processType) {
      message.error("Please select process type");
      return;
    }

    if (processType === "new_vehicle_registration") {
      if (!engineNo?.trim()) {
        message.error("Engine No. is required");
        return;
      }

      if (!chassisNo?.trim()) {
        message.error("Chassis No. is required");
        return;
      }
    } else {
      if (!regNo?.trim()) {
        message.error("Registration No. is required");
        return;
      }

      if (!regDate) {
        message.error("Registration Date is required");
        return;
      }
    }

    if (!city) {
      message.error("Please select city");
      return;
    }

    setNoResultMessage("");
    setInspectionNumber("");
    setShowData(false);
    setSubmitLoading(true);

    const isNewReg = processType === "new_vehicle_registration";

    try {
      const response = await authFetch(API_ENDPOINTS.GET_PHYSICAL_INSP_NO, {
        method: "POST",
        body: JSON.stringify({
          ID: "",
          APPTYPE: isNewReg ? 1 : 2,
          CHASSIS_NO: isNewReg ? chassisNo?.trim().toUpperCase() : "",
          ENGINE_NO: isNewReg ? engineNo?.trim().toUpperCase() : "",
          REG_NO: isNewReg ? "" : regNo?.trim().toUpperCase(),
          REG_DATE: isNewReg
            ? ""
            : regDate
              ? regDate.format?.("DD/MM/YYYY")
              : "",
          CITY: city?.toUpperCase(),
        }),
      });

      if (!response) return;

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const text = await response.text();

      let resultData = {};

      try {
        resultData = JSON.parse(text);
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

            resultData[key] = val;
          }
        });
      }

      if (
        String(resultData?.result || "")
          .toUpperCase()
          .includes("NO RESULT") ||
        resultData?.ErrorCode ||
        resultData?.ERRORCODE ||
        resultData?.ErrorMessage ||
        resultData?.ERRORMESSAGE ||
        !resultData?.INSPECTION_ID
      ) {
        setNoResultMessage(
          "Please provide correct parameters to start application or contact ETO office.",
        );
        setInspectionNumber("");
        setShowData(true);
        return;
      }

      setNoResultMessage("");
      setInspectionNumber(resultData.INSPECTION_ID);
      setShowData(true);
    } catch (err) {
      setNoResultMessage(
        "Please provide correct parameters to start application or contact ETO office.",
      );
      setInspectionNumber("");
      setShowData(true);
    } finally {
      setSubmitLoading(false);
    }
  };

  const totalPages = Math.ceil(totalRecords / pageSize);

  const getPageNumbers = (current, total) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages = [1];

    if (current > 3) pages.push("...");

    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(total - 1, current + 1);
      i++
    ) {
      pages.push(i);
    }

    if (current < total - 2) pages.push("...");

    pages.push(total);

    return pages;
  };

  return (
    <div
      className="transfer-ownership"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1.33rem",
      }}
    >
      <span className="page-title">Physical Inspection Request</span>

      {!showRequestForm && (
        <div className="request-table-card">
          <div className="request-table-header">
            <div>
              <h3
                className="request-table-title"
                style={{ fontSize: "18px", textTransform: "capitalize" }}
              >
                Physical Inspection Requests
              </h3>
            </div>

            <div className="request-table-actions">
              <button
                type="button"
                className="request-new-btn"
                onClick={openNewInspectionRequest}
              >
                Request New Inspection
              </button>
            </div>
          </div>

          <div className="request-table-wrapper">
            <table className="request-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Process Type</th>
                  <th>Chassis No.</th>
                  <th>Engine No.</th>
                  <th>Reg No.</th>
                  <th>Inspection Status</th>
                </tr>
              </thead>

              <tbody>
                {apiLoading ? (
                  <tr>
                    <td
                      colSpan="7"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      Loading...
                    </td>
                  </tr>
                ) : apiError ? (
                  <tr>
                    <td
                      colSpan="7"
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
                    <tr key={item.ID || index}>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{item.ID || "-"}</td>
                      <td>
                        {item.APP_TYPE === 1
                          ? "New Vehicle Registration"
                          : item.APP_TYPE === 2
                            ? "Transfer of Ownership"
                            : "-"}
                      </td>
                      <td>{item.CHASSIS_NO || "-"}</td>
                      <td>{item.ENGINE_NO || "-"}</td>
                      <td>{item.REG_NO || "-"}</td>
                      <td>
                        <span className="status-badge">
                          {item.INSPECTION_STATUS || "-"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      <div className="request-empty-state">
                        <div className="request-empty-icon">🗂️</div>
                        <p>No Physical Inspection Requests Found.</p>
                        <span>Request a New Inspection to view details</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="vi-table-footer">
            <div className="vi-page-info">
              {totalRecords} Records Found | {pageSize} Per Page
            </div>

            <div className="vi-pagination">
              <button
                type="button"
                className="vi-nav-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                ‹ Prev
              </button>

              {getPageNumbers(currentPage, totalPages || 1).map((page, i) =>
                page === "..." ? (
                  <span key={`dots-${i}`} className="vi-page-dots">
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    className={`vi-page-btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                className="vi-nav-btn"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}

      {showRequestForm && (
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
              <Row gutter={[20, 16]} className="items-end w-full">
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="field-box">
                    <label className="Textfield-Label">
                      Select Process Type
                    </label>

                    <Radio.Group
                      value={processType}
                      onChange={(e) => {
                        setProcessType(e.target.value);
                        setShowData(false);
                        setNoResultMessage("");
                        setInspectionNumber("");
                      }}
                      className="process-type-radio-group"
                    >
                      {PROCESS_TYPE_OPTIONS.map((opt) => (
                        <Radio key={opt.value} value={opt.value}>
                          {opt.label}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </Col>

                <Col xs={24} sm={24} md={12} lg={7}>
                  {processType === "new_vehicle_registration" ? (
                    <>
                      <label className="Textfield-Label">Chassis No.</label>
                      <UppercaseInput
                        placeholder="Enter here..."
                        value={chassisNo}
                        onChange={(val) => setChassisNo(val)}
                        className="w-full px-3 py-2 h-12 border border-gray-300 rounded-lg"
                      />
                    </>
                  ) : (
                    <LabelDatePicker
                      label="Registration Date"
                      value={regDate}
                      setRegDate={setRegDate}
                      className="w-full"
                    />
                  )}
                </Col>

                <Col xs={24} sm={24} md={12} lg={7}>
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
                    className="w-full px-3 py-2 h-12 border border-gray-300 rounded-lg"
                  />
                </Col>

                <Col xs={24} sm={24} md={12} lg={7}>
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
                </Col>

                <Col xs={24} sm={24} md={12} lg={3}>
                  <button
                    type="submit"
                    className="submit-frame px-4 py-4 rounded-lg bg-[#ebf1f1] text-[#04544f] font-bold text-sm"
                    style={{ width: "150px" }}
                    disabled={submitLoading}
                  >
                    {submitLoading ? "Loading..." : "Submit"}
                  </button>
                </Col>
              </Row>
            </form>

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
                  Please enter the above information to proceed with the
                  physical inspection request.
                </span>
              </div>
            )}
          </div>

          {showData && (
            <div className="vi-result-card">
              <div className="vi-result-header">
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Inspection Application Details
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

              <p
                style={{
                  color: "#374151",
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "1.6",
                  margin: "0 0 12px 0",
                }}
              >
                {noResultMessage ? (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {noResultMessage}
                  </span>
                ) : (
                  <>
                    PHYSICAL INSPECTION APPLICATION NUMBER IS:{" "}
                    <span style={{ color: "#04544f" }}>{inspectionNumber}</span>
                  </>
                )}
              </p>

              {!noResultMessage && (
                <ul
                  style={{
                    color: "#374151",
                    fontSize: "14px",
                    lineHeight: "1.8",
                    margin: 0,
                    paddingLeft: "20px",
                  }}
                >
                  <li>
                    • KINDLY VISIT ETD OFFICE FOR YOUR VEHICLE PHYSICAL
                    INSPECTION AGAINST THIS APPLICATION NUMBER.
                  </li>
                  <li>
                    • VEHICLES INSPECTED BY ETD STAFF MUST BE IMMEDIATELY HANDED
                    OVER TO THE BUYER.
                  </li>
                  <li>
                    • IT IS THE BUYER'S DUTY TO ENSURE THEY RECEIVE SAME VEHICLE
                    INSPECTED BY ETD STAFF.
                  </li>
                  <li>
                    • PLEASE ENSURE THAT BIOMETRIC VERIFICATION OF THE SELLER
                    AND BUYER ALIGN WITH THIS APPLICATION.
                  </li>
                  <li>
                    • BIOMETRIC VERIFICATION IS ONLY ALLOWED AFTER THE VEHICLE
                    HAS BEEN INSPECTED BY ETD STAFF.
                  </li>
                  <li>
                    • CHANGE OF OWNERSHIP IS SUBJECT TO CURRENT OWNER'S
                    BIOMETRIC VERIFICATION FROM NADRA.
                  </li>
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VehicleInspection;
