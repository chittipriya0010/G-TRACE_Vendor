import React, { useState } from "react";
import { X } from "lucide-react";

const DeleteList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const rows = [
    {
      date: "2025-06-09 11:26:27",
      username: "Fasttrack",
      company: "Fasttrack Pvt Ltd",
      vehicleNo: "0488NL01L",
      deviceModel: "WeTrack",
      imei: "123456789012345",
      sim: "9876543210",
      location: "gtrack office",
      status: "StopGPS",
      reason: "Sold Vehicle (on client request)",
      dateOfInstallation: "2023-05-12",
      statusType: "error",
    },
    {
      date: "2025-06-09 11:26:27",
      username: "Fasttrack",
      vehicleNo: "0488NL01L",
      imei: "123456789012345",
      sim: "9876543210",
      location: "gtrack office",
      status: "SoldVehicle",
      reason: "on client request",
      statusType: "error", // for red styling like your status
    },
  ];

  const handleViewDetails = (row) => {
    setSelectedRow(row);
    setShowPopup(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-4">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Deletion List
      </h1>

      {/* Table Container */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border-gray-200">
        
        <div className="">
          <table className="w-full text-sm border-collapse">
  <thead>
    <tr className="border-gray-200">
      <th className="px-1 py-4 text-center font-semibold text-gray-400">Date</th>
      <th className="px-1 py-4 text-center font-semibold text-gray-400">Username</th>
      <th className="px-1 py-4 text-center font-semibold text-gray-400">Vehicle No</th>
      <th className="px-1 py-4 text-center font-semibold text-gray-400">Device IMEI</th>
      <th className="px-1 py-4 text-center font-semibold text-gray-400">Device Sim</th>
      <th className="px-1 py-4 text-center font-semibold text-gray-400">Current Location</th>
      <th className="px-1 py-4 text-center font-semibold text-gray-400">Device Status</th>
      <th className="px-1 py-4 text-center font-semibold text-gray-400">Reason</th>
      <th className="pr-1 py-4 text-center font-semibold text-gray-400">View Details</th>
    </tr>
  </thead>
  <tbody className="bg-white">
    {rows.map((row, idx) => (
      <tr
        key={idx}
        className="border-b border-gray-100 hover:bg-gray-50"
      >
        <td className="px-1 py-4 text-gray-700 text-center">{row.date}</td>
        <td className="px-1 py-4 text-gray-800 font-medium text-center">
          {row.username}
        </td>
        <td className="px-1 py-4 text-gray-700 text-center">{row.vehicleNo}</td>
        <td className="px-1 py-4 text-gray-700 text-center">{row.imei}</td>
        <td className="px-1 py-4 text-gray-700 text-center">{row.sim}</td>
        <td className="px-1 py-4 text-gray-700 text-center">{row.location}</td>
        <td className="px-1 py-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${
              row.statusType === "error"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-green-50 text-green-700 border-green-200"
            }`}
          >
            {row.status}
          </span>
        </td>
        <td className="px-6 py-4 text-gray-700">{row.reason}</td>
        <td className="pr-10 py-4">
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

      {/* Popup Form */}
      {showPopup && selectedRow && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowPopup(false)}
          />

          {/* Modal */}
          <div className="bg-white rounded-lg shadow-xl z-50 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-lg font-semibold text-gray-800">Delete Vehicle</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowPopup(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-4">
              {/* Form Fields */}
              <div className="space-y-4">
                {/* Client User Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client User Name <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select One</option>
                    <option selected>{selectedRow.username}</option>
                  </select>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedRow.company || ''}
                    readOnly
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                  />
                </div>

                {/* Vehicle No */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle No <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select Vehicle No</option>
                    <option selected>{selectedRow.vehicleNo}</option>
                  </select>
                </div>

                {/* Device Model */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Device Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedRow.deviceModel || ''}
                    readOnly
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                  />
                </div>

                {/* Device IMEI */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Device IMEI <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedRow.imei}
                    readOnly
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                  />
                </div>

                {/* Device Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Device Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={selectedRow.sim}
                    readOnly
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                  />
                </div>

                {/* Date of Installation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Installation <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={selectedRow.dateOfInstallation || 'DD/MM/YYYY'}
                      readOnly
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Present Status of device Section */}
              <div className="mt-6">
                <h3 className="text-base font-semibold text-gray-800 mb-4 border-t pt-4">
                  Present Status of device
                </h3>
                
                <div className="space-y-4">
                  {/* Device Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Device Status <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                      <option>Select One</option>
                      <option selected>{selectedRow.status}</option>
                    </select>
                  </div>

                  {/* Device Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Device Location <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                      <option>Select One</option>
                      <option selected>{selectedRow.location}</option>
                    </select>
                  </div>

                  {/* Deactivation of SIM */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deactivation of SIM <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center space-x-6">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="simDeactivation" 
                          value="Yes" 
                          className="mr-2 text-blue-600 border-gray-300 focus:ring-blue-500" 
                        />
                        <span className="text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="simDeactivation" 
                          value="No" 
                          className="mr-2 text-blue-600 border-gray-300 focus:ring-blue-500" 
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Deletion Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deletion date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="3"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      defaultValue={selectedRow.reason}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default DeleteList;