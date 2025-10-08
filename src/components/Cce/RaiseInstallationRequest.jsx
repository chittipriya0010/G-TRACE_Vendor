import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const RaiseInstallationRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientName, solutionType, packageId } = location.state || {};

  const [noOfInstallations, setNoOfInstallations] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!noOfInstallations) {
      alert("Please enter number of installations");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/cce-requests", {
        packageId,
        clientName,
        solutionType,
        noOfInstallations,
      });
      alert("Request raised successfully!");
      navigate("/view-client-requests"); // Back to list
    } catch (error) {
      console.error(error);
      alert("Failed to raise request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Raise Request for Installation</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Client Name</label>
        <input
          type="text"
          value={clientName}
          readOnly
          className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Solution Type</label>
        <input
          type="text"
          value={solutionType}
          readOnly
          className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">No of Installations</label>
        <input
          type="number"
          value={noOfInstallations}
          onChange={(e) => setNoOfInstallations(e.target.value)}
          placeholder="Enter number of installations"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </div>
  );
};

export default RaiseInstallationRequest;