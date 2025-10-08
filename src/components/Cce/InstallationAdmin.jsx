import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { CheckCircle, XCircle, Edit3, RotateCcw } from "lucide-react"; // Save icon is no longer directly used

// Helper function for status badge styling (No change)
const getStatusBadge = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Closed": // Assuming "Closed" means "Rejected"
      return "bg-red-100 text-red-800";
    case "Pending":
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

const InstallationAdmin = () => {
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingJobId, setEditingJobId] = useState(null);
  const [adminCount, setAdminCount] = useState("");

  // Function to filter data to show only the LATEST entry per client_id
  const filterLatestRequests = (data) => {
    const latestRequests = {};

    // Assuming the data is already sorted by job_id DESC (as per your fetch logic)
    // If not, you might need to sort it here before iterating.
    // Given your API returns it sorted, the first one encountered is the latest.

    data.forEach((inst) => {
      // If the client_id is not yet in our map, add it.
      // Since we assume the array is sorted descending by job_id (latest first),
      // the first one we find for a client_id will be the LATEST request.
      if (!latestRequests[inst.client_id]) {
        latestRequests[inst.client_id] = inst;
      }
    });

    // Convert the map values back to an array
    return Object.values(latestRequests);
  };

  // Fetch all installations (Modified to include filtering)
  const fetchInstallations = async () => {
    setLoading(true);
    setError("");
    try {
      // 1. Fetch data from API
      // Note: For best results, ensure your backend sorts by job_id DESC
      const res = await axiosInstance.get("/installations");
      
      // 2. Filter to show only the latest request per client_id
      const filteredData = filterLatestRequests(res.data);
      
      setInstallations(filteredData);
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

  // Start editing (No change)
  const startEditingCount = (installation) => {
    setEditingJobId(installation.job_id);
    setAdminCount(installation.admin_no_of_installations || installation.no_of_installations || "");
  };

  // Handle direct Approve/Reject actions (No Change in Logic)
  const handleAction = async (job_id, status, currentAdminCount) => {
    if (editingJobId === job_id) {
        alert("Please save the approved installation count before approving or rejecting.");
        return;
    }

    const finalAdminCount = status === "Approved" ? 
                            (currentAdminCount || installations.find(i => i.job_id === job_id)?.no_of_installations || 1)
                            : null;

    if (status === "Approved" && (!finalAdminCount || parseInt(finalAdminCount) <= 0)) {
        alert("A valid approved count (> 0) is required for approval. Please edit and save the count first.");
        return;
    }

    // Note: Your status "Closed" is used for "Rejected" in the front-end logic.
    if (status === "Closed" && !window.confirm("Are you sure you want to REJECT this request?")) {
        return;
    }
    
    const formData = {
        admin_no_of_installations: finalAdminCount,
        status: status,
    };

    try {
      await axiosInstance.put(`/installations/admin/${job_id}`, formData);
      alert(`Installation request ${status} successfully!`);
      setEditingJobId(null);
      fetchInstallations();
    } catch (err) {
      console.error(err);
      alert(`Failed to ${status.toLowerCase()} installation`);
    }
  };
  
  // Submit the Admin Count change only (No change in logic)
  const handleSubmitCount = async (job_id) => {
      if (!adminCount || parseInt(adminCount) <= 0) {
          alert("Please enter a valid number of installations (> 0).");
          return;
      }
      
      const formData = {
          admin_no_of_installations: adminCount,
      };

      try {
          await axiosInstance.put(`/installations/admin/${job_id}`, formData);
          alert("Approved installation count updated successfully! You can now approve the request.");
          setEditingJobId(null); 
          fetchInstallations();
      } catch (err) {
          console.error(err);
          alert("Failed to update approved installation count.");
      }
  };

  return (
    // ... (rest of the component structure remains largely the same)
    <div className="p-4 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Installation Approval Dashboard 🛠️
        </h1>
        <button
            onClick={fetchInstallations}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition-colors disabled:bg-gray-400"
            disabled={loading}
        >
            <RotateCcw size={16} className={loading ? "animate-spin" : ""} />
            <span>{loading ? "Refreshing..." : "Refresh Data"}</span>
        </button>
      </div>

      {error ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">{error}</div>
      ) : (
        <div className="bg-white shadow rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Client Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Solution Type</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">Requested</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">Admin Approved</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {installations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500 text-sm">
                    No installation requests found.
                  </td>
                </tr>
              ) : (
                installations.map((inst) => {
                  const isEditing = editingJobId === inst.job_id;
                  
                  // NEW: Determine if the count is locked from editing
                  const isLocked = inst.status === "Approved" || inst.status === "Closed";

                  return (
                    <tr key={inst.job_id} className={`hover:bg-gray-50 transition-all`}>
                      
                      {/* Client Name */}
                      <td className="px-4 py-3 font-medium text-gray-700">{inst.client_name}</td>
                      {/* Solution Type */}
                      <td className="px-4 py-3 text-gray-600">{inst.installed_solution_type}</td>
                      {/* Requested Installations (User Count) */}
                      <td className="px-4 py-3 text-center font-bold text-gray-800">{inst.no_of_installations}</td>

                      {/* Editable admin_no_of_installations (Admin Count) */}
                      <td className="px-4 py-3 text-center flex items-center justify-center space-x-2">
                        {isEditing && !isLocked ? ( // Check if editing AND not locked
                          <>
                            <input
                              type="number"
                              min="0"
                              className="border border-orange-300 p-1 w-24 rounded-md text-center focus:ring-orange-500 focus:border-orange-500"
                              value={adminCount}
                              onChange={(e) => setAdminCount(e.target.value)}
                            />
                            <button
                              className="text-orange-600 hover:text-orange-800 transition-colors"
                              onClick={() => handleSubmitCount(inst.job_id)}
                              title="Save Approved Count"
                            >
                              <span className="font-semibold">Save</span>
                            </button>
                            {/* Allow canceling the count edit */}
                            <button
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={() => setEditingJobId(null)}
                                title="Cancel Edit"
                            >
                                <XCircle size={18} />
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className={`font-bold text-lg ${isLocked ? 'text-gray-600' : 'text-orange-700'}`}>
                              {inst.admin_no_of_installations || "—"}
                            </span>
                            {/* Show edit button ONLY if status is Pending AND not currently editing */}
                            {inst.status === "Pending" && !isEditing && (
                                <button
                                    className="text-gray-400 hover:text-orange-500 transition-colors"
                                    onClick={() => startEditingCount(inst)}
                                    title="Edit Approved Count"
                                >
                                    <Edit3 size={16} />
                                </button>
                            )}
                            {/* Display lock icon or text if it's Approved/Closed */}
                            {isLocked && (
                                <span className="text-gray-400 text-xs">(Locked)</span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(inst.status)}`}
                        >
                          {inst.status}
                        </span>
                      </td>

                      {/* Actions (Approve/Reject Icons) */}
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {/* Only show action buttons if status is Pending AND NOT currently editing the count */}
                        {inst.status === "Pending" && !isEditing ? (
                          <div className="flex justify-center space-x-3">
                            {/* Approve Button */}
                            <button
                              className="text-green-500 hover:text-green-600 transition-colors p-2 rounded-full hover:bg-green-50"
                              onClick={() => handleAction(inst.job_id, "Approved", inst.admin_no_of_installations || inst.no_of_installations)}
                              title="Approve Request"
                            >
                              <CheckCircle size={20} />
                            </button>
                            {/* Reject Button */}
                            <button
                              className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                              onClick={() => handleAction(inst.job_id, "Closed", null)}
                              title="Reject Request"
                            >
                              <XCircle size={20} />
                            </button>
                          </div>
                        ) : isEditing ? (
                            <span className="text-sm text-orange-500 font-medium">Save count first.</span>
                        ) : (
                          <span className="text-gray-400 text-sm italic">
                            Action Taken
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InstallationAdmin;