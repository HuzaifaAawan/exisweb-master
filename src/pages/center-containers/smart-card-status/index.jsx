import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles.scss";
import backgroundImage from "../../../assets/icons/background2.2.png";
import { useAuthFetch } from "../../../libs/hooks/useAuthFetch";
import { API_ENDPOINTS } from "../../../constants";

const STATUS_COLORS = {
  RECEIVED: "#52c41a",
  PENDING: "#faad14",
  REJECTED: "#ff4d4f",
  DISPATCHED: "#1677ff",
};

const CheckSmartCardStatus = () => {
  const authFetch = useAuthFetch();
  const [regNo, setRegNo] = useState("");
  const [appId, setAppId] = useState("");
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
      const response = await authFetch(API_ENDPOINTS.GET_CARD_STATUS, {
        method: "POST",
        body: JSON.stringify({
          REG_NO: regNo.trim().toUpperCase(),
          APP_ID: appId.trim(),
        }),
      });

      if (!response) return;

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        setResultError(errData?.ErrorMessage || errData?.message || `Request failed (${response.status})`);
        return;
      }

      const data = await response.json();
      const normalized = Array.isArray(data) ? data : null;
      if (!normalized || normalized.length === 0) {
        setResultError("No record found for the given details.");
        return;
      }
      setResults(normalized);
    } catch (err) {
      setResultError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRegNo("");
    setAppId("");
    setCaptchaValue(null);
    setResults(null);
    setCaptchaError(null);
    setResultError(null);
  };

  const getStatusColor = (status) =>
    STATUS_COLORS[(status || "").toUpperCase()] || "#556485";

  return (
    <div
      className="smart-card-status"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <span className="scs-page-title">Check Smart Card Status</span>

      <div className="scs-card">
        <span style={{ display: "block", fontWeight: "bold", fontSize: "18px" }}>
          Smart Card Status
        </span>
        <span style={{ display: "block", color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>
          Enter the registration number and application ID to check your smart card status
        </span>
        <hr style={{ border: "none", borderTop: "1px solid #e3e3e3", width: "80%", margin: "12px auto 16px" }} />

        <form onSubmit={handleSubmit}>
          <div className="scs-fields-row">
            <div className="scs-field-item">
              <label className="Textfield-Label">Registration No.</label>
              <input
                type="text"
                placeholder="e.g., ALB-572"
                className="scs-input"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value.toUpperCase())}
                required
              />
            </div>
            <div className="scs-field-item">
              <label className="Textfield-Label">Application ID</label>
              <input
                type="text"
                placeholder="e.g., 1234567"
                className="scs-input"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <ReCAPTCHA
              sitekey="6LfnCSQrAAAAAIwtsn-vb3eIunRMfZopzXnlFxcx"
              onChange={(val) => setCaptchaValue(val)}
              theme="light"
            />
          </div>

          {captchaError && <p className="scs-error">{captchaError}</p>}

          <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <button
              type="submit"
              disabled={loading || !regNo.trim() || !appId.trim()}
              className="submit-frame"
              style={{ width: "120px" }}
            >
              {loading ? "Checking..." : "Check"}
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
        <div className="scs-card">
          <div className="scs-result-header">
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>Card Details</span>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid #e3e3e3", width: "80%", margin: "12px auto 0" }} />
          <p className="scs-result-error">{resultError}</p>
        </div>
      )}

      {Array.isArray(results) && results.length > 0 && (
        <div className="scs-card">
          {results.map((item, index) => (
            <div key={index} className={index > 0 ? "scs-result-divider" : ""}>
              <div className="scs-result-header">
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>Card Details</span>
                <span
                  className="scs-status-badge"
                  style={{ backgroundColor: getStatusColor(item.STATUS) }}
                >
                  {item.STATUS || "-"}
                </span>
              </div>
              <hr style={{ border: "none", borderTop: "1px solid #e3e3e3", width: "80%", margin: "12px auto 16px" }} />
              <div className="scs-result-grid">
                <div className="scs-field">
                  <span className="field-label">Registration No.</span>
                  <span className="field-value">{item.REGNO || "-"}</span>
                </div>
                <div className="scs-field">
                  <span className="field-label">Application ID</span>
                  <span className="field-value">{item.APPID || "-"}</span>
                </div>
                <div className="scs-field">
                  <span className="field-label">Application Date</span>
                  <span className="field-value">{item.APPDATE || "-"}</span>
                </div>
                <div className="scs-field">
                  <span className="field-label">Batch No.</span>
                  <span className="field-value">{item.BATCHNO || "-"}</span>
                </div>
                <div className="scs-field">
                  <span className="field-label">Process</span>
                  <span className="field-value">{item.PROCESS || "-"}</span>
                </div>
                <div className="scs-field">
                  <span className="field-label">Phase</span>
                  <span className="field-value">{item.PHASE || "-"}</span>
                </div>
                <div className="scs-field">
                  <span className="field-label">Processing Status</span>
                  <span className="field-value">{item.PSTATUS || "-"}</span>
                </div>
                <div className="scs-field">
                  <span className="field-label">Verification</span>
                  <span className="field-value">{item.VERIFICATION || "-"}</span>
                </div>
                <div className="scs-field">
                  <span className="field-label">Verification Check</span>
                  <span className="field-value">{item.VCHECK === "Y" ? "Yes" : item.VCHECK === "N" ? "No" : "-"}</span>
                </div>
                {item.RMK && (
                  <div className="scs-field">
                    <span className="field-label">Remarks</span>
                    <span className="field-value">{item.RMK}</span>
                  </div>
                )}
                {item.OBJECTION && (
                  <div className="scs-field">
                    <span className="field-label">Objection</span>
                    <span className="field-value">{item.OBJECTION}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckSmartCardStatus;
