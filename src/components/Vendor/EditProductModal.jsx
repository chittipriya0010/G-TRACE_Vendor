import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditProductModal = ({ editingProduct, handleEditProduct, selectedVendor, setShowEditProductModal, setEditingProduct }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      rate: "",
      unit: "Pcs",
    },
  });

  useEffect(() => {
    if (editingProduct) {
      reset({
        name: editingProduct.name || "",
        rate: editingProduct.rate || "",
        unit: editingProduct.unit || "Pcs",
      });
    }
  }, [editingProduct, reset]);

  const onSubmit = (data) => {
    handleEditProduct(selectedVendor.id, editingProduct.id, data);
    setShowEditProductModal(false);
    setEditingProduct(null);
  };

  const handleClose = () => {
    setShowEditProductModal(false);
    setEditingProduct(null);
    reset();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[80%] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Edit Product
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Header */}
        <div className="flex flex-row text-sm text-gray-600 font-medium gap-4 mb-2">
          <div className="w-1/5">Vendor Name</div>
          <div className="w-1/5">Product Name *</div>
          <div className="w-1/5">Rate *</div>
          <div className="w-1/5">Unit *</div>
          <div className="w-1/5">Action</div>
        </div>

        {/* Single Row Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-4 items-start">
            {/* Vendor Name */}
            <div className="w-1/5 flex items-center">
              {selectedVendor?.name || "—"}
            </div>

            {/* Product Name */}
            <div className="w-1/5">
              <input
                {...register("name", { required: "Product name is required" })}
                placeholder="Enter product"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Rate */}
            <div className="w-1/5">
              <input
                type="number"
                {...register("rate", {
                  required: "Rate is required",
                  min: { value: 1, message: "Rate must be positive" },
                })}
                placeholder="₹ 100"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              {errors.rate && (
                <p className="text-red-500 text-xs">{errors.rate.message}</p>
              )}
            </div>

            {/* Unit */}
            <div className="w-1/5">
              <select
                {...register("unit", { required: "Unit is required" })}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="Pcs">Pcs</option>
                <option value="Bundle">Bundle</option>
              </select>
              {errors.unit && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.unit.message}
                </p>
              )}
            </div>

            {/* Action */}
            <div className="w-1/5 flex items-center">
              <button
                type="submit"
                className="btn-small"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;