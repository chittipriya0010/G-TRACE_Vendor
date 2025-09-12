import { useState } from 'react';
import { Plus, Edit, Eye, Home, Upload, SquarePlus } from 'lucide-react';
import AddVendor from './AddVendor';

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
  
  

  // Screenshot 3: Add Product Modal
  

  // Screenshot 4: Vendor Details/Products View Page


  // Screenshot 5: Edit Product Modal
  

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