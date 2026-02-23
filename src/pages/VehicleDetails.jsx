import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Make sure path is correct
import backgroundImage from "../assets/icons/background2.2.png";
import { API_ENDPOINTS } from "../constants";

const VehicleDetails = () => {
  const [registration, setRegistration] = useState("");
  const [date, setDate] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRedirected, setIsRedirected] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/registration");
  };

  useEffect(() => {
    if (!isRedirected) {
      setIsRedirected(true);
      // If you want redirection uncomment below line:
      // window.location.href = "https://58.65.189.226:884/custom-login";
    }
  }, [isRedirected]);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseData(null);

    if (!captchaValue) {
      setError("Please verify that you're not a robot.");
      return;
    }

    setLoading(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      // Format date to DD/MM/YYYY
      const formattedDate = date ? new Date(date).toLocaleDateString('en-GB') : "";

      const response = await fetch(API_ENDPOINTS.GET_VEHICLE_DETAILS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          REG_NO: registration.toUpperCase(),
          REG_DATE: formattedDate,
        }),
      });

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
    <div className="App w-full flex justify-center reg-form">
      <header
        className="App-header mt-5 mx-auto p-7 w-full max-w-8xl h-auto reg-form-header"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="text-xl font-bold text-center mb-5 reg-form-title">
          Check Registered Vehicle Details
        </h1>
        <form
          onSubmit={handleCheck}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 px-5 py-5 mx-auto reg-form-content"
        >
          <button
            type="button"
            onClick={handleSubmit}
            className="col-span-6 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 btn whitespace-nowrap overflow-hidden text-ellipsis"
          >
            Go to Reserve Number Page
          </button>

          <div className="col-span-6">
            <label htmlFor="registration" className="block font-medium mb-2">
              REGISTRATION NO:
            </label>
            <input
              type="text"
              id="registration"
              placeholder="e.g., ALB-572"
              className="border rounded p-2 w-full"
              required
              value={registration}
              onChange={(e) => setRegistration(e.target.value.toUpperCase())}
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="date" className="block font-medium mb-2">
              REGISTRATION DATE:
            </label>
            <input
              type="date"
              id="date"
              required
              className="border rounded p-2 w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

        
          <div className="col-span-6 mt-4 flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full">
            <ReCAPTCHA
              sitekey="6LfnCSQrAAAAAIwtsn-vb3eIunRMfZopzXnlFxcx"
              onChange={handleCaptchaChange}
              theme="light"
              className="scale-90 sm:scale-100 transform origin-center"
            />
          </div>

          <div className="col-span-6 mt-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                type="submit"
                disabled={loading || !registration || !date}
                className="button-colors text-white py-2 px-2 text-sm rounded w-full sm:w-1/2"
              >
                {loading ? "CHECKING..." : "CHECK"}
              </button>

              <button
                type="reset"
                className="button-colors text-white py-2 px-2 text-sm rounded hover:bg-gray-600 w-full sm:w-1/2"
                onClick={() => {
                  setRegistration("");
                  setDate("");
                  setResponseData(null);
                  setError(null);
                  setCaptchaValue(null);
                }}
              >
                RESET
              </button>
            </div>
          </div>

          <div className="col-span-6 mt-4">
            {responseData && (
              <div className="mt-10 w-full px-4">
                <h2 className="text-lg font-semibold mb-4">
                  Vehicle Information
                </h2>
                <table className="table-auto border-collapse border w-full">
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-bold">REG NO:</td>
                      <td className="border px-2 py-1">
                        {responseData.VEH_REG_NO}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">REG DATE:</td>
                      <td className="border px-2 py-1">
                        {responseData.VEH_REG_DATE}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">ENGINE NO:</td>
                      <td className="border px-2 py-1">
                        {responseData.VEH_ENGINE_NO}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">CHASIS NO:</td>
                      <td className="border px-2 py-1">
                        {responseData.VEH_CHASIS_NO}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">
                        ENGINE SIZE:
                      </td>
                      <td className="border px-2 py-1">
                        {responseData.VEH_ENGINE_SIZE}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">
                        YEAR OF MANF:
                      </td>
                      <td className="border px-2 py-1">
                        {responseData.VEH_YEAR_OF_MANF}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">COLOR:</td>
                      <td className="border px-2 py-1">{responseData.COLOR}</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">
                        OWNER NAME:
                      </td>
                      <td className="border px-2 py-1">
                        {responseData.OWNER_NAME}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">BODY TYPE:</td>
                      <td className="border px-2 py-1">
                        {responseData.BODYTYPE}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">MAKER:</td>
                      <td className="border px-2 py-1">
                        {responseData["MAKER/ MAKE"]}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">
                        TAX PAID UPTO:
                      </td>
                      <td className="border px-2 py-1">
                        {responseData.VEH_TAX_PAID_UPTO || responseData.LIFETIME_TAX || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">
                        VEHICLE STATUS:
                      </td>
                      <td className="border px-2 py-1">
                        {responseData.STATUS}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">
                        VEHICLE TYPE:
                      </td>
                      <td className="border px-2 py-1">
                        {responseData.VPT_TYPE}
                      </td>
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
        </form>

        {error && <div className="text-red-500 mt-5">{error}</div>}
      </header>
    </div>
  );
};

export default VehicleDetails;