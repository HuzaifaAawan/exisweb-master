import React, { useState } from "react";
import Select from "react-select";
import backgroundImage from "../assets/icons/background2.2.png"; // ✅ import image from src

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

  const numberOptions = Array.from({ length: 999 }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString(),
  }));

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center w-100"
      style={{ backgroundImage: `url(${backgroundImage})` }} // ✅ background image applied here
    >
      <div className="bg-white rounded-2xl shadow-md max-w-xl w-full p-8">
        <h2 className="text-center text-lg font-semibold text-gray-900 mb-6">
          Registration Number Reservation Portal
        </h2>

        <form className="space-y-6">
          {/* Series + Available Number + Check */}
          <div className="flex gap-3">
            {/* Series Alphabets */}
            <div className="w-1/3">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
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
            <div className="w-1/3">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Available Numbers
              </label>
              <Select
                options={numberOptions}
                placeholder="222"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "50px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    borderRadius: "8px",
                    borderColor: "#e3e3e3",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#9CA3AF",
                    fontSize: "14px",
                  }),
                }}
              />
            </div>

            {/* Check Availability */}
            <div className="w-1/3">
              <label className="text-sm font-medium text-gray-700 mb-1 block invisible">
                Check Availability
              </label>
              <button
                type="button"
                className="w-full font-semibold text-center leading-tight"
                style={{
                  height: "50px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  backgroundColor: "#ebf1f1",
                  color: "#04544f",
                  fontFamily: "ProximaNova",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Check<br />Availability
              </button>
            </div>
          </div>

          <hr className="border-dashed" />

          {/* Applicant Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Applicant Name</label>
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
              placeholder="Enter full name"
              autoComplete="name"
              required
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* CNIC + NTN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">CNIC</label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "").slice(0, 13);
                  if (value.length > 12)
                    value = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12)}`;
                  else if (value.length > 5)
                    value = `${value.slice(0, 5)}-${value.slice(5)}`;
                  setFormData({ ...formData, cnic: value });
                }}
                placeholder="xxxxx-xxxxxxx-x"
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">NTN</label>
              <input
                type="text"
                name="ntn"
                value={formData.ntn}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, ntn: value });
                }}
                placeholder="Enter here..."
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Phone Number + Biometric ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-green-600">📞</span>
                <input
                  type="text"
                  name="phone"
                  placeholder="+92-3XX-XXXXXXX"
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.startsWith("0")) value = value.slice(1);
                    if (value.startsWith("92")) value = value.slice(2);
                    value = value.slice(0, 10);
                    let formatted = '';
                    if (value.length >= 10) {
                      formatted = `+92-${value.slice(0, 3)}-${value.slice(3)}`;
                    } else if (value.length > 0) {
                      formatted = `+92-${value}`;
                    }
                    e.target.value = formatted;
                  }}
                  className="pl-8 w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Biometric ID */}
            <div>
  <label className="text-sm font-medium text-gray-700">Joint With</label>
  <input
    type="text"
    name="jointWith"
    placeholder="Enter here..."
    onInput={(e) => {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // only letters and spaces
    }}
    className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
  />
</div>

          </div>

          {/* Generate Button */}
          <button
            type="submit"
            style={{ backgroundColor: "#04544f" }}
            className="w-full text-white rounded-md py-3 mt-4 font-semibold hover:brightness-90 transition"
          >
            Generate Challan
          </button>
        </form>
      </div>
    </div>
  );
}
