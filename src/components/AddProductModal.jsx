import { X } from "lucide-react";

const AddProductModal = ({
  newProduct,
  setNewProduct,
  handleAddProduct,
  selectedVendor,
  setShowAddProductModal,
  setSelectedVendor,
}) => (
  <div className="fixed inset-0 bg-blue bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-[80%] shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Add Product</h3>
        <button
          onClick={() => {
            setShowAddProductModal(false);
            setNewProduct({ name: "", rate: "", unit: "Pcs" });
            setSelectedVendor(null);
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Products section */}
      <div className="bg-white rounded-lg space-y-6">

        {/* Table header */}
        <div className="flex flex-row text-sm text-gray-600 font-medium gap-4">

          <div>Vendor Name</div>
          <div>Product Name *</div>
            <div>Rate *</div>
            <div>Unit *</div>
            <div>Action</div>
        </div>

        {/* Single row */}
        <div className="flex flex-row gap-4 items-center">
          {/* Name */}
          {/* set from selectVendor.id */}
          Dashmesh
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Enter product"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <div className="grid grid-cols-2 gap-2 items-center">
            {/* Rate */}
            <input
              type="number"
              value={newProduct.rate}
              onChange={(e) =>
                setNewProduct({ ...newProduct, rate: e.target.value })
              }
              placeholder="₹ 100"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            {/* Unit */}
            <select
              value={newProduct.unit}
              onChange={(e) =>
                setNewProduct({ ...newProduct, unit: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option>Pcs</option>
              <option>Bundle</option>
            </select>
          </div>
          {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => handleAddProduct(selectedVendor)}
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md text-sm font-medium"
        >
          Save Product
        </button>
      </div>
        </div>
      </div>

      
    </div>
  </div>
);

export default AddProductModal;
