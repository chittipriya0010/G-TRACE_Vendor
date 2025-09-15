import { useParams, useNavigate } from 'react-router-dom';
import { Upload, SquarePlus } from 'lucide-react';

const VendorDetails = ({ vendors, setShowAddProductModal, setShowEditProductModal, setEditingProduct, setSelectedVendor }) => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const vendor = vendors.find(v => v.id === parseInt(vendorId));

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-gray-600">Vendor not found</p>
          <button
            onClick={() => navigate('/vendors')}
            className="mt-4 bg-cyan-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-cyan-900"
          >
            Back to Vendor List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className='text-3xl font-bold text-black-100 pb-6'>Vendor</h1>

        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="bg-cyan-800 text-white px-4 py-3 flex items-center justify-between">
            <span className="font-medium">Product List</span>
            <div className="flex gap-2">
              <button className="btn-secondary flex">
                <Upload className="w-4 h-4" />
                Upload Excel
              </button>
              <button
                onClick={() => navigate('/vendors')}
                className="btn-secondary"
              >
                Back to List
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
                <span className="font-medium text-gray-600">Phone</span>
                <div className="text-gray-900 mt-1">{vendor.phone}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">GST No</span>
                <div className="text-gray-900 mt-1">{vendor.gstNo}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">PAN No</span>
                <div className="text-gray-900 mt-1">{vendor.panNo}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Total Products</span>
                <div className="text-gray-900 mt-1">{vendor.totalProducts}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Add Product</span>
                <button
                  onClick={() => {
                    setSelectedVendor(vendor);
                    setShowAddProductModal(true)
                  }}
                  className="add-product"
                >
                  <SquarePlus className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Header */}
          <div className="px-4 py-3 bg-gray-100 border-b">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600">
              <div>Product Name</div>
              {/* <div>Category</div>
              <div>Description</div> */}
              <div>Unit</div>
              <div>Rate per unit</div>
              <div>Action</div>
            </div>
          </div>

          {/* Products List */}
          <div className="overflow-x-auto">
            {vendor.products.length > 0 ? (
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {vendor.products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 w-1/6">{product.name}</td>
                      {/* <td className="px-4 py-3 text-sm text-gray-900 w-1/6">-</td>
                      <td className="px-4 py-3 text-sm text-gray-900 w-1/6">-</td> */}
                      <td className="px-4 py-3 text-sm text-gray-900 w-1/6">{product.unit}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 w-1/6">₹ {product.rate}</td>
                      <td className="px-4 py-3 w-1/6">
                        <button
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setEditingProduct(product);
                            setShowEditProductModal(true);
                          }}
                          className="btn-small"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                No products added yet. Click the Add Product button to add products.
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default VendorDetails;