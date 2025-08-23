import React from "react";
import backgroundImage from "../../../assets/icons/background2.2.png";

const NewVehicleRegistration = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-green-700">
            ONLINE VEHICLE REGISTRATION
          </h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-medium">
              New Vehicle Registration
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium">
              My Application Details
            </button>
          </div>
        </div>

        {/* Owner Information */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-2">Owner Information</h2>
          <p className="text-gray-500 text-sm mb-6">
            Person/Company, whose name subjected vehicle is going to register
          </p>

          {/* Form Grid */}
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Row 1 */}
            <div>
              <label className="block text-sm font-medium">Ownership Type*</label>
              <select className="w-full p-2 border rounded-lg focus:ring focus:ring-green-300">
                <option>Select</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">NTN No.</label>
              <input
                type="text"
                placeholder="Enter here..."
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">CNIC No.</label>
              <input
                type="text"
                placeholder="Enter here..."
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Row 2 */}
            <div>
              <label className="block text-sm font-medium">Passport No.</label>
              <input
                type="text"
                placeholder="Enter here..."
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Name*</label>
              <input
                type="text"
                placeholder="Enter here..."
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">F/H/W/O Name</label>
              <input
                type="text"
                placeholder="Enter here..."
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Row 3 */}
            <div>
              <label className="block text-sm font-medium">Mobile Number</label>
              <input
                type="text"
                placeholder="Enter text here"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Other Phone</label>
              <input
                type="text"
                placeholder="Enter text here"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </form>

          {/* Row 4 - Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">Temporary Address</label>
              <textarea
                placeholder="Enter here..."
                className="w-full p-2 border rounded-lg"
                rows={2}
              ></textarea>
              <span className="text-xs text-gray-400">40 Characters Left</span>
            </div>
            <div>
              <label className="block text-sm font-medium">Permanent Address</label>
              <textarea
                placeholder="Enter here..."
                className="w-full p-2 border rounded-lg"
                rows={2}
              ></textarea>
              <span className="text-xs text-gray-400">40 Characters Left</span>
            </div>
          </div>

          {/* Row 5 - City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">City (Temporary Address)</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Select</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">City (Permanent Address)</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Select</option>
              </select>
            </div>
          </div>

          {/* Row 6 - District */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">District (Temporary Address)</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Select</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">District (Permanent Address)</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Select</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVehicleRegistration;
