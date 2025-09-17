import React, { useState } from "react";

const NewDeviceAdditionList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    clientName: "",
    company: "",
    vehicleNo: "",
    imei: "",
    deviceType: "",
    billing: "",
  });

  const rows = [
    {
      date: "2025-06-09 11:26:27",
      clientName: "Fasttrack",
      company: "Fasttrack Pvt Ltd",
      vehicleNo: "0488NL01L",
      imei: "123456789012345",
      deviceType: "WeTrack",
      billing: "Yes",
    },
    {
      date: "2025-06-09 11:26:27",
      clientName: "John Doe",
      company: "XYZ Pvt Ltd",
      vehicleNo: "AB12CD3456",
      imei: "987654321012345",
      deviceType: "GT06N",
      billing: "No",
    },
  ];

  const handleViewDetails = (row) => {
    setSelectedRow(row);
    setFormData({ ...row });
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You could send formData to backend here
    console.log("Submitted Data:", formData);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-4">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        New Device Addition List
      </h1>

      {/* Table Container */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border-gray-200">

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
  <thead>
    <tr className="border-gray-200">
      <th className="px-4 py-4 text-left font-semibold text-gray-400">
        Date
      </th>
      <th className="px-4 py-4 text-left font-semibold text-gray-400">
        Client Name
      </th>
      <th className="px-4 py-4 text-left font-semibold text-gray-400">
        Company Name
      </th>
      <th className="px-4 py-4 text-left font-semibold text-gray-400">
        Vehicle No
      </th>
      <th className="px-4 py-4 text-left font-semibold text-gray-400">
        Device IMEI
      </th>
      <th className="px-4 py-4 text-left font-semibold text-gray-400">
        Device Type
      </th>
      <th className="px-4 py-4 text-left font-semibold text-gray-400">
        Billing
      </th>
      <th className="px-4 py-4 text-left font-semibold text-gray-400">
        View Details
      </th>
    </tr>
  </thead>
  <tbody className="bg-white">
    {rows.map((row, idx) => (
      <tr
        key={idx}
        className="border-b border-gray-100 hover:bg-gray-50"
      >
        <td className="px-4 py-4 text-gray-700">{row.date}</td>
        <td className="px-4 py-4 text-gray-800 font-medium">
          {row.clientName}
        </td>
        <td className="px-4 py-4 text-gray-700">{row.company}</td>
        <td className="px-4 py-4 text-gray-700">{row.vehicleNo}</td>
        <td className="px-4 py-4 text-gray-700">{row.imei}</td>
        <td className="px-4 py-4 text-gray-700">{row.deviceType}</td>
        <td className="px-4 py-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${
              row.billing === "Yes"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {row.billing}
          </span>
        </td>
        <td className="px-4 py-4">
          <button
            className="text-blue-600 font-medium hover:underline text-sm"
            onClick={() => handleViewDetails(row)}
          >
            View Details
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
      </div>

      {/* Popup modal as form */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 overflow-auto max-h-[90vh]"
          >
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Edit Device Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle No
                </label>
                <input
                  type="text"
                  name="vehicleNo"
                  value={formData.vehicleNo}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device IMEI
                </label>
                <input
                  type="text"
                  name="imei"
                  value={formData.imei}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Type
                </label>
                <input
                  type="text"
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Billing
                </label>
                <select
                  name="billing"
                  value={formData.billing}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default NewDeviceAdditionList;
