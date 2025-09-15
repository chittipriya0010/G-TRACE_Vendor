import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../config/api";
import VendorDetails from "../../components/Vendor/VendorDetails";
import AddVendor from "../../components/Vendor/AddVendor";
import VendorList from "../../components/Vendor/VendorList";
import AddProductModal from "../../components/Vendor/AddProductModal";
import EditProductModal from "../../components/Vendor/EditProductModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


// API calls
const fetchVendors = async () => {
  const { data } = await api.get("/vendors");
  return data.data;
};

const addVendor = async (vendor) => {
  const { data } = await api.post("/vendors", vendor, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
};

const addProduct = async ({ vendorId, product }) => {
  const { data } = await api.post(`/products/${vendorId}`, product);
  return data;
};

const updateProduct = async ({ productId, updatedProduct }) => {
  const { data } = await api.put(`/products/${productId}`, updatedProduct);
  return data;
};


function VendorProvider({ children }) {
  
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const navigate = useNavigate();
 const queryClient = useQueryClient();

 // Fetch vendors
  const { data: vendors = [], isLoading, isError } = useQuery({
    queryKey: ["vendors"],
    queryFn: fetchVendors,
  });

  // Mutations
  const addVendorMutation = useMutation({
    mutationFn: addVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    navigate('/vendors');
    }
  });

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendors"] })
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendors"] }),
  });
  // Handlers
  const handleAddVendor = (vendor) => addVendorMutation.mutate(vendor);

  const handleAddProduct = (vendorId, productData) => {
    addProductMutation.mutate({ vendorId, product: productData });
    setShowAddProductModal(false);
    setSelectedVendor(null);
    };


  const handleEditProduct = ( productId, updatedProduct) => {
    updateProductMutation.mutate({ productId, updatedProduct });
    setShowEditProductModal(false);
    setEditingProduct(null);
  };

  return (
    <>
      {children({
        vendors,
        isLoading,
        isError,
        selectedVendor,
        showAddProductModal,
        showEditProductModal,
        editingProduct,
        setSelectedVendor,
        setShowAddProductModal,
        setShowEditProductModal,
        setEditingProduct,
        handleAddVendor,
        handleAddProduct,
        handleEditProduct,
      })}

      {/* Mount Add Product Modal */}
      {showAddProductModal && selectedVendor && (
        <AddProductModal
          handleAddProduct={handleAddProduct}
          selectedVendor={selectedVendor}
          setShowAddProductModal={setShowAddProductModal}
          setSelectedVendor={setSelectedVendor}
        />
      )}

      {/* Mount Edit Product Modal */}
      {showEditProductModal && editingProduct && selectedVendor && (
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
        {({ vendors, setSelectedVendor, setShowAddProductModal, isLoading, isError }) => (
          <VendorList
            vendors={vendors}
            isLoading={isLoading}
            isError={isError}
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
