import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotWorkingVehicle = () => {
  const [clientName, setClientName] = useState("AmanBus");
  const [activeTab, setActiveTab] = useState("Not Working Vehicles");
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
    }
  ];

  const handleAddService = (vehicle) => {
    navigate("/cce/raise-service");
  };

  const handleSubmit = () => {
    console.log("Filtering for client:", clientName);
  };
  
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
  {/* Heading */}
  <h1 className="text-2xl font-bold text-gray-800">
    Not Working Vehicle
  </h1>

  {/* Tabs */}
  <div className="rounded-lg flex space-x-2">
    {["All Services", "Not Working Vehicles", "Service", "Device Removed"].map(
      (tab) => (
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
      )
    )}
  </div>
</div>

      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700">Client Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter client name"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">Client:</span> Aman Bus
            <span className="mx-2">|</span>
            <span className="font-medium text-blue-600">Branch:</span> Delhi
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg overflow-hidden border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-gray-400">
                  <th className="px-1 py-4 text-center font-semibold text-gray-400">
                    Vehicle Reg No.
                  </th>
                  <th className="px-1 py-4 text-center font-semibold text-gray-400">
                    IMEI
                  </th>
                  <th className="px-1 py-4 text-center font-semibold text-gray-400">
                    Last Service Date
                  </th>
                  <th className="px-1 py-4 text-center font-semibold text-gray-400">
                    Last Contact Time
                  </th>
                  <th className="px-1 py-4 text-center font-semibold text-gray-400">
                    Last Service Reason
                  </th>
                  <th className="px-1 py-4 text-center font-semibold text-gray-400">
                    Networking Days
                  </th>
                  <th className="px-1 py-4 text-center font-semibold text-gray-400">
                    Lat Long
                  </th>
                  <th className="px-1 py-4 text-center font-semibold text-gray-400">
                    Temperature
                  </th>
                  <th className="px-1 py-4 text-center font-semibold text-gray-400">
                    Add Service
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {vehicleData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-center text-gray-800 font-medium">{row.vehicleNo}</td>
                    <td className="px-2 py-4 text-center text-gray-700">{row.imei}</td>
                    <td className="px-2 py-4 text-center text-gray-700">{row.lastServiceDate}</td>
                    <td className="px-2 py-4 text-center text-gray-700">{row.lastContactTime}</td>
                    <td className="px-2 py-4 text-center text-gray-700">{row.lastServiceReason}</td>
                    <td className="px-2 py-4 text-center text-gray-700">{row.networkingDays}</td>
                    <td className="px-2 py-4 text-center text-blue-600 font-medium hover:underline cursor-pointer">
                      {row.latLong}
                    </td>
                    <td className="px-2 py-4 text-gray-700">{row.temp}°</td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => handleAddService(row)}
                        className="w-[50px] h-[27px] rounded-lg bg-blue-600 text-center text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
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
    </div>
  );
};

export default NotWorkingVehicle;