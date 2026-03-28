import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import backgroundImage from "../assets/icons/background2.2.png";
import { API_ENDPOINTS } from "../constants";
import { useAuthFetch } from "../libs/hooks/useAuthFetch";
import "./center-containers/vehicle-transfer-ownership/styles.scss";


const VehicleDetails = () => {
  const authFetch = useAuthFetch();
  const [registration, setRegistration] = useState("");
  const [date, setDate] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [registrationError, setRegistrationError] = useState("");
  const [loading, setLoading] = useState(false);
  const REG_PATTERN = /^[A-Z]{2,3}-\d+$/;
  const [isRedirected, setIsRedirected] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/registration");
  };

  useEffect(() => {
    if (!isRedirected) {
      setIsRedirected(true);
    }
  }, [isRedirected]);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseData(null);

    if (!REG_PATTERN.test(registration)) {
      setRegistrationError("Format must be 2-3 letters, a hyphen, then numbers (e.g., ALB-572).");
      return;
    }

    if (!captchaValue) {
      setError("Please verify that you're not a robot.");
      return;
    }

    setLoading(true);

    try {
      const formattedDate = date ? new Date(date).toLocaleDateString('en-GB') : "";

      const response = await authFetch(API_ENDPOINTS.GET_VEHICLE_DETAILS, {
        method: "POST",
        body: JSON.stringify({
          REG_NO: registration.toUpperCase(),
          REG_DATE: formattedDate,
        }),
      });

      if (!response) return;

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      const vehicle = Array.isArray(result) ? result[0] : result;
      setResponseData({ ...vehicle, enteredDate: date });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message || "Unable to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1.33rem",
        overflow: "auto",
      }}
    >
      {/* Title */}
      <span
        className="title"
        style={{
          fontSize: "clamp(16px, 2.2vw, 24px)",
          fontWeight: "bold",
          textAlign: "center",
          maxWidth: "95%",
          lineHeight: "1.4",
        }}
      >
        Check Registered Vehicle Details
      </span>

      {/* Form Card */}
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
        <div>
          <span style={{ display: "block", fontWeight: "bold", fontSize: "18px" }}>
            Check Vehicle Details
          </span>
          <span style={{ display: "block", color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>
            Please provide the details below to view vehicle information
          </span>
          <hr style={{ border: "none", borderTop: "1px solid #e3e3e3", width: "80%", margin: "12px auto 0" }} />
        </div>

        <form onSubmit={handleCheck}>
          <Row gutter={[16, 16]} align="top">
            {/* Registration No */}
            <Col xs={24} sm={12}>
              <label className="Textfield-Label">Registration no:</label>
              <input
                type="text"
                placeholder="e.g., ALB-572"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${registrationError ? "border-red-500" : "border-gray-300"}`}
                style={{ height: "44px" }}
                required
                value={registration}
                onChange={(e) => {
                  const val = e.target.value.toUpperCase();
                  setRegistration(val);
                  if (val && !REG_PATTERN.test(val)) {
                    setRegistrationError("Format: 2-3 letters, hyphen, numbers (e.g., ALB-572).");
                  } else {
                    setRegistrationError("");
                  }
                }}
              />
              <p className="text-red-500 text-sm mt-1" style={{ minHeight: "20px" }}>
                {registrationError || ""}
              </p>
            </Col>

            {/* Registration Date */}
            <Col xs={24} sm={12}>
              <label className="Textfield-Label">Registration date:</label>
              <input
                type="date"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ height: "44px" }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </Col>

          </Row>

          {/* ReCAPTCHA */}
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col xs={24}>
              <ReCAPTCHA
                sitekey="6LfnCSQrAAAAAIwtsn-vb3eIunRMfZopzXnlFxcx"
                onChange={handleCaptchaChange}
                theme="light"
              />
            </Col>
          </Row>

          {/* Check + Reset + Reserve Number */}
          <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end", gap: "6px" }}>
            <button
              type="submit"
              disabled={loading || !registration || !date}
              className="submit-frame"
              style={{ width: "120px" }}
            >
              {loading ? "Checking..." : "Check"}
            </button>
            <button
              type="reset"
              className="submit-frame"
              style={{ width: "120px" }}
              onClick={() => {
                setRegistration("");
                setDate("");
                setResponseData(null);
                setError(null);
                setRegistrationError("");
                setCaptchaValue(null);
              }}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="submit-frame"
              style={{ width: "150px", backgroundColor: "#1d4ed8", color: "#fff" }}
            >
              Reserve Number
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
      </div>

      {/* Results Card */}
      {responseData && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #e3e3e3",
            backgroundColor: "#fff",
            marginTop: "16px",
          }}
        >
          <span style={{ display: "block", fontWeight: "bold", fontSize: "18px" }}>
            Vehicle Information
          </span>
          <hr style={{ border: "none", borderTop: "1px solid #e3e3e3", width: "80%", margin: "0 auto" }} />
          <table className="table-auto border-collapse border w-full">
            <tbody>
              <tr>
                <td className="border px-2 py-1 font-bold">REG NO:</td>
                <td className="border px-2 py-1">{responseData.VEH_REG_NO}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">REG DATE:</td>
                <td className="border px-2 py-1">{responseData.VEH_REG_DATE}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">ENGINE NO:</td>
                <td className="border px-2 py-1">{responseData.VEH_ENGINE_NO}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">CHASIS NO:</td>
                <td className="border px-2 py-1">{responseData.VEH_CHASIS_NO}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">ENGINE SIZE:</td>
                <td className="border px-2 py-1">{responseData.VEH_ENGINE_SIZE}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">YEAR OF MANF:</td>
                <td className="border px-2 py-1">{responseData.VEH_YEAR_OF_MANF}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">COLOR:</td>
                <td className="border px-2 py-1">{responseData.COLOR}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">OWNER NAME:</td>
                <td className="border px-2 py-1">{responseData.OWNER_NAME}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">BODY TYPE:</td>
                <td className="border px-2 py-1">{responseData.BODYTYPE}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">MAKER:</td>
                <td className="border px-2 py-1">{responseData["MAKER/ MAKE"]}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">TAX PAID UPTO:</td>
                <td className="border px-2 py-1">
                  {responseData.VEH_TAX_PAID_UPTO || responseData.LIFETIME_TAX || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">VEHICLE STATUS:</td>
                <td className="border px-2 py-1">{responseData.STATUS}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">VEHICLE TYPE:</td>
                <td className="border px-2 py-1">{responseData.VPT_TYPE}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-bold">HPA:</td>
                <td className="border px-2 py-1">{responseData.HPA}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
