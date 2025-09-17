import VendorDetails from "../../components/Vendor/VendorDetails";
import AddVendor from "../../components/Vendor/AddVendor";
import VendorList from "../../components/Vendor/VendorList";
import AddProductModal from "../../components/Vendor/AddProductModal";
import EditProductModal from "../../components/Vendor/EditProductModal";
import { useState } from "react";

function VendorProvider({ children }) {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Dashmesh",
      phone: "9943225422",
      address: "2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006",
      gstNo: "29AAACCD040J2M",
      panNo: "AAACCD040J",
      accountNo: "Amar Kapila",
      totalProducts: 6,
      products: [
        { id: 1, name: "Cutting Blade", rate: 16, unit: "Pcs", minOrderQty: 10 },
        { id: 2, name: "Wrench 14*15", rate: 50, unit: "Pcs", minOrderQty: 5 },
        { id: 3, name: "Wrench 16*17", rate: 20, unit: "Pcs", minOrderQty: 5 },
        { id: 4, name: "Solenoid", rate: 40, unit: "Pcs", minOrderQty: 2 },
        { id: 5, name: "Iron Wire", rate: 156, unit: "Bundle", minOrderQty: 1 },
        { id: 6, name: "DC Pin", rate: 200, unit: "Bundle", minOrderQty: 3 },
      ],
    },
    { id: 2, name: "Pooja", phone: "9943225422", address: "...", totalProducts: 30, products: [] },
    { id: 3, name: "Amar", phone: "9943225422", address: "...", totalProducts: 10, products: [] },
    { id: 4, name: "Suraj", phone: "9943225422", address: "...", totalProducts: 9, products: [] },
    { id: 5, name: "Amar", phone: "9943225422", address: "...", totalProducts: 20, products: [] },
  ]);

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddVendor = (newVendor) => {
    const vendor = {
      ...newVendor,
      id: vendors.length + 1,
      totalProducts: newVendor.products.length,
    };
    setVendors([...vendors, vendor]);
  };

  const handleAddProduct = (vendorId, productData) => {
    const product = {
      ...productData,
      id: Date.now(),
      rate: parseFloat(productData.rate),
    };

    setVendors(
      vendors.map((vendor) =>
        vendor.id === vendorId
          ? { ...vendor, products: [...vendor.products, product], totalProducts: vendor.products.length + 1 }
          : vendor
      )
    );

    setShowAddProductModal(false);
    setSelectedVendor(null);
  };

  const handleEditProduct = (vendorId, productId, updatedProduct) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === vendorId
          ? {
            ...vendor,
            products: vendor.products.map((product) =>
              product.id === productId ? { ...product, ...updatedProduct, rate: parseFloat(updatedProduct.rate) } : product
            ),
          }
          : vendor
      )
    );
    setShowEditProductModal(false);
    setEditingProduct(null);
  };

  return (
    <>
      {children({
        vendors,
        setSelectedVendor,
        setShowAddProductModal,
        setShowEditProductModal,
        setEditingProduct,
        handleAddVendor,
        handleAddProduct,
        handleEditProduct,
        selectedVendor,
        showAddProductModal,
        showEditProductModal,
        editingProduct,
      })}

      {/* Mount Add Product Modal */}
      {showAddProductModal && (
        <AddProductModal
          handleAddProduct={handleAddProduct}
          selectedVendor={selectedVendor}
          setShowAddProductModal={setShowAddProductModal}
          setSelectedVendor={setSelectedVendor}
        />
      )}

      {/* Mount Edit Product Modal */}
      {showEditProductModal && editingProduct && (
        <EditProductModal
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          setShowEditProductModal={setShowEditProductModal}
          handleEditProduct={handleEditProduct}
          selectedVendor={selectedVendor}
        />
      )}
    </>
  );
}

// Define routes as an array
const VendorRoutes = [
  {
    index: true,
    element: (
      <VendorProvider>
        {({ vendors, setSelectedVendor, setShowAddProductModal }) => (
          <VendorList
            vendors={vendors}
            setSelectedVendor={setSelectedVendor}
            setShowAddProductModal={setShowAddProductModal}
          />
        )}
      </VendorProvider>
    ),
  },
  {
    path: "add",
    element: (
      <VendorProvider>
        {({ handleAddVendor }) => <AddVendor handleAddVendor={handleAddVendor} />}
      </VendorProvider>
    ),
  },
  {
    path: ":vendorId",
    element: (
      <VendorProvider>
        {({ vendors, setShowAddProductModal, setShowEditProductModal, setEditingProduct, setSelectedVendor }) => (
          <VendorDetails
            vendors={vendors}
            setShowAddProductModal={setShowAddProductModal}
            setShowEditProductModal={setShowEditProductModal}
            setEditingProduct={setEditingProduct}
            setSelectedVendor={setSelectedVendor}
          />
        )}
      </VendorProvider>
    ),
  },
];

export default VendorRoutes;
