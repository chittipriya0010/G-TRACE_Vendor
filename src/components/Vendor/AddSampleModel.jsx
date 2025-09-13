import { X } from "lucide-react";
import { useForm } from "react-hook-form";

const AddProductModal = ({
  handleAddProduct,
  selectedVendor,
  setShowAddProductModal,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      rate: "",
      unit: "Pcs",
    },
  });

  const onSubmit = (data) => {
    handleAddProduct(selectedVendor.id, data);
    reset();
    setShowAddProductModal(false);
  };

  const handleClose = () => {
    reset();
    setShowAddProductModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[80%] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Add Product</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
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
                type="text"
                {...register("name", { required: "Product name is required" })}
                placeholder="Enter product"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Rate */}
            <div className="w-1/5">
              <input
                type="number"
                step="0.01"
                {...register("rate", {
                  required: "Rate is required",
                  min: { value: 1, message: "Rate must be greater than 0" },
                })}
                placeholder="₹ 100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              {errors.rate && (
                <p className="text-xs text-red-500 mt-1">{errors.rate.message}</p>
              )}
            </div>

            {/* Unit */}
            <div className="w-1/5">
              <select
                {...register("unit", { required: "Unit is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="Pcs">Pcs</option>
                <option value="Bundle">Bundle</option>
              </select>
              {errors.unit && (
                <p className="text-xs text-red-500 mt-1">{errors.unit.message}</p>
              )}
            </div>

            {/* Action */}
            <div className="w-1/5 flex items-center">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md text-sm font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
