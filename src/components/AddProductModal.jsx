
const EditProductModal = ({ 
  editingProduct, 
  setEditingProduct, 
  handleEditProduct, 
  selectedVendor, 
  setShowEditProductModal 
}) => {

  return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 mx-4">
      <h3 className="text-lg font-medium mb-4 text-gray-800">Edit Product</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            value={editingProduct?.name || ''}
            onChange={(e) => setEditingProduct(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Rate *
          </label>
          <input
            type="number"
            value={editingProduct?.rate || ''}
            onChange={(e) => setEditingProduct(prev => ({ ...prev, rate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Unit *
          </label>
          <select
            value={editingProduct?.unit || 'Pcs'}
            onChange={(e) => setEditingProduct(prev => ({ ...prev, unit: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="Pcs">Pcs</option>
            <option value="Bundle">Bundle</option>
          </select>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => handleEditProduct(selectedVendor.id, editingProduct.id, editingProduct)}
          className="flex-1 btn-primary"
        >
          Update Product
        </button>
        <button
          onClick={() => {
            setShowEditProductModal(false);
            setEditingProduct(null);
          }}
          className="flex-1 btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default EditProductModal;