import { useState } from "react";
import Select from "react-select";
import backgroundImage from "../assets/icons/background2.2.png";
import RegistrationNoTable from "./my-reg-no-table";

export default function StyledRegistrationForm() {
  const [formData, setFormData] = useState({
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
    value: i + 1,
    label: (i + 1).toString(),
  }));

  const handleCheckAvailability = () => {
    setClickCount((prev) => prev + 1);
  };

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

  if (showTable) return <RegistrationNoTable formData={formData} />;

  return (
    <div
      className="min-h-[80vh] bg-cover bg-center w-full flex justify-center items-start pt-6 sm:pt-12 px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-[1100px]">
        <h2 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-6">
          Registration Number Reservation Portal
        </h2>

        <div className="w-full h-px bg-gray-200 my-6"></div>

        <form className="space-y-8">
          {/* Series + Available Number + Check */}
<div className="flex flex-col md:flex-row gap-3">
  {/* Series Alphabets */}
  <div className="w-full md:w-1/3">
    <label
      className="text-sm font-bold text-gray-700 mb-1 block"
      style={{ color: "#161a23" }}
    >
      Series Alphabets
    </label>
    <input
      type="text"
      placeholder="LZ"
      className="w-full text-sm"
      style={{
        height: "50px",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #e3e3e3",
        backgroundColor: "#fff",
      }}
    />
  </div>

  {/* Available Numbers */}
  <div className="w-full md:w-1/3">
    <label
      className="text-sm font-bold text-gray-700 mb-1 block"
      style={{ color: "#161a23" }}
    >
      Available Numbers
    </label>
    <div className="relative">
      <Select
        options={numberOptions}
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
            whiteSpace: "pre-line",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "8px",
            zIndex: 50,
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            color: "#9CA3AF",
            paddingRight: "4px",
            transform: state.selectProps.menuIsOpen
              ? "rotate(180deg)"
              : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }),
        }}
      />
    </div>
  </div>

  {/* Check Availability */}
  <div className="w-full md:w-1/3">
    <label className="text-sm font-bold text-gray-700 mb-1 block invisible">
      Check Availability
    </label>
  <button
  type="button"
  onClick={handleCheckAvailability}
  className="w-full font-semibold text-center leading-tight"
  style={{
    height: "50px",
    padding: "0 12px",
    borderRadius: "8px",
    backgroundColor: "#ebf1f1", // ya transparent
    fontFamily: "ProximaNova",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "1.2",
    textAlign: "center",
    fontSize: "14px",
    color: "#04544f", // text ka color
  }}
>
  Check
  <br />
  Availability
</button>

  </div>
</div>


          {/* Availability Message */}
          {clickCount > 0 && (
            <div style={getAvailabilityStyle()}>{getAvailabilityMessage()}</div>
          )}

          <hr className="border-dashed" />

          {/* Applicant Name */}
          <div>
            <label className="text-sm font-bold text-[#161a23]">
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
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* CNIC + NTN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-[#161a23]">CNIC</label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "").slice(0, 13);
                  if (value.length > 12)
                    value = `${value.slice(0, 5)}-${value.slice(
                      5,
                      12
                    )}-${value.slice(12)}`;
                  else if (value.length > 5)
                    value = `${value.slice(0, 5)}-${value.slice(5)}`;
                  setFormData({ ...formData, cnic: value });
                }}
                placeholder="xxxxx-xxxxxxx-x"
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-[#161a23]">NTN</label>
              <input
                type="text"
                name="ntn"
                value={formData.ntn}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, ntn: value });
                }}
                placeholder="Enter here..."
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Phone Number + Biometric ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-[#161a23]">
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
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.startsWith("0")) value = value.slice(1);
                    if (value.startsWith("92")) value = value.slice(2);
                    value = value.slice(0, 10);
                    let formatted = "";
                    if (value.length >= 10) {
                      formatted = `+92-${value.slice(0, 3)}-${value.slice(3)}`;
                    } else if (value.length > 0) {
                      formatted = `+92-${value}`;
                    }
                    e.target.value = formatted;
                  }}
                  className="pl-10 w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-[#161a23]">
                Biometric ID
              </label>
              <input
                type="text"
                name="biometricId"
                inputMode="numeric"
                pattern="\d*"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                placeholder="Enter here..."
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Vehicle Maker + Joint With */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-[#161a23]">
                Vehicle Maker
              </label>
              <div className="relative mt-1">
                <select
                  name="vehicleMaker"
                  value={formData.vehicleMaker}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleMaker: e.target.value })
                  }
                  className="w-full border border-gray-200 bg-gray-100 text-gray-700 px-4 py-2 pr-10 rounded-md focus:ring-2 focus:ring-teal-500"
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
            <div>
              <label className="text-sm font-bold text-[#161a23]">
                Joint With
              </label>
              <input
                type="text"
                name="jointWith"
                placeholder="Enter here..."
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                }}
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Generate Challan Button */}
         <button
  type="button"
  onClick={() => setShowTable(true)}
  className="w-full text-white rounded-md py-3 mt-4 font-bold hover:brightness-90 transition bg-brandGreen text-sm sm:text-base"
>
  Generate Challan
</button>

        </form>   
      </div>
    </div>
  );
}