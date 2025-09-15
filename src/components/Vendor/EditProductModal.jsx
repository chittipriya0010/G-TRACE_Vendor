import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditProductModal = ({ editingProduct, handleEditProduct, selectedVendor, setShowEditProductModal, setEditingProduct }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      rate: "",
      unit: "Pcs",
      minOrderQty: "minOrderQty",
    },
  });

  useEffect(() => {
    if (editingProduct) {
      reset({
        name: editingProduct.name || "",
        rate: editingProduct.rate || "",
        unit: editingProduct.unit || "Pcs",
        minOrderQty: editingProduct.minOrderQty || "",
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
    <div className="flex justify-between items-center mb-6">
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

    {/* Form */}
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-6 gap-4 items-start">
        {/* Vendor Name */}
        <div>
          <label className="block text-sm text-gray-600 font-medium mb-1">
            Vendor Name
          </label>
          <p className="px-3 py-2 text-sm">
            {selectedVendor?.name || "—"}
          </p>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm text-gray-600 font-medium mb-1">
            Product Name *
          </label>
          <input
            {...register("name", { required: "Product name is required" })}
            placeholder="Enter product"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Rate */}
        <div>
          <label className="block text-sm text-gray-600 font-medium mb-1">
            Rate *
          </label>
          <input
            type="number"
            {...register("rate", {
              required: "Rate is required",
              min: { value: 1, message: "Rate must be positive" },
            })}
            placeholder="₹ 100"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          {errors.rate && (
            <p className="text-red-500 text-xs">{errors.rate.message}</p>
          )}
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm text-gray-600 font-medium mb-1">
            Unit *
          </label>
          <select
            {...register("unit", { required: "Unit is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
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

        {/* MOQ */}
        <div>
          <label className="block text-sm text-gray-600 font-medium mb-1">
            MOQ *
          </label>
          <input
            type="number"
            {...register("minOrderQty", {
              required: "Minimum Order Quantity is required",
              min: { value: 1, message: "MOQ must be positive" },
            })}
            placeholder="20"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          {errors.minOrderQty && (
            <p className="text-xs text-red-500 mt-1">
              {errors.minOrderQty.message}
            </p>
          )}
        </div>

        {/* Action */}
        <div className="text-center">
          <label className="block text-sm text-gray-600 font-medium mb-1">
            Action
          </label>
          <button type="submit" className="btn-small">
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