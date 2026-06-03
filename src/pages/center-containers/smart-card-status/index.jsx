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
   DELIVERED: "#52c41a",
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
        headers: {
          "Content-Type": "application/json",
        },
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

     const text = await response.text();
     console.log("CARD STATUS RAW RESPONSE:", text);

     let data = null;

     try {
       data = JSON.parse(text);
     } catch (e) {
       if (text.includes("DELIVERED")) {
         data = {
           STATUS: "DELIVERED",
           MESSAGE: "For further query, please contact concerned Department.",
         };
       } else {
         setResultError(text || "Invalid response from server.");
         return;
       }
     }

     if (!data || !data.STATUS) {
       setResultError("No record found for the given details.");
       return;
     }

     setResults({
       STATUS: data.STATUS,
       MESSAGE:
         data.MESSAGE ||
         "For further query, please contact concerned Department.",
     });
      
   } catch (err) {
  console.log("CARD STATUS ERROR:", err);
  setResultError(err?.message || "Network error. Please try again.");

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
      <span className="page-title">Check Smart Card Status</span>

      <div className="scs-card">
        <span
          style={{ display: "block", fontWeight: "bold", fontSize: "18px" }}
        >
          Smart Card Status
        </span>
        <span
          style={{
            display: "block",
            color: "#6b8072",
            fontSize: "14px",
            marginTop: "4px",
          }}
        >
          Enter the registration number and application ID to check your smart
          card status
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
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={(val) => setCaptchaValue(val)}
              theme="light"
            />
          </div>

          {captchaError && <p className="scs-error">{captchaError}</p>}

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
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              Card Details
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
          <p className="scs-result-error">{resultError}</p>
        </div>
      )}

      {results && (
        <div className="scs-card">
          <div className="scs-result-header">
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              Card Details
            </span>
            {results.STATUS && results.STATUS !== "-" && (
              <span
                className="scs-status-badge"
                style={{ backgroundColor: getStatusColor(results.STATUS) }}
              >
                {results.STATUS}
              </span>
            )}
          </div>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e3e3e3",
              width: "80%",
              margin: "12px auto 16px",
            }}
          />
          <p
            style={{
              color: "#37513e",
              fontSize: "14px",
              lineHeight: "1.7",
              margin: 0,
              textAlign: "center",
            }}
          >
            {results.MESSAGE}
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckSmartCardStatus;
