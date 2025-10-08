import React, { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import axios from "axios";

const RaisedServiceRequests = () => {
  const [activeTab, setActiveTab] = useState("Service");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editData, setEditData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch jobs from API
  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/service-requests");

      // Map API data to table format
      const mappedJobs = response.data.map((job) => ({
        id: job.id,
        username: job.username,
        vehicleNo: job.vehicleNo,
        serviceLocation: job.serviceLocation,
        contactPerson: job.contactPerson,
        contactNumber: job.contactNumber,
        recommendedAction: job.recommendedAction || "N/A",
      }));

      setJobs(mappedJobs);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch service requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setEditData({ recommendedAction: job.recommendedAction });
    setShowEditPopup(true);
  };

  const handleEditSubmit = () => {
    // ⚠️ TODO: Add actual API call to update the job here
    console.log("Update Request:", {
      id: selectedJob.id,
      recommendedAction: editData.recommendedAction,
    });
    setShowEditPopup(false);
  };

  // Define consistent padding classes
  const headerClass = "px-4 py-3 text-left font-semibold text-gray-500 tracking-wider";
  const dataCellClass = "px-4 py-3 text-left text-gray-700 break-words";

  return (
    <div className="h-screen p-4">
      <div className="flex items-center justify-between mb-4 mt-4">
        <h1 className="text-2xl font-semibold text-gray-800"> Raised Service Request</h1>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-gray-200"> {/* Added bg-gray-50 for better visual separation */}
                  {/* Removed the empty first column, as it served no purpose */}
                  <th className={headerClass}>Username</th>
                  <th className={headerClass}>Vehicle No</th>
                  <th className={headerClass}>Service Location</th>
                  <th className={headerClass}>Contact Person</th>
                  <th className={headerClass}>Contact Number</th>
                  <th className={headerClass}>Recommended Action</th>
                  <th className={`${headerClass} w-10`}>Edit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {jobs.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="text-center py-6 text-gray-500">
                            No service requests found for this category.
                        </td>
                    </tr>
                ) : (
                    jobs.map((job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* 💥 Alignments Fixed Here */}
                        <td className={`${dataCellClass} font-medium`}>{job.username}</td>
                        <td className={dataCellClass}>{job.vehicleNo}</td>
                        <td className={dataCellClass}>{job.serviceLocation}</td>
                        <td className={dataCellClass}>{job.contactPerson}</td>
                        <td className={dataCellClass}>{job.contactNumber}</td>
                        <td className={dataCellClass}>
                          <p className="max-w-xs">{job.recommendedAction}</p> {/* Use <p> with max-width for long text control */}
                        </td>
                        <td className={`${dataCellClass} w-10`}>
                          <button
                            onClick={() => handleEditClick(job)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Popup (Kept styling consistent with table context) */}
      {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Recommended Action</h2>
            <label className="block mb-2 text-sm font-medium text-gray-700">Recommended Action</label>
            <textarea // Changed to textarea to handle potentially long text
              rows="3"
              value={editData.recommendedAction}
              onChange={(e) =>
                setEditData({ ...editData, recommendedAction: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditPopup(false)}
                className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaisedServiceRequests;