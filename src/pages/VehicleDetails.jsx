import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Make sure path is correct

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
      const response = await fetch(
        "https://58.65.189.226:447/system/road_challan_fun/get_challan_app_veh_status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa("CardTest:Adnan!123")}`,
          },
          body: JSON.stringify({ VEH_REG_NO: registration.toUpperCase() }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setResponseData({ ...result, enteredDate: date });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Unable to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header mt-5 mx-auto p-5">
        <h1 className="text-xl font-bold text-center mb-5">
          Check Registered Vehicle Details
        </h1>
        <form
          onSubmit={handleCheck}
          className="grid grid-cols-6 gap-4 px-5 py-5 mx-auto"
        >
          <button
            type="button"
            onClick={handleSubmit}
            className="col-span-12 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Go to Reserve Number Page
          </button>

          <div className="col-span-12">
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

          <div className="col-span-12">
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

          <div className="col-span-12 mt-4">
            <ReCAPTCHA
              sitekey="6LfnCSQrAAAAAIwtsn-vb3eIunRMfZopzXnlFxcx"
              onChange={handleCaptchaChange}
              theme="light"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 mt-4 mx-5">
            <button
              type="submit"
              disabled={loading || !registration || !date}
              className={`button-colors text-white py-2 px-4 rounded w-full ${
                loading || !registration || !date
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
              }`}
            >
              {loading ? "CHECKING..." : "CHECK"}
            </button>
          </div>

          <div className="col-span-6 sm:col-span-3 mt-4 mx-5">
            <button
              type="reset"
              className="button-colors text-white py-2 px-4 rounded hover:bg-gray-600 w-full"
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

          <div className="col-span-12 mt-4">
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
                        {responseData.OWN_NAME}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">F/H NAME:</td>
                      <td className="border px-2 py-1">
                        {responseData.OWN_F_H_NAME}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">CNIC:</td>
                      <td className="border px-2 py-1">{responseData.CNIC}</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">
                        CONTACT NO:
                      </td>
                      <td className="border px-2 py-1">
                        {responseData.CONTACT_NO}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">CATEGORY:</td>
                      <td className="border px-2 py-1">
                        {responseData.CAT_NAME}
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
                        {responseData.MAK_NAME}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">
                        TAX STATUS:
                      </td>
                      <td className="border px-2 py-1">
                        {responseData["VEH_TAX_PAID_UPTO/lIFE TIME"]}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">
                        VEHICLE STATUS:
                      </td>
                      <td className="border px-2 py-1">
                        {responseData.VHS_NAME}
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
                      <td className="border px-2 py-1 font-bold">DEFAULTER:</td>
                      <td className="border px-2 py-1">
                        {responseData.DEFAULTER}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-bold">PRICE:</td>
                      <td className="border px-2 py-1">{responseData.PRICE}</td>
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
