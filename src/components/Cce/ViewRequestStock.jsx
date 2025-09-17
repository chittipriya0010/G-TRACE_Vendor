import React, { useState } from "react";

const rows = [
  {
    productName: "GPS",
    qty: 5,
    client: "New",
    requiredBy: "Prabhakar",
    location: "Mumbai",
    status: "No",
    productionDescQty: { "AC Wiring": 5, Sim: 2, Marker: 1, "Big Tie": 2 },
  },
  {
    productName: "E-lock",
    qty: 9,
    client: "Old",
    requiredBy: "Prabhakar",
    location: "Kolkata",
    status: "Yes",
    productionDescQty: { "AC Wiring": 5, Sim: 1, Marker: 1, "Big Tie": 2 },
  },
  {
    productName: "E-lock",
    qty: 2,
    client: "New",
    requiredBy: "Prabhakar",
    location: "Delhi",
    status: "No",
    productionDescQty: { "AC Wiring": 5, Sim: 2, Marker: 1, "Big Tie": 2 },
  },
  {
    productName: "GPS",
    qty: 10,
    client: "Old",
    requiredBy: "Prabhakar",
    location: "Mumbai",
    status: "Yes",
    productionDescQty: { "AC Wiring": 5, Sim: 1, Marker: 1, "Big Tie": 2 },
  },
  {
    productName: "E-lock",
    qty: 5,
    client: "New",
    requiredBy: "Prabhakar",
    location: "Delhi",
    status: "Yes",
    productionDescQty: { "AC Wiring": 5, Sim: 1, Marker: 1, "Big Tie": 2 },
  },
  {
    productName: "GPS",
    qty: 39,
    client: "Old",
    requiredBy: "Prabhakar",
    location: "Delhi",
    status: "No",
    productionDescQty: { "AC Wiring": 5, Sim: 1, Marker: 1, "Big Tie": 2 },
  },
  {
    productName: "E-lock",
    qty: 27,
    client: "New",
    requiredBy: "Prabhakar",
    location: "Delhi",
    status: "No",
    productionDescQty: { "AC Wiring": 5, Sim: 2, Marker: 1, "Big Tie": 2 },
  },
];

const ViewStockRequest = () => {
  const [showDescPopup, setShowDescPopup] = useState(null);
  const [approvedRows, setApprovedRows] = useState(() =>
    Array(rows.length).fill(false)
  );

  const toggleDescPopup = (index) => {
    setShowDescPopup((prev) => (prev === index ? null : index));
  };

  const approveRow = (index) => {
    setApprovedRows((prev) => {
      const newArr = [...prev];
      newArr[index] = true;
      return newArr;
    });
  };

  // Helper function to get the main description text for display
  const getMainDescriptionText = (productionDescQty) => {
    const firstEntry = Object.entries(productionDescQty)[0];
    return firstEntry ? `${firstEntry[0]} / ${firstEntry[1]}` : '';
  };

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Stock Request</h1>
      <div className="bg-white rounded-lg shadow-md p-4">

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border-gray-200">
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-gray-200">
                <th className="px-6 py-4 text-left font-semibold text-gray-700 w-8">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-400">Product Name</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-400">Qty</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-400">Client</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-400">Required By</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-400">Location</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-400">Product Description/Qty</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 relative">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{row.productName}</td>
                  <td className="px-6 py-4 text-gray-700">{row.qty}</td>
                  <td className="px-6 py-4 text-gray-700">{row.client}</td>
                  <td className="px-6 py-4 text-gray-700">{row.requiredBy}</td>
                  <td className="px-6 py-4 text-gray-700">{row.location}</td>
                  <td className="px-6 py-4 text-gray-700">{row.status}</td>
                  <td className="px-6 py-4 relative">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-700 text-sm">
                        {getMainDescriptionText(row.productionDescQty)}
                      </span>
                      <button
                        type="button"
                        className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                        onClick={() => toggleDescPopup(idx)}
                      >
                        View All
                      </button>
                    </div>
                    {showDescPopup === idx && (
                      <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm z-20 w-48 top-12 left-0">
                        <div className="space-y-2">
                          {Object.entries(row.productionDescQty).map(([desc, qty]) => (
                            <div key={desc} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                              <span className="text-gray-700">{desc}</span>
                              <span className="text-gray-900 font-medium">{qty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {approvedRows[idx] ? (
                      <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 text-green-700 border border-green-200 text-sm font-medium">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Approved
                      </span>
                    ) : (
                      <button
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                        onClick={() => approveRow(idx)}
                      >
                        Approve
                      </button>
                    )}
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

export default ViewStockRequest;