import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Edit, Trash2 } from "lucide-react";

const DisplayBilledInformation = ({ onSelectCompany, onEditCompany }) => {
  const [activeTab, setActiveTab] = useState("Billed");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Put companies into state so we can modify them temporarily
  const [companies, setCompanies] = useState([
    {
      id: 1,
      company: "Creative Edge",
      user: "Pooja Sharma",
      accountType: "Foc",
      noOfVehicles: 50,
      billedVehicles: 40,
      hardwareAmount: 400,
      rentAmount: 1500,
      gst: 342,
      totalAmount: 2242,
    },
    {
      id: 2,
      company: "Creative Edge",
      user: "Amar Sharma",
      accountType: "Demo",
      noOfVehicles: 100,
      billedVehicles: 80,
      hardwareAmount: 400,
      rentAmount: 1500,
      gst: 342,
      totalAmount: 2242,
    },
    {
      id: 3,
      company: "Creative Edge",
      user: "Suraj Sharma",
      accountType: "Paid",
      noOfVehicles: 200,
      billedVehicles: 150,
      hardwareAmount: 400,
      rentAmount: 1500,
      gst: 342,
      totalAmount: 2242,
    },
    {
      id: 4,
      company: "Creative Edge",
      user: "Karan Sharma",
      accountType: "Demo",
      noOfVehicles: 20,
      billedVehicles: 7,
      hardwareAmount: 400,
      rentAmount: 1500,
      gst: 342,
      totalAmount: 2242,
    },
    {
      id: 5,
      company: "Creative Edge",
      user: "Amar Sharma",
      accountType: "Paid",
      noOfVehicles: 100,
      billedVehicles: 50,
      hardwareAmount: 400,
      rentAmount: 1500,
      gst: 342,
      totalAmount: 2242,
    },
  ]);

  // Filter by search
  const filteredCompanies = companies.filter(
    (company) =>
      company.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle row click → navigate to detailed client
  const handleCompanyClick = (company) => {
    if (onSelectCompany) onSelectCompany(company);
    navigate("/sales/detailed-client");
  };

  // Handle edit click → navigate to edit page
  const handleEditClick = (company) => {
    if (onEditCompany) onEditCompany(company);
    navigate("/sales/edit-bill");
  };

  // Handle delete (temporary only)
  const handleDelete = (id) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header with tabs and search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-1">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "Pending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("Pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "Billed"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("Billed")}
          >
            Billed
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="text-gray-400">⋯</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-3 text-left">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                Company Name
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                User Name
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                Account Type
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                No of Vehicle
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                Billed Vehicle
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                Hardware Amount ₹
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                Rent Amount ₹
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                GST 18%
              </th>
              <th className="p-3 text-left font-medium text-gray-700">
                Total Amount ₹
              </th>
              <th className="p-3 text-left font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr
                key={company.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-3">
                  <input type="checkbox" className="rounded" />
                </td>
                <td
                  className="p-3 text-blue-600 cursor-pointer hover:underline"
                  onClick={() => handleCompanyClick(company)}
                >
                  {company.company}
                </td>
                <td className="p-3 text-gray-900">{company.user}</td>
                <td className="p-3 text-gray-900">{company.accountType}</td>
                <td className="p-3 text-gray-900">{company.noOfVehicles}</td>
                <td className="p-3 text-gray-900">{company.billedVehicles}</td>
                <td className="p-3 text-gray-900">
                  ₹ {company.hardwareAmount}
                </td>
                <td className="p-3 text-gray-900">₹ {company.rentAmount}</td>
                <td className="p-3 text-blue-600">₹ {company.gst}</td>
                <td className="p-3 font-medium text-blue-600">
                  ₹ {company.totalAmount}
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-1.5 hover:bg-gray-100 rounded"
                      onClick={() => handleCompanyClick(company)}
                    >
                      <FileText size={14} className="text-gray-600" />
                    </button>
                    <button
                      className="p-1.5 hover:bg-gray-100 rounded"
                      onClick={() => handleEditClick(company)}
                    >
                      <Edit size={14} className="text-gray-600" />
                    </button>
                    <button
                      className="p-1.5 hover:bg-gray-100 rounded"
                      onClick={() => handleDelete(company.id)}
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                    <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">
                      Billed
                    </button>
                    <button className="px-2 py-1 border border-gray-300 rounded text-xs">
                      PI
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredCompanies.length === 0 && (
              <tr>
                <td colSpan="11" className="text-center p-4 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayBilledInformation;
