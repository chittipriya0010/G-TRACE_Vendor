import { Edit, SquarePlus } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const VendorList = ({ vendors, setSelectedVendor, setShowAddProductModal, handleAddProduct }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className='text-3xl font-bold text-black-100 pb-6'>Vendor</h1>
      <div>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="text-black-100 px-4 py-3 flex items-center justify-between">
            <button className="bg-cyan-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-900 cursor-pointer">
              Vendor List
            </button>
            <button
              onClick={() => navigate('/vendors/add')}
              className="bg-white text-cyan-800 px-4 py-2 border border-cyan-800 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Add New Vendor
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-sm">Vendor Name</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-sm">Total Products</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-sm">Gst. No</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-sm">Edit Price</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-sm">Add Product</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600 text-sm">View Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50 text-center">
                    <td className="px-4 py-3 text-sm text-gray-900">{vendor.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{vendor.totalProducts}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{vendor.gstNo}</td>
                    <td className="px-4 py-3">
                      <button className="text-cyan-800 hover:text-cyan-900 cursor-pointer">
                        <Edit className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="px-4 py-3 flex justify-center">
                      <button
                        onClick={() => {
                          setSelectedVendor(vendor.id);
                          setShowAddProductModal(true);
                        }}
                        className="rounded flex items-center justify-center cursor-pointer"
                      >
                        <SquarePlus className="w-6 h-6 text-orange-400" />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/vendors/${vendor.id}`)}
                        className="text-cyan-800 bg-cyan-100 py-1 px-4 rounded-md hover:text-white hover:bg-cyan-800 font-medium text-sm cursor-pointer"
                      >
                        Click
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
  )
}

export default VendorList;