import React from 'react'

const VendorDetails = () => {
    const vendor = vendors.find(v => v.id === selectedVendor);
    if (!vendor) return null;

    return (
      <div className="min-h-screen bg-gray-100">
        
        <div className="p-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="bg-teal-600 text-white px-4 py-3 flex items-center justify-between">
              <span className="font-medium">Vendor List</span>
              <div className="flex gap-2">
                <button className="bg-white text-teal-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Excel
                </button>
                <button
                  onClick={() => setCurrentView('add')}
                  className="bg-white text-teal-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50"
                >
                  Add New Vendor
                </button>
              </div>
            </div>
            
            {/* Vendor Summary Row */}
            <div className="px-4 py-3 bg-gray-50 border-b">
              <div className="grid grid-cols-6 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Vendor Name</span>
                  <div className="text-gray-900 mt-1">{vendor.name}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Product Name</span>
                  <div className="text-gray-900 mt-1">-</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Rate</span>
                  <div className="text-gray-900 mt-1">-</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Unit</span>
                  <div className="text-gray-900 mt-1">-</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Rate per unit</span>
                  <div className="text-gray-900 mt-1">-</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Action</span>
                  <div className="text-gray-900 mt-1">-</div>
                </div>
              </div>
            </div>

            {/* Main Vendor Row with Add Product Button */}
            <div className="px-4 py-3 border-b bg-white">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div>
                  <div className="text-sm font-medium text-gray-600">Vendor Name</div>
                  <div className="text-gray-900">{vendor.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Total Products</div>
                  <div className="text-gray-900">{vendor.totalProducts}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Gst. No</div>
                  <div className="text-gray-900">{vendor.gstNo}</div>
                </div>
                <div></div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Add Product</div>
                  <button
                    onClick={() => {
                      setSelectedVendor(vendor.id);
                      setShowAddProductModal(true);
                    }}
                    className="bg-orange-500 text-white w-7 h-7 rounded flex items-center justify-center hover:bg-orange-600 mt-1"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">View Details</div>
                  <button
                    onClick={() => setCurrentView('list')}
                    className="text-blue-500 hover:text-blue-700 font-medium text-sm mt-1"
                  >
                    Click
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products List */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {vendor.products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 w-1/6">{product.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 w-1/6">-</td>
                      <td className="px-4 py-3 text-sm text-gray-900 w-1/6">-</td>
                      <td className="px-4 py-3 text-sm text-gray-900 w-1/6">{product.unit}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 w-1/6">₹ {product.rate}</td>
                      <td className="px-4 py-3 w-1/6">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowEditProductModal(true);
                          }}
                          className="bg-teal-600 text-white px-4 py-1 rounded text-sm hover:bg-teal-700"
                        >
                          Update
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

export default VendorDetails