import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

// Helper component for Status badge
const StatusBadge = ({ status }) => {
  const isApproved = status === 'Approved';
  const colorClass = isApproved
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700';

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
      {status}
    </span>
  );
};

// Main Component
const ViewJob = () => {
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeJobIdForAction, setActiveJobIdForAction] = useState(null);
  const [approveCount, setApproveCount] = useState(1);

  // Fetch approved installations from backend
  const fetchInstallations = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/installations");
      // Filter only Approved installations
      const approved = res.data.filter((inst) => inst.status === "Approved");
      setInstallations(approved);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch installations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstallations();
  }, []);

  const handleSendClick = (jobId, maxCount) => {
    if (activeJobIdForAction === jobId) {
      setActiveJobIdForAction(null);
    } else {
      setActiveJobIdForAction(jobId);
      setApproveCount(maxCount);
    }
  };

  const ActionBlock = ({ jobId, vehicleCount }) => {
    const isActionActive = activeJobIdForAction === jobId;

    if (isActionActive) {
      return (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center bg-white shadow-2xl rounded-xl p-3 border border-gray-200 z-10 w-64">
          <div className="flex flex-col space-y-2 w-full">
            <label className="text-xs font-medium text-gray-700">No. of Approve Device</label>
            <input
              type="number"
              value={approveCount}
              min="1"
              max={vehicleCount}
              onChange={(e) =>
                setApproveCount(Math.min(parseInt(e.target.value) || 1, vehicleCount))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-lg transition duration-150 shadow-md"
              onClick={() => {
                console.log(`Sending ${approveCount} devices to Dispatcher for Job ${jobId}`);
                setActiveJobIdForAction(null);
              }}
            >
              Send to Dispatcher
            </button>
          </div>
        </div>
      );
    }

    return (
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-150 shadow-md"
        onClick={() => handleSendClick(jobId, vehicleCount)}
      >
        Send
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-7xl mx-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Approved Installations</h1>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[768px] lg:min-w-full inline-block align-middle">
              <div className="hidden lg:grid grid-cols-10 gap-x-4 px-6 py-3 border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <span className="col-span-2">Client Name</span>
                <span className="text-center">No. of Vehicle</span>
                <span>Location</span>
                <span>Device Model</span>
                <span className="col-span-2">Available Time</span>
                <span className="text-center">Status</span>
                <span className="text-center">Action</span>
              </div>

              {installations.map((job) => (
                <div
                  key={job.job_id}
                  className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-y-3 lg:gap-x-4 p-4 lg:p-6 border-b border-gray-100 hover:bg-blue-50 transition duration-100 items-center text-sm"
                >
                  <div className="lg:col-span-2 font-medium text-gray-800 flex items-center space-x-2">
                    <span className="lg:hidden text-xs text-gray-500 w-24 font-normal">Client Name:</span>
                    <span>{job.client_name}</span>
                  </div>
                  <div className="lg:text-center flex items-center space-x-2">
                    <span className="lg:hidden text-xs text-gray-500 w-24 font-normal">No. of Vehicle:</span>
                    <span className="font-medium text-gray-700">{job.admin_no_of_installations || job.no_of_installations}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="lg:hidden text-xs text-gray-500 w-24 font-normal">Location:</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="lg:hidden text-xs text-gray-500 w-24 font-normal">Device Model:</span>
                    <span>{job.installed_solution_type}</span>
                  </div>
                  <div className="lg:col-span-2 flex items-center space-x-2">
                    <span className="lg:hidden text-xs text-gray-500 w-24 font-normal">Available Time:</span>
                    <span className="text-gray-600">{new Date(job.available_time).toLocaleString()}</span>
                  </div>
                  <div className="lg:text-center flex items-center space-x-2">
                    <span className="lg:hidden text-xs text-gray-500 w-24 font-normal">Status:</span>
                    <StatusBadge status={job.status} />
                  </div>
                  <div className="lg:text-center relative flex items-center space-x-2 lg:space-x-0">
                    <span className="lg:hidden text-xs text-gray-500 w-24 font-normal">Action:</span>
                    <ActionBlock jobId={job.job_id} vehicleCount={job.admin_no_of_installations || job.no_of_installations} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewJob;