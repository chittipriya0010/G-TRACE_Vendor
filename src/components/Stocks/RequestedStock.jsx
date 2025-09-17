import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

export default function RequestedStock({ requests = [] }) {
  const navigate = useNavigate();

  // local states for filtering/sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByDate, setSortByDate] = useState(false);

  // filtered + sorted data
  const filteredRequests = useMemo(() => {
  let data = [...requests];

  if (searchTerm.trim() !== "") {
    data = data.filter((req) => {
      const productOrderStr = String(req.productOrder || "");
      const statusStr = req.status?.toLowerCase() || "";

      return (
        productOrderStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        statusStr.includes(searchTerm.toLowerCase())
      );
    });
  }

  if (sortByDate) {
    data.sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return dateB - dateA;
    });
  }

  return data;
}, [requests, searchTerm, sortByDate]);


  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Requested Stock</h1>

      {/* Top Cards + Sort Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        {/* Cards */}
        <div className="w-full md:w-[65%]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="text-sm font-medium text-gray-600">Stock</h3>
              <p className="text-2xl font-bold text-gray-900">
                350 <span className="text-sm font-normal text-black">Qty</span>
              </p>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-orange-500">
              <h3 className="text-sm font-medium text-gray-600">Delhi</h3>
              <p className="text-2xl font-bold text-gray-900">
                49 <span className="text-sm font-normal text-black">Qty</span>
              </p>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="text-sm font-medium text-gray-600">Branch</h3>
              <p className="text-2xl font-bold text-gray-900">
                200 <span className="text-sm font-normal text-black">Qty</span>
              </p>
            </div>
          </div>
        </div>

        {/* Sort Button */}
        <button
          onClick={() => setSortByDate((prev) => !prev)}
          className="mt-4 md:mt-0 flex items-center px-6 py-3 gap-2 text-sm font-medium text-cyan-800 bg-white rounded-md border border-cyan-800"
        >
          <Filter className="w-4 h-4" />{" "}
          {sortByDate ? "Sorted by Date" : "Sort By Date"}
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header Actions */}
        <div className="px-4 py-3 flex items-center justify-between border-b">
          <button className="btn-primary">Requested Stock</button>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md px-2">
              <Search className="w-5 h-5 text-gray-600" />
              <input
                type="text"
                placeholder="Search..."
                className="p-2 text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center border-collapse">
            <thead className="bg-gray-50 border-b text-gray-600 font-semibold">
              <tr>
                <th className="px-4 py-3">Order Date</th>
                <th className="px-4 py-3">Product Order</th>
                <th className="px-4 py-3">Qty Taken</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">View Details</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{req.orderDate}</td>
                    <td className="px-4 py-3">{req.productOrder}</td>
                    <td className="px-4 py-3">{req.qtyTaken}</td>
                    <td className="px-4 py-3 font-medium">₹ {req.totalAmount}</td>
                    <td className="px-4 py-3">
                      <button
                        className="text-cyan-800 bg-cyan-100 py-1 px-4 rounded-md hover:text-white hover:bg-cyan-800 font-medium text-sm cursor-pointer"
                        onClick={() =>
                          navigate(`/stocks/stock-details/${req.id}`, {
                            state: { request: req },
                          })
                        }
                      >
                        Click
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          req.status === "Pending at Admin"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-gray-500">
                    No matching requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
