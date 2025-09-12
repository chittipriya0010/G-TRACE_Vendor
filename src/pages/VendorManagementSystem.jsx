import { useState } from 'react';
import { Plus, Edit, Eye, Home, Upload, SquarePlus } from 'lucide-react';
import AddVendor from '../components/Vendor/AddVendor';

const VendorManagementSystem = () => {
  const [currentView, setCurrentView] = useState('list');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: 'Dashmesh',
      phone: '9943225422',
      address: '2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006',
      gstNo: '29AAACCD040J2M',
      panNo: 'AAACCD040J',
      accountNo: 'Amar Kapila',
      totalProducts: 6,
      products: [
        { id: 1, name: 'Cutting Blade', rate: 16, unit: 'Pcs' },
        { id: 2, name: 'Wrench 14*15', rate: 50, unit: 'Pcs' },
        { id: 3, name: 'Wrench 16*17', rate: 20, unit: 'Pcs' },
        { id: 4, name: 'Solenoid', rate: 40, unit: 'Pcs' },
        { id: 5, name: 'Iron Wire', rate: 156, unit: 'Bundle' },
        { id: 6, name: 'DC Pin', rate: 200, unit: 'Bundle' }
      ]
    },
    {
      id: 2,
      name: 'Pooja',
      phone: '9943225422',
      address: '2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006',
      gstNo: '29AAACCD040J2M',
      panNo: 'AAACCD040J',
      accountNo: 'Amar Kapila',
      totalProducts: 30,
      products: []
    },
    {
      id: 3,
      name: 'Amar',
      phone: '9943225422',
      address: '2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006',
      gstNo: '29AAACCD040J2M',
      panNo: 'AAACCD040J',
      accountNo: 'Amar Kapila',
      totalProducts: 10,
      products: []
    },
    {
      id: 4,
      name: 'Suraj',
      phone: '9943225422',
      address: '2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006',
      gstNo: '29AAACCD040J2M',
      panNo: 'AAACCD040J',
      accountNo: 'Amar Kapila',
      totalProducts: 9,
      products: []
    },
    {
      id: 5,
      name: 'Amar',
      phone: '9943225422',
      address: '2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006',
      gstNo: '29AAACCD040J2M',
      panNo: 'AAACCD040J',
      accountNo: 'Amar Kapila',
      totalProducts: 20,
      products: []
    }
  ]);

  const [newVendor, setNewVendor] = useState({
    name: '',
    phone: '',
    address: '',
    gstNo: '',
    panNo: '',
    accountNo: '',
    products: []
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    rate: '',
    unit: 'Pcs'
  });

  const handleAddVendor = () => {
    const vendor = {
      ...newVendor,
      id: vendors.length + 1,
      totalProducts: newVendor.products.length
    };
    setVendors([...vendors, vendor]);
    setNewVendor({
      name: '',
      phone: '',
      address: '',
      gstNo: '',
      panNo: '',
      accountNo: '',
      products: []
    });
    setCurrentView('list');
  };

  const handleAddProduct = (vendorId) => {
    const product = {
      ...newProduct,
      id: Date.now(),
      rate: parseFloat(newProduct.rate)
    };
    
    if (vendorId) {
      setVendors(vendors.map(vendor => 
        vendor.id === vendorId 
          ? { ...vendor, products: [...vendor.products, product], totalProducts: vendor.products.length + 1 }
          : vendor
      ));
    } else {
      setNewVendor({
        ...newVendor,
        products: [...newVendor.products, product]
      });
    }
    
    setNewProduct({ name: '', rate: '', unit: 'Pcs' });
    setShowAddProductModal(false);
  };

  const handleEditProduct = (vendorId, productId, updatedProduct) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId 
        ? { 
            ...vendor, 
            products: vendor.products.map(product => 
              product.id === productId ? { ...product, ...updatedProduct, rate: parseFloat(updatedProduct.rate) } : product
            ) 
          }
        : vendor
    ));
    setShowEditProductModal(false);
    setEditingProduct(null);
  };


// Vendor List Page
  const VendorList = () => (
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className='text-3xl font-bold text-black-100 pb-6'>Vendor</h1>
      <div>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="text-black-100 px-4 py-3 flex items-center justify-between">
            <button className="bg-cyan-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-900 cursor-pointer">
                Vendor List
                </button>
            <button
              onClick={() => setCurrentView('add')}
              className="bg-white text-cyan-800 px-4 py-2 border-1 border-cyan-800 rounded-lg text-sm font-medium hover:bg-gray-50"
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
                        className=" rounded flex items-center justify-center cursor-pointer"
                      >
                        <SquarePlus className="w-6 h-6 text-orange-400" />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setSelectedVendor(vendor.id);
                          setCurrentView('details');
                        }}
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
  );
  

  // Screenshot 3: Add Product Modal
  const AddProductModal = () => (
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
            className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 font-medium text-sm"
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

  // Screenshot 4: Vendor Details/Products View Page
  const VendorDetails = () => {
    const vendor = vendors.find(v => v.id === selectedVendor);
    if (!vendor) return null;

    return (
      <div className="min-h-screen bg-gray-100">
        
        <div className="p-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="bg-teal-600 text-white px-4 py-3 flex items-center justify-between">
              <span className="font-medium">Produt List</span>
              
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

  // Screenshot 5: Edit Product Modal
  const EditProductModal = () => (
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
              onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
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
              onChange={(e) => setEditingProduct({...editingProduct, rate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Unit *
            </label>
            <select
              value={editingProduct?.unit || 'Pcs'}
              onChange={(e) => setEditingProduct({...editingProduct, unit: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="Pcs">Pcs</option>
              <option value="Bundle">Bundle</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => handleEditProduct(selectedVendor, editingProduct.id, editingProduct)}
            className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 font-medium text-sm"
          >
            Update Product
          </button>
          <button
            onClick={() => {
              setShowEditProductModal(false);
              setEditingProduct(null);
            }}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 font-medium text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === 'list' && <VendorList />}
      {currentView === 'add' && <AddVendor vendor={handleAddVendor} product={handleAddProduct} />}
      {currentView === 'details' && <VendorDetails />}
      
      {showAddProductModal && <AddProductModal />}
      {showEditProductModal && <EditProductModal />}
    </div>
  );
};

export default VendorManagementSystem;