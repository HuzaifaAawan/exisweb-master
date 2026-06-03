import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import { useAuthFetch } from "../../../libs/hooks/useAuthFetch";
import { API_ENDPOINTS } from "../../../constants";

const STATUS_COLORS = {
  PAID: "#52c41a",
  UNPAID: "#ff4d4f",
};

const VehicleChallanVerification = () => {
  const authFetch = useAuthFetch();
  const [challanNo, setChallanNo] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [captchaError, setCaptchaError] = useState(null);
  const [resultError, setResultError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCaptchaError(null);
    setResultError(null);
    setResults(null);

    if (!captchaValue) {
      setCaptchaError("Please verify that you're not a robot.");
      return;
    }

    setLoading(true);
    try {
      const response = await authFetch(API_ENDPOINTS.GET_CHALLAN_STATUS, {
        method: "POST",
        body: JSON.stringify({ CHALLAN_NO: challanNo.trim() }),
      });

      if (!response) return;

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        setResultError(errData?.message || `Request failed (${response.status})`);
        return;
      }

      const data = await response.json();
      if (!data || data?.result === "NO RESULT" || data.length === 0) {
        setResultError("No challan found for the given number.");
        return;
      }
      setResults(data);
    } catch (err) {
      setResultError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setChallanNo("");
    setCaptchaValue(null);
    setResults(null);
    setCaptchaError(null);
    setResultError(null);
  };

  const getStatusColor = (status) =>
    STATUS_COLORS[(status || "").toUpperCase()] || "#faad14";

  return (
    <div
      className="challan-verification"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <span className="page-title">Vehicle Challan Verification</span>

      <div className="challan-card">
        <span
          style={{ display: "block", fontWeight: "bold", fontSize: "18px" }}
        >
          Verify Challan
        </span>
        <span
          style={{
            display: "block",
            color: "#6b7280",
            fontSize: "14px",
            marginTop: "4px",
          }}
        >
          Please enter the challan number below to check its status
        </span>
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e3e3e3",
            width: "80%",
            margin: "12px auto 16px",
          }}
        />

        <form onSubmit={handleSubmit}>
          <label className="Textfield-Label">Challan Number</label>
          <input
            type="text"
            placeholder="Enter Challan Number"
            className="challan-input"
            value={challanNo}
            onChange={(e) => setChallanNo(e.target.value)}
            required
          />

          <div style={{ marginTop: "16px" }}>
            <ReCAPTCHA
              sitekey="6LfBRAotAAAAACMKIXcOjepk_l75pYQYEFXX1s0M"
              onChange={(val) => setCaptchaValue(val)}
              theme="light"
            />
          </div>

          {captchaError && <p className="challan-error">{captchaError}</p>}

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
            }}
          >
            <button
              type="submit"
              disabled={loading || !challanNo.trim()}
              className="submit-frame"
              style={{ width: "120px" }}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
            <button
              type="button"
              className="submit-frame"
              style={{ width: "120px" }}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {resultError && (
        <div className="challan-card">
          <div className="challan-result-header">
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              Challan Details
            </span>
          </div>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e3e3e3",
              width: "80%",
              margin: "12px auto 0",
            }}
          />
          <p className="challan-result-error">{resultError}</p>
        </div>
      )}

      {results && (
        <div className="challan-card">
          {results.map((item, index) => (
            <div
              key={index}
              className={index > 0 ? "challan-result-divider" : ""}
            >
              <div className="challan-result-header">
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Challan Details
                </span>
                <span
                  className="challan-status-badge"
                  style={{ backgroundColor: getStatusColor(item.CHSTATUS) }}
                >
                  {item.CHSTATUS || "-"}
                </span>
              </div>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #e3e3e3",
                  width: "80%",
                  margin: "12px auto 16px",
                }}
              />
              <div className="challan-result-grid">
                <div className="challan-field">
                  <span className="field-label">Challan No.</span>
                  <span className="field-value">{item.CHNO || "-"}</span>
                </div>
                <div className="challan-field">
                  <span className="field-label">Registration No.</span>
                  <span className="field-value">{item.REGNO || "-"}</span>
                </div>
                <div className="challan-field">
                  <span className="field-label">Applicant</span>
                  <span className="field-value">{item.APPLICANT || "-"}</span>
                </div>
                <div className="challan-field">
                  <span className="field-label">Process</span>
                  <span className="field-value">{item.PROCESS || "-"}</span>
                </div>
                <div className="challan-field">
                  <span className="field-label">Amount</span>
                  <span className="field-value amount">
                    PKR {item.AMOUNT?.toLocaleString() || "-"}
                  </span>
                </div>
                <div className="challan-field">
                  <span className="field-label">Paid Date</span>
                  <span className="field-value">{item.PAIDDATE || "-"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleChallanVerification;
