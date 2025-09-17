import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NotWorkingVehicle = () => {
  const [clientName, setClientName] = useState("AmanBus");
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  // Sample data
  const vehicleData = [
    {
      vehicleNo: "HR55AP1788",
      imei: "0867460400614299",
      lastServiceDate: "24-Dec-2024",
      lastContactTime: "31-Dec-2024 (11:00:05:41)",
      lastServiceReason: "Device Reset",
      networkingDays: 268,
      latLong: "31.306,75.576",
      temp: "40.4",
    },
    {
      vehicleNo: "HR55AP1788",
      imei: "1194042",
      lastServiceDate: "24-Dec-2024",
      lastContactTime: "31-Dec-2024 (11:00:05:41)",
      lastServiceReason: "Device re-installed",
      networkingDays: 268,
      latLong: "31.306,75.576",
      temp: "40.4",
    },
    {
      vehicleNo: "HR55AP1788",
      imei: "355712027431536",
      lastServiceDate: "24-Dec-2024",
      lastContactTime: "31-Dec-2024 (11:00:05:41)",
      lastServiceReason: "Sim Card Problem",
      networkingDays: 268,
      latLong: "31.306,75.576",
      temp: "0.0",
    },
  ];

  const handleAddService = (vehicle) => {
    navigate("/cce/raise-service", { state: { vehicle } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Filtering for client: " + clientName);
  };

  return (
  <div className="p-4 bg-gray-50 min-h-screen">
    {/* Outer White Container */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Not Working Vehicle
      </h1>


      <div className="bg-white rounded-lg shadow-md p-4">
      {/* Client Info */}
      <div className="flex justify-between items-center mb-6">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
            placeholder="Enter client name"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        <div className="text-sm">
          <span className="font-semibold">Client: </span>Aman Bus &nbsp;&nbsp;|&nbsp;&nbsp;
          <span className="font-semibold">Branch: </span>Delhi
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-4">
        {["All Services", "Not Working Vehicles", "Service", "Device Removed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
  <tr className="border-gray-200">
    <th className="px-2 py-3 text-left font-semibold text-gray-400">
      Vehicle Reg No.
    </th>
    <th className="px-2 py-3 text-left font-semibold text-gray-400">
      IMEI
    </th>
    <th className="px-2 py-3 text-left font-semibold text-gray-400">
      Last Service Date
    </th>
    <th className="px-2 py-3 text-left font-semibold text-gray-400">
      Last Contact Time
    </th>
    <th className="px-2 py-3 text-left font-semibold text-gray-400">
      Last Service Reason
    </th>
    <th className="px-2 py-3 text-left font-semibold text-gray-400">
      Networking Days
    </th>
    <th className="px-2 py-3 text-left font-semibold text-gray-400">
      Lat Long
    </th>
    <th className="px-2 py-3 text-left font-semibold text-gray-400">
      Temperature
    </th>
    <th className="px-2 py-3 text-left font-semibold text-gray-400">
      Add Service
    </th>
  </tr>
</thead>
          <tbody className="bg-white">
            {vehicleData.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gray-50 text-gray-700"
              >
                <td className="px-1 py-3">{row.vehicleNo}</td>
                <td className="px-1 py-3">{row.imei}</td>
                <td className="px-1 py-3">{row.lastServiceDate}</td>
                <td className="px-1 py-3">{row.lastContactTime}</td>
                <td className="px-1 py-3">{row.lastServiceReason}</td>
                <td className="px-1 py-3">{row.networkingDays}</td>
                <td className="px-1 py-3 text-blue-600 underline cursor-pointer">
                  {row.latLong}
                </td>
                <td className="px-3 py-3">{row.temp}°</td>
                <td className="px-3 py-3">
                  <button
                    onClick={() => handleAddService(row)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-700"
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default NotWorkingVehicle;
