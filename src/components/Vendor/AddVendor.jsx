import { SquarePlus, Trash2, Upload } from 'lucide-react';
import { useDropzone } from "react-dropzone";
import { useForm, useFieldArray } from "react-hook-form";
import { useCallback } from 'react';

const AddVendor = ({ handleAddVendor }) => {

  const { register, handleSubmit, control, setValue, watch , formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      gstNo: '',
      panNo: '',
      accountNo: '',
      products: [{ name: "", rate: "", unit: "Pcs", minOrderQty: "" }],
      gstFile: null
    }
  });

  const gstFile = watch("gstFile");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setValue("gstFile", acceptedFiles[0]);
    }
  }, [setValue]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": []
    },
    multiple: false
  });

  const onSubmit = (data) => {
    const validProducts = data.products.filter((p) => p.name && p.rate);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("gstNo", data.gstNo);
    formData.append("panNo", data.panNo);
    formData.append("accountNo", data.accountNo);

    if (data.gstFile) {
      formData.append("gstFile", data.gstFile);
    }

    formData.append(
      "products",
      JSON.stringify(
        validProducts.map((p) => ({
          ...p,
          rate: parseFloat(p.rate),
        }))
      )
    );

    handleAddVendor(formData);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className='text-3xl font-bold text-black-100 pb-6'>Add New Vendor</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row max-lg:flex-col justify-center item-start gap-8">

        {/* Vendor Details */}
        <div className="w-[60%] max-lg:w-full bg-white rounded-lg p-6 shadow-sm space-y-6">
          <h3 className="font-medium text-gray-700 text-2xl">Fill Vendor Details</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Vendor Name *</label>
                <input
                  {...register("name", { required: "Vendor name is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Amar Kapila"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Phone No *</label>
                <input
                  {...register("phone", { required: "Phone number is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="9943225422"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Address *</label>
              <input
                {...register("address", { required: "Address is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
            <div className="mb-4 font-medium text-gray-700">Products</div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 font-medium">
                <span>Product Name *</span>
                <div className='grid grid-cols-4 gap-2 text-sm text-gray-600 font-medium'>
                  <span>Rate *</span>
                  <span>Unit *</span>
                  <span>MOQ *</span>
                  <span className='text-center'>Actions</span>
                </div>
              </div>

              {fields.map((product, index) => (
                <div key={product.id} className="grid grid-cols-2 gap-4 items-center">
                  <input
                    {...register(`products.${index}.name`, { required: "Product name required" })}
                    placeholder="Enter product"
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <div className='grid grid-cols-4 gap-2 items-center'>
                    <input
                      {...register(`products.${index}.rate`, { required: "Rate required" })}
                      placeholder="₹ 100"
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <select
                      {...register(`products.${index}.unit`)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option>Pcs</option>
                      <option>Bundle</option>
                    </select>
                    <input
                      {...register(`products.${index}.minOrderQty`, { required: "Minimum Order Quntity is required" })}
                      placeholder="20"
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ name: "", rate: "", unit: "Pcs" })}
                className="flex items-center gap-2 text-teal-600 hover:text-teal-800 mt-2 cursor-pointer"
              >
                <SquarePlus className="w-5 h-5" /> Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
          <h3 className="font-medium text-gray-700 text-2xl">Account Details</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Gst No *</label>
                <input
                  {...register("gstNo", { required: "GST number is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="29AAAC"
                />
                {errors.gstNo && <p className="text-red-500 text-sm">{errors.gstNo.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Pan No *</label>
                <input
                  {...register("panNo", { required: "PAN number is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="AAACC0404J"
                />
                {errors.panNo && <p className="text-red-500 text-sm">{errors.panNo.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Account No *</label>
              <input
                {...register("accountNo", { required: "Account number is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              {errors.accountNo && <p className="text-red-500 text-sm">{errors.accountNo.message}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Upload GST Certificate</label>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors
      ${isDragActive ? "border-cyan-800 bg-teal-50" : "border-gray-300"}`}
              >
                <input {...getInputProps()} />
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-3" />
                {gstFile ? (
                  <p className="text-sm text-gray-700">{gstFile.name}</p>
                ) : (
                  <span className="text-gray-500 text-sm">Drag & drop or click to upload</span>
                )}
              </div>
            </div>

          </div>

          <button type="submit" className="w-full btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVendor;
