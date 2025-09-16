import React from 'react';
import { Search, Edit, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
  // Sample data for the table
  const tableData = [
    {
      company: 'CreativeEdge Pvt Ltd',
      user: 'Pooja Sharma',
      clients: 50,
      hardware: '₹400',
      rent: '₹800',
      gst: '7%',
      total: '₹2204',
      status: 'Billed'
    },
    {
      company: 'BrightWave Pvt Ltd',
      user: 'Amar Sharma',
      clients: 100,
      hardware: '₹600',
      rent: '₹800',
      gst: '7%',
      total: '₹2202',
      status: 'Billed'
    },
    {
      company: 'EcoReach Pvt Ltd',
      user: 'Suraj Sharma',
      clients: 200,
      hardware: '₹400',
      rent: '₹800',
      gst: '7%',
      total: '₹2242',
      status: 'Billed'
    },
    {
      company: 'EcoReach Pvt Ltd',
      user: 'Karan Sharma',
      clients: 20,
      hardware: '₹400',
      rent: '₹800',
      gst: '7%',
      total: '₹2242',
      status: 'Billed'
    }
  ];

   const handleEditClick = () => {
    navigate("/sales/edit-bill");
  };

  return (
    <div className="flex-1 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Gross sales</span>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">500</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">New sales</span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">10</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">No of clients</span>
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">70</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Product sold</span>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">150</div>
        </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Sale Status</h3>
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="10" fill="none" />
                {/* Orange segment (45%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#f97316"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${45 * 2.51} 251.2`}
                  strokeDashoffset="0"
                />
                {/* Blue segment (15%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${15 * 2.51} 251.2`}
                  strokeDashoffset={`-${45 * 2.51}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-gray-600 text-sm">All</span>
                <span className="text-2xl font-bold">Sales</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Gross sales</span>
              </div>
              <span className="text-sm font-semibold">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New sales</span>
              </div>
              <span className="text-sm font-semibold">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Product sold</span>
              </div>
              <span className="text-sm font-semibold">40%</span>
            </div>
          </div>
        </div>
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Sale Analytics</h3>
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2 px-4">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                points="20,160 60,120 100,140 140,100 180,80 220,60 260,40 300,80 340,60 380,40"
              />
              <circle cx="20" cy="160" r="4" fill="#3b82f6" />
              <circle cx="60" cy="120" r="4" fill="#3b82f6" />
              <circle cx="100" cy="140" r="4" fill="#3b82f6" />
              <circle cx="140" cy="100" r="4" fill="#3b82f6" />
              <circle cx="180" cy="80" r="4" fill="#3b82f6" />
              <circle cx="220" cy="60" r="4" fill="#3b82f6" />
              <circle cx="260" cy="40" r="4" fill="#3b82f6" />
              <circle cx="300" cy="80" r="4" fill="#3b82f6" />
              <circle cx="340" cy="60" r="4" fill="#3b82f6" />
              <circle cx="380" cy="40" r="4" fill="#3b82f6" />
            </svg>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
      </div>
      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:text-gray-800">Pending</button>
            <button className="text-blue-600 border-b-2 border-blue-600 pb-1">Billed</button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Company Name</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">User Name</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">No of clients</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Hardware Amount</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Rent Amount</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">GST %</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Total Amount</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Edit</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">PI</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Billed</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Buy PI</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-900">{row.company}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{row.user}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{row.clients}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{row.hardware}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{row.rent}</td>
                  <td className="py-4 px-6">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      {row.gst}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{row.total}</td>
                  <td className="py-4 px-6">
                    <Edit 
                    className="w-4 h-4 text-blue-500 cursor-pointer"
                    onClick={handleEditClick} />
                  </td>
                  <td className="py-4 px-6">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs">PI</button>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs">Buy PI</button>
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

export default Dashboard;