import React, { useState } from "react";
import { Edit2, X } from "lucide-react";

const ViewJob = () => {
  const [activeTab, setActiveTab] = useState("Installation");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
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

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setApproveVehicles(job.vehicles); // pre-fill with job vehicles
    setShowPopup(true);
  };

  const handleSubmit = () => {
    console.log("Send to Dispatcher:", {
      client: selectedJob.client,
      approveVehicles,
    });
    setShowPopup(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Job</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
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

      {/* Table Container */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left font-semibold text-gray-700 w-8">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Client Name</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">No. of Vehicle</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Device Model</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Available Time</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">View Details</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Edit</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {jobs.map((job, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{job.client}</td>
                  <td className="px-6 py-4 text-gray-700">{job.vehicles}</td>
                  <td className="px-6 py-4 text-gray-700">{job.location}</td>
                  <td className="px-6 py-4 text-gray-700">{job.device}</td>
                  <td className="px-6 py-4 text-gray-700">{job.time}</td>
                  <td className="px-6 py-4">
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
                    <button className="text-blue-600 font-medium hover:underline text-sm">
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

      {/* Edit Job Popup */}
      {showPopup && selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowPopup(false)}
          />
          
          {/* Modal */}
          <div className="bg-white rounded-lg shadow-xl z-50 w-full max-w-md relative">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Edit Job</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowPopup(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No. of Approve Vehicles
                </label>
                <input
                  type="number"
                  value={approveVehicles}
                  onChange={(e) => setApproveVehicles(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter number of vehicles"
                />
              </div>
              
              {/* Action Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
                >
                  Send to Dispatcher
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewJob;