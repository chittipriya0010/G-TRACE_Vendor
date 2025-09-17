import React, { useState } from "react";
import { Edit2, X } from "lucide-react";

const ViewJob = () => {
  const [activeTab, setActiveTab] = useState("Installation");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // for View Details
const [editData, setEditData] = useState(null); // for Edit small popup
  const [approveVehicles, setApproveVehicles] = useState("");

  const jobs = [
    {
      client: "Cttpl",
      vehicles: 10,
      location: "Noida Sec 63",
      device: "WeTrack",
      time: "12:00 PM 27 Jan 2025",
      status: "Approved by Admin",
      statusType: "success",
    },
    {
      client: "Snfget",
      vehicles: 5,
      location: "Sarita Vihar",
      device: "Pointer",
      time: "03:00 PM 22 Jun 2022",
      status: "Back Form Admin",
      statusType: "error",
    },
    {
      client: "Balasub3",
      vehicles: 3,
      location: "Gurgaon",
      device: "Others",
      time: "12:00 PM 23 Jan 2025",
      status: "Approved by Admin",
      statusType: "success",
    },
    {
      client: "Amobus",
      vehicles: 2,
      location: "Mumbai",
      device: "WeTrack",
      time: "05:00 PM 23 Jun 2025",
      status: "Approved by Admin",
      statusType: "success",
    },
  ];

  const handleOpenEdit = (job) => {
  setEditData({
    approveVehicles: job.vehicles || ""   // prefill if needed
  });
  setShowEditPopup(true);
};

  const handleEditClick = (job) => {
  setSelectedJob(job);
  setEditData({
    approveVehicles: job.vehicles || ""  // pre-fill field
  });
  setShowEditPopup(true);
};

  const handleViewDetailsClick = (job) => {
    setSelectedJob(job);
    setShowDetailsPopup(true);
  };

  const handleEditSubmit = () => {
    console.log("Send to Dispatcher:", {
      client: selectedJob.client,
      approveVehicles,
    });
    setShowEditPopup(false);
  };

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
  <div className="bg-white rounded-lg shadow-md p-4">
    {/* Header + Tabs in one row */}
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold text-gray-800">View Job</h1>

      <div className="flex space-x-2">
        {["Installation", "Service", "Removal"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>

      {/* Table Container */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-gray-200">
                <th className="px-2 py-2 text-left font-semibold text-gray-700 w-8">
                  {/* <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  /> */}
                </th>
                <th className="px-1 py-4 text-left font-semibold text-gray-400">
                  Client Name
                </th>
                <th className="px-1 py-4 text-left font-semibold text-gray-400">
                  No. of Vehicle
                </th>
                <th className="px-1 py-4 text-left font-semibold text-gray-400">
                  Location
                </th>
                <th className="px-1 py-4 text-left font-semibold text-gray-400">
                  Device Model
                </th>
                <th className="px-1 py-4 text-left font-semibold text-gray-400">
                  Available Time
                </th>
                <th className="px-1 py-4 text-left font-semibold text-gray-400">
                  Status
                </th>
                <th className="px-1 py-4 text-left font-semibold text-gray-400">
                  View Details
                </th>
                <th className="px-1 py-4 text-left font-semibold text-gray-400">
                  Edit
                </th>
                <th className="px-1 py-4 text-left font-semibold text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {jobs.map((job, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-2 py-2">
                    {/* <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    /> */}
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {job.client}
                  </td>
                  <td className="px-2 py-4 text-gray-700">{job.vehicles}</td>
                  <td className="px-2 py-4 text-gray-700">{job.location}</td>
                  <td className="px-2 py-4 text-gray-700">{job.device}</td>
                  <td className="px-2 py-4 text-gray-700">{job.time}</td>
                  <td className="px-2 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${
                        job.statusType === "success"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 font-medium hover:underline text-sm"
                      onClick={() => handleViewDetailsClick(job)}
                    >
                      View Details
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditClick(job)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                      Send
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Popup */}
      {showDetailsPopup && selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowDetailsPopup(false)}
          />

          {/* Modal */}
          <div className="bg-white rounded-lg shadow-xl z-50 w-full max-w-md relative">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Job Details
              </h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowDetailsPopup(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-sm text-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={selectedJob.client}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. of Vehicles
                </label>
                <input
                  type="number"
                  name="vechicles"
                  value={selectedJob.vechicles}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={selectedJob.location}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model Device
                </label>
                <input
                  type="text"
                  name="device"
                  value={selectedJob.device}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Time
                </label>
                <input
                  type="text"
                  name="time"
                  value={selectedJob.time}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${
                    selectedJob.statusType === "success"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {selectedJob.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Popup */}
{showDetailsPopup && selectedJob && (
  <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/50"
      onClick={() => setShowDetailsPopup(false)}
    />

    {/* Modal */}
    <div className="bg-white rounded-lg shadow-xl z-50 w-full max-w-md relative">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Job Details</h2>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={() => setShowDetailsPopup(false)}
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 text-sm text-gray-700">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name
          </label>
          <input
            type="text"
            value={selectedJob.client}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            No. of Vehicles
          </label>
          <input
            type="text"
            value={selectedJob.vehicles}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={selectedJob.location}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Device Model
          </label>
          <input
            type="text"
            value={selectedJob.device}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Available Time
          </label>
          <input
            type="text"
            value={selectedJob.time}
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
          />
        </div>
        <div>
          <strong>Status:</strong>{" "}
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${
              selectedJob.statusType === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {selectedJob.status}
          </span>
        </div>
      </div>
    </div>
  </div>
)}

{/* Edit Job Popup (Small) */}
{showEditPopup && editData && (
  <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/50"
      onClick={() => setShowEditPopup(false)}
    />

    {/* Modal */}
    <div className="bg-white rounded-xl shadow-xl z-50 w-full max-w-sm relative">
      {/* Header */}
      <div className="flex items-center justify-center px-6 py-4 border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Edit Job</h2>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={() => setShowEditPopup(false)}
        >
          <X size={20} />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditSubmit(editData);
        }}
        className="p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            No. of Approved Devices
          </label>
          <input
            type="number"
            value={editData.approveVehicles}
            onChange={(e) =>
              setEditData({ ...editData, approveVehicles: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter approved devices"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-gray-200">
          <button
            type="button"
            onClick={() => setShowEditPopup(false)}
            className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Send to Dispatcher
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
    </div>
  );
};

export default ViewJob;
