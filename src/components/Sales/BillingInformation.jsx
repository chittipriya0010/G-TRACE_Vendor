import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ✅ FileUpload component
const FileUpload = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (onFileSelect) onFileSelect(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    if (onFileSelect) onFileSelect(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById("fileInput").click()}
      className="border-2 border-dashed border-blue-600 rounded-lg p-5 text-center cursor-pointer bg-gray-50"
    >
      {file ? (
        <p className="font-poppins">{file.name}</p>
      ) : (
        <p className="font-poppins">Drag & drop file here, or click to upload</p>
      )}
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

// ✅ Progress steps
const steps = [
  { id: 0, title: "Client Details" },
  { id: 1, title: "Billing" },
  { id: 2, title: "Package" },
];

const BillingInformation = ({ onNext, activeStep }) => {
  const [billingData, setBillingData] = useState({
    billingName: "",
    accountNo: "",
    gstNo: "",
    panNo: "",
    billingAddress: "",
    poOfficial: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error when typing
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!billingData.billingName.trim()) validationErrors.billingName = "Billing Name is required.";
    if (!billingData.accountNo.trim()) validationErrors.accountNo = "Account Number is required.";
    else if (!/^\d{9,18}$/.test(billingData.accountNo)) validationErrors.accountNo = "Enter a valid account number.";

    if (!billingData.gstNo.trim()) validationErrors.gstNo = "GST number is required.";
    else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(billingData.gstNo)) {
      validationErrors.gstNo = "Enter a valid GST number.";
    }

    if (!billingData.panNo.trim()) validationErrors.panNo = "PAN number is required.";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(billingData.panNo)) {
      validationErrors.panNo = "Enter a valid PAN number.";
    }

    if (!billingData.billingAddress.trim()) validationErrors.billingAddress = "Billing Address is required.";
    if (!billingData.email.trim()) validationErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingData.email)) validationErrors.email = "Enter a valid email.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Call parent handler to save data
    onNext(billingData);

    // Navigate to next step route (adjust path as needed)
    navigate("/sales/select-package");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8">
          {/* Progress Stepper */}
          <div className="font-poppins flex items-center justify-center mb-10">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm ${
                      activeStep === idx
                        ? "bg-blue-600 border-blue-600 text-white"
                        : activeStep > idx
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-blue-600 text-blue-600"
                    }`}
                  >
                    {activeStep > idx ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M6 10.5L9 13.5L14 8.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={`ml-2 font-semibold ${
                      activeStep === idx
                        ? "text-blue-600"
                        : activeStep > idx
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      activeStep > idx ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Billing Form */}
          <h2 className="font-poppins text-lg font-medium text-blue-600 mb-6">
            Billing Information
          </h2>

          <div className="flex flex-col gap-4">
            {/* Billing Name + Account No */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Billing Name</label>
                <input
                  name="billingName"
                  value={billingData.billingName}
                  onChange={handleInputChange}
                  placeholder="Billing Name"
                  className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none bg-white ${
                    errors.billingName
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
                {errors.billingName && <p className="text-red-500 text-xs mt-1">{errors.billingName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account No.</label>
                <input
                  name="accountNo"
                  value={billingData.accountNo}
                  onChange={handleInputChange}
                  placeholder="Account Number"
                  className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none bg-white ${
                    errors.accountNo
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
                {errors.accountNo && <p className="text-red-500 text-xs mt-1">{errors.accountNo}</p>}
              </div>
            </div>

            {/* GST + PAN */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST No.</label>
                <input
                  name="gstNo"
                  value={billingData.gstNo}
                  onChange={handleInputChange}
                  placeholder="GST Number"
                  className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none bg-white ${
                    errors.gstNo
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
                {errors.gstNo && <p className="text-red-500 text-xs mt-1">{errors.gstNo}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PAN No.</label>
                <input
                  name="panNo"
                  value={billingData.panNo}
                  onChange={handleInputChange}
                  placeholder="PAN Number"
                  className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none bg-white ${
                    errors.panNo
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
                {errors.panNo && <p className="text-red-500 text-xs mt-1">{errors.panNo}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
              <textarea
                name="billingAddress"
                value={billingData.billingAddress}
                onChange={handleInputChange}
                placeholder="Billing Address"
                className={`w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white resize-none h-24 ${
                  errors.billingAddress
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                }`}
              />
              {errors.billingAddress && <p className="text-red-500 text-xs mt-1">{errors.billingAddress}</p>}
            </div>

            {/* PO + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PO (official)</label>
                <FileUpload
                  onFileSelect={(file) =>
                    setBillingData((prev) => ({
                      ...prev,
                      poOfficial: file,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={billingData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none bg-white ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="font-poppins bg-blue-600 text-white font-medium px-8 py-2 rounded-lg transition hover:bg-blue-700"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInformation;