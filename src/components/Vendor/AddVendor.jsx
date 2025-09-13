import { SquarePlus, Upload } from 'lucide-react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddVendor = ({ handleAddVendor }) => {
  const navigate = useNavigate();
  const [newVendor, setNewVendor] = useState({
    name: '',
    phone: '',
    address: '',
    gstNo: '',
    panNo: '',
    accountNo: '',
    products: [{ name: "", rate: "", unit: "Pcs" }]
  });

  // Add blank product
  const handleAddProduct = () => {
    setNewVendor({
      ...newVendor,
      products: [...newVendor.products, { name: "", rate: "", unit: "Pcs" }],
    });
  };

  // Update product fields
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...newVendor.products];
    updatedProducts[index][field] = value;
    setNewVendor({ ...newVendor, products: updatedProducts });
  };

  const handleSubmit = () => {
    // Filter out empty products
    const validProducts = newVendor.products.filter(p => p.name && p.rate);
    const vendorToAdd = {
      ...newVendor,
      products: validProducts.map((p, idx) => ({
        ...p,
        id: Date.now() + idx,
        rate: parseFloat(p.rate)
      }))
    };
    handleAddVendor(vendorToAdd);
    navigate('/vendors');
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className='text-3xl font-bold text-black-100 pb-6'>Add New Vendor</h1>
      <div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fill Vendor Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
              <h3 className="font-medium text-gray-700 text-2xl">Fill Vendor Details</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Vendor Name *
                    </label>
                    <input
                      type="text"
                      value={newVendor.name}
                      onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Amar Kapila"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Phone No *
                    </label>
                    <input
                      type="text"
                      value={newVendor.phone}
                      onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="9943225422"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={newVendor.address}
                    onChange={(e) => setNewVendor({ ...newVendor, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006"
                  />
                </div>
              </div>

              {/* Products Section */}
                <div>
                  <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">

                    {/* Products Section */}
                    <div>
                      <div className="mb-4 font-medium text-gray-700">Products</div>

                      <div className="space-y-3">
                        {/* Header */}
                        <div className="grid grid-cols-4 gap-2 text-sm text-gray-600 font-medium">
                          <span>Product Name *</span>
                          <span>Rate *</span>
                          <span>Unit *</span>
                          <span className='text-center'>Add</span>
                        </div>

                        {/* Rows */}
                        {newVendor.products.map((product, index) => (
                          <div key={index} className="grid grid-cols-4 gap-2">
                            <input
                              type="text"
                              value={product.name}
                              onChange={(e) =>
                                handleProductChange(index, "name", e.target.value)
                              }
                              placeholder="Enter product"
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <input
                              type="text"
                              value={product.rate}
                              onChange={(e) =>
                                handleProductChange(index, "rate", e.target.value)
                              }
                              placeholder="₹ 100"
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <select
                              value={product.unit}
                              onChange={(e) =>
                                handleProductChange(index, "unit", e.target.value)
                              }
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            >
                              <option>Pcs</option>
                              <option>Bundle</option>
                            </select>

                            {/* Plus button for every row */}
                            <button
                              onClick={() => handleAddProduct(index)}
                              className="text-orange-500 hover:text-orange-700 flex justify-center"
                            >
                              <SquarePlus className="w-6 h-6" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
              <h3 className="font-medium text-gray-700 text-2xl">Account Details</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Gst No *
                    </label>
                    <input
                      type="text"
                      value={newVendor.gstNo}
                      onChange={(e) => setNewVendor({ ...newVendor, gstNo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="29AAAC"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Pan No *
                    </label>
                    <input
                      type="text"
                      value={newVendor.panNo}
                      onChange={(e) => setNewVendor({ ...newVendor, panNo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="AAACC0404J"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Account No *
                  </label>
                  <input
                    type="text"
                    value={newVendor.accountNo}
                    onChange={(e) => setNewVendor({ ...newVendor, accountNo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Amar Kapila"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Upload Gst Certificate
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-3" />
                    <span className="text-gray-500 text-sm">Upload Gst Certificate</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 font-medium text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddVendor