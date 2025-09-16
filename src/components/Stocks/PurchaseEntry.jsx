import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SquarePlus, Trash2 } from "lucide-react";

const gstRate = 0.18; // 18% GST

export default function PurchaseEntry({ vendors = [], isLoading, isError, addRequest  }) {
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      products: [
        {
          productName: "",
          vendorId: "",
          units: "",
          rate: "",
          amount: 0,
          gstAmount: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const products = watch("products");


React.useEffect(() => {
  products.forEach((product, index) => {
    const units = parseFloat(product.units) || 0;
    const rate = parseFloat(product.rate) || 0;
    const amount = units * rate;
    const gstAmount = amount + amount * gstRate;

    setValue(`products.${index}.amount`, amount);
    setValue(`products.${index}.gstAmount`, gstAmount);
  });
}, [products, setValue]);


  // ---- Calculate GST & Amount ----
  const calculateAmount = (units, rate) => {
    const amount = (parseFloat(units) || 0) * (parseFloat(rate) || 0);
    const gstAmount = amount + amount * gstRate;
    return { amount, gstAmount };
  };

  const totalAmount = products.reduce((sum, row) => {
    const { amount } = calculateAmount(row.units, row.rate);
    return sum + amount + amount * gstRate;
  }, 0);

  const onSubmit = (data) => {
    const requestData = {
    products: data.products.map((p) => ({
      vendor: vendors.find((v) => v.id === p.vendorId)?.name,
      name: p.productName,
      unit: vendors.find((v) => v.id === p.vendorId)?.products.find((prod) => prod.name === p.productName)?.unit || "",
      qty: parseFloat(p.units),
      rate: parseFloat(p.rate),
    })),
    totalAmount,
    status: "Pending at Admin",
  };

  addRequest(requestData);
  alert("Request added successfully!");
  };

  if (isLoading) return <p className="p-4">Loading vendors...</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading vendors.</p>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 pb-6">Request Stock</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        {/* Header */}
        <div className="grid grid-cols-7 gap-8 font-semibold text-center pb-2 mb-2 text-sm text-gray-600">
          <span>Choose Material</span>
          <span>Units</span>
          <span>Vendor Name</span>
          <span>Rate (per unit)</span>
          <span>Amount (exc.)</span>
          <span>Amount with GST</span>
          <span>Action</span>
        </div>


        {/* Rows */}
        {fields.map((field, index) => {
          const { amount, gstAmount } = products[index] || { amount: 0, gstAmount: 0 };
          const selectedVendor = vendors.find((v) => v.id === products[index]?.vendorId);

          return (
            <div
              key={field.id}
              className="grid grid-cols-7 gap-8 items-center text-center mb-3 text-sm"
            >
              {/* Product Dropdown (depends on vendor) */}
              <select
                {...register(`products.${index}.productName`, {
                  required: "Product is required",
                })}
                onChange={(e) => {
                  const productName = e.target.value;
                  setValue(`products.${index}.productName`, productName);

                  // Auto-fill rate/unit if found
                  if (selectedVendor) {
                    const prod = selectedVendor.products.find(
                      (p) => p.name === productName
                    );
                    if (prod) {
                      setValue(`products.${index}.rate`, prod.rate);
                    }
                  }
                }}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select Material</option>
                {selectedVendor?.products?.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>

              {/* Units */}
              <input
                type="number"
                {...register(`products.${index}.units`, {
                  required: "Units required",
                })}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              />

              {/* Vendor Dropdown */}
              <select
                {...register(`products.${index}.vendorId`, {
                  required: "Vendor required",
                })}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select Vendor</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>

              {/* Rate */}
              <input
                type="number"
                readOnly
                value={products[index]?.rate || ""}
                className="px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700"
              />

              {/* Amount exc. */}
              <input
                type="text"
                readOnly
                value={`₹ ${amount}`}
                className="px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700"
              />

              {/* Amount with GST */}
              <input
                type="text"
                readOnly
                value={`₹ ${gstAmount}`}
                className="px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700"
              />

              {/* Actions */}
              <div className="flex justify-center gap-2">
                {index === fields.length - 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      append({
                        productName: "",
                        vendorId: "",
                        units: "",
                        rate: "",
                        amount: 0,
                        gstAmount: 0,
                      })
                    }
                    className="add-product"
                  >
                    <SquarePlus className="w-6 h-6" />
                  </button>
                )}
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Total Amount */}
        <div className="grid grid-cols-7 gap-8 items-center mt-4">
          <div />
          <div />
          <div />
          <div />
          <span className="font-semibold mr-4">Total Amount</span>
          <input
            type="text"
            readOnly
            value={`₹ ${totalAmount}`}
            className="px-4 py-2 border rounded-md bg-blue-100 font-bold text-cyan-800"
          />
        </div>

        {/* Submit */}
        <div className="grid grid-cols-7 gap-8 items-center mt-4">
          <div />
          <div />
          <div />
          <div />
          <div />
          <button
            type="submit"
            className="btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}