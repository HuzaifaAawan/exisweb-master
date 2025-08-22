import { useState, useEffect } from "react";
import Select from "react-select";
import RegistrationNoTable from "../../my-reg-no-table";
import backgroundImage from "../../../assets/icons/background2.2.png";
import "./styles.scss";

export default function StyledRegistrationForm() {
  const [formData, setFormData] = useState({
    series: "",
    number: "",
    applicantName: "",
    cnic: "",
    ntn: "",
    phone: "",
    biometricId: "",
    vehicleMaker: "",
    jointWith: "",
  });

  const [showTable, setShowTable] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const numberOptions = Array.from({ length: 999 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  const handleCheckAvailability = () => setClickCount((p) => p + 1);

  const getAvailabilityMessage = () => {
    if (clickCount === 0) return null;
    return clickCount % 2 === 1
      ? "✅ This Series and Number is Available"
      : "❌ This Series and Number is NOT Available";
  };

  const getAvailabilityStyle = () => ({
    height: "20px",
    flexGrow: 1,
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: 1.67,
    color: clickCount % 2 === 1 ? "#4caf50" : "red",
    marginTop: "6px",
  });

  // small helpers
  const digits = (s = "") => (s + "").replace(/\D/g, "");
  const formatCNIC = (raw) => {
    const d = digits(raw).slice(0, 13);
    if (d.length > 12)
      return `${d.slice(0, 5)}-${d.slice(5, 12)}-${d.slice(12)}`;
    if (d.length > 5) return `${d.slice(0, 5)}-${d.slice(5)}`;
    return d;
  };
  const normalizePhoneDigits = (raw) => {
    let d = digits(raw);
    if (d.startsWith("0")) d = d.slice(1);
    if (d.startsWith("92")) d = d.slice(2);
    return d.slice(0, 10);
  };
  const formatPhone = (raw) => {
    const d = normalizePhoneDigits(raw);
    if (d.length === 10) return `+92-${d.slice(0, 3)}-${d.slice(3)}`;
    if (d.length > 0) return `+92-${d}`;
    return "";
  };

  // validation rules (adjust lengths if you want stricter)
  const isSeriesValid = formData.series.trim().length > 0;
  const isNumberValid = formData.number.toString().trim().length > 0;
  const isApplicantNameValid = formData.applicantName.trim().length > 0;
  const isCnicValid = digits(formData.cnic).length === 13;
  const isNtnValid = formData.ntn.trim().length > 0;
  const phoneDigits = normalizePhoneDigits(formData.phone);
  const isPhoneValid = phoneDigits.length === 10;
  const isBiometricValid = digits(formData.biometricId).length > 0;
  const isVehicleMakerValid = formData.vehicleMaker.trim().length > 0;
  const isJointWithValid = formData.jointWith.trim().length > 0;

  const isFormValid =
    isSeriesValid &&
    isNumberValid &&
    isApplicantNameValid &&
    isCnicValid &&
    isNtnValid &&
    isPhoneValid &&
    isBiometricValid &&
    isVehicleMakerValid &&
    isJointWithValid;

  // Debugging: shows current formData + validation in console
  useEffect(() => {
    console.log("formData:", formData, {
      isSeriesValid,
      isNumberValid,
      isApplicantNameValid,
      isCnicValid,
      isNtnValid,
      isPhoneValid,
      isBiometricValid,
      isVehicleMakerValid,
      isJointWithValid,
      isFormValid,
    });
  }, [formData]); // remove in production if you don't want logs

  if (showTable) return <RegistrationNoTable formData={formData} />;

  return (
    <div
      className="min-h-[80vh] bg-cover bg-center w-full flex justify-center items-start pt-6 sm:pt-12 px-4 reservation-portal-main-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-[1100px] outer-div">
        <h2 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-6 heading">
          Registration No. Reservation Portal
        </h2>

        <div className="w-full h-px divider"></div>

        <form
          className="space-y-8 inner-container-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col md:flex-row gap-3 first-row w-full">
            <div className="w-full md:w-[40%] next-div">
              <label
                className="text-sm font-bold text-gray-700 mb-1 block-title"
                style={{ color: "#161a23" }}
              >
                Series Alphabets
              </label>
              <input
                type="text"
                name="series"
                value={formData.series}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    series: e.target.value.toUpperCase(),
                  })
                }
                placeholder="LZ"
                className="w-full text-sm input-cls  focus:outline-none focus:ring-0 focus:border-brandGreen"
                style={{
                  height: "50px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e3e3e3",
                  backgroundColor: "#fff",
                }}
              />
            </div>

            <div className="w-full md:w-[40%] next-div">
              <label
                className="text-sm font-bold text-gray-700 mb-1 block-title"
                style={{ color: "#161a23" }}
              >
                Available Numbers
              </label>
              <div className="relative">
                <Select
                  options={numberOptions}
                  value={
                    numberOptions.find((o) => o.value === formData.number) ||
                    null
                  }
                  onChange={(option) =>
                    setFormData({
                      ...formData,
                      number: option ? option.value : "",
                    })
                  }
                  placeholder={"Enter"}
                  isSearchable
                  classNamePrefix="react-select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      minHeight: "50px",
                      paddingLeft: "12px",
                      paddingRight: "4px",
                      borderRadius: "8px",
                      borderColor: state.isFocused ? "#14b8a6" : "#e3e3e3",
                      boxShadow: state.isFocused
                        ? "0 0 0 2px rgba(20, 184, 166, 0.2)"
                        : "none",
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      transition: "all 0.2s ease",
                      fontSize: "14px",
                      color: "#374151",
                      cursor: "text",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9CA3AF",
                      fontSize: "14px",
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "8px",
                      zIndex: 50,
                    }),
                    indicatorSeparator: () => ({ display: "none" }),
                    dropdownIndicator: (base, state) => ({
                      ...base,
                      transform: state.selectProps.menuIsOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }),
                  }}
                />
              </div>
            </div>

            <div className="w-full md:w-[20%]">
              <label className=" font-bold text-gray-700 mb-1 block invisible ">
                Check Availability
              </label>
              <button
                type="button"
                onClick={handleCheckAvailability}
                className="w-full font-semibold check-avail-btn "
                style={{
                  height: "50px",
                  padding: "0 12px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  backgroundColor: "#ebf1f1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  lineHeight: "1.2",
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#04544f",
                }}
              >
                Check Availability
              </button>
            </div>
          </div>

          {clickCount > 0 && (
            <div style={getAvailabilityStyle()}>{getAvailabilityMessage()}</div>
          )}

          <hr className="border-dashed" />

          <div className="second-row">
            <label className="text-sm font-bold text-[#161a23] second-row-heading">
              Applicant Name
            </label>
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={(e) =>
                setFormData({ ...formData, applicantName: e.target.value })
              }
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 input-cls focus:outline-none focus:ring-0 focus:border-brandGreen"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 third-row">
            <div className="cnic-div">
              <label className="text-sm font-bold text-[#161a23] label">
                CNIC
              </label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={(e) =>
                  setFormData({ ...formData, cnic: formatCNIC(e.target.value) })
                }
                placeholder="xxxxx-xxxxxxx-x"
                className="w-full border border-gray-300 rounded-md px-3 py-2 cnic-input focus:outline-none focus:ring-0 focus:border-brandGreen"
              />
            </div>
            <div className="ntn-div">
              <label className="text-sm font-bold text-[#161a23] label">
                NTN
              </label>
              <input
                type="text"
                name="ntn"
                value={formData.ntn}
                onChange={(e) =>
                  setFormData({ ...formData, ntn: digits(e.target.value) })
                }
                placeholder="Enter here..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 ntn-input focus:outline-none focus:ring-0 focus:border-brandGreen"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 forth-row">
            <div className="phone-no-div">
              <label className="text-sm font-bold text-[#161a23] label">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5">
                  <img
                    src="https://flagcdn.com/w40/pk.png"
                    alt="PK"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                </span>
                <input
                  type="text"
                  name="phone"
                  placeholder="+92-3XX-XXXXXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: formatPhone(e.target.value),
                    })
                  }
                  className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 phone-no-input focus:outline-none focus:ring-0 focus:border-brandGreen"
                />
              </div>
            </div>
            <div className="biometric-id-div">
              <label className="text-sm font-bold text-[#161a23] label">
                Biometric ID
              </label>
              <input
                type="text"
                name="biometricId"
                inputMode="numeric"
                pattern="\d*"
                value={formData.biometricId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    biometricId: digits(e.target.value),
                  })
                }
                placeholder="Enter here..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 biometric-id-input focus:outline-none focus:ring-0 focus:border-brandGreen"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fifth-row">
            <div className="vehicle-maker-div">
              <label className="text-sm font-bold text-[#161a23] label">
                Vehicle Maker
              </label>
              <div className="relative mt-1">
                <select
                  name="vehicleMaker"
                  value={formData.vehicleMaker}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleMaker: e.target.value })
                  }
                  className="w-full border border-gray-200 bg-gray-100 text-gray-700 px-4 py-2 pr-10 rounded-md focus:ring-2 focus:ring-teal-500 vehicle-maker-input focus:outline-none focus:ring-0 focus:border-brandGreen"
                >
                  <option value="">Select Vehicle Maker</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Kia">Kia</option>
                  <option value="Hyundai">Hyundai</option>
                </select>
              </div>
            </div>
            <div className="joint-with-div">
              <label className="text-sm font-bold text-[#161a23] label">
                Joint With
              </label>
              <input
                type="text"
                name="jointWith"
                value={formData.jointWith}
                placeholder="Enter here..."
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jointWith: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                  })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 join-width-input focus:outline-none focus:ring-0 focus:border-brandGreen"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowTable(true)}
            disabled={!isFormValid}
            // inline style ensures it is visually & functionally disabled even if Tailwind disabled: variant missing
            style={{
              opacity: isFormValid ? 1 : 0.6,
              pointerEvents: isFormValid ? "auto" : "not-allowed",
            }}
            className="w-full text-white rounded-md py-3 mt-4 font-bold transition bg-brandGreen text-sm sm:text-base
             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 hover:brightness-90"
          >
            Generate Challan
          </button>
        </form>
      </div>
    </div>
  );
}
