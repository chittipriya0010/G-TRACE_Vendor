
const AddProductModal = ({ 
  newProduct, 
  setNewProduct, 
  handleAddProduct, 
  selectedVendor, 
  setShowAddProductModal, 
  setSelectedVendor 
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 mx-4">
      <h3 className="text-lg font-medium mb-4 text-gray-800">Add Product</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter product name"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Rate *
          </label>
          <input
            type="number"
            value={newProduct.rate}
            onChange={(e) => setNewProduct({...newProduct, rate: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter rate"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Unit *
          </label>
          <select
            value={newProduct.unit}
            onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="Pcs">Pcs</option>
            <option value="Bundle">Bundle</option>
          </select>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => handleAddProduct(selectedVendor)}
          className="flex-1 bg-cyan-800 text-white py-2 px-4 rounded-md hover:bg-teal-700 font-medium text-sm"
        >
          Add Product
        </button>
        <button
          onClick={() => {
            setShowAddProductModal(false);
            setNewProduct({name: '', rate: '', unit: 'Pcs'});
            setSelectedVendor(null);
          }}
          className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 font-medium text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default AddProductModal;