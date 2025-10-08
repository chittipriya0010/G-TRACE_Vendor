import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

// ✅ FileUpload component (kept for completeness)
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

// ✅ Progress steps (kept for completeness)
const steps = [
  { id: 0, title: "Client Details" },
  { id: 1, title: "Billing" },
  { id: 2, title: "Package" },
];

const BillingInformation = ({ onNext, activeStep }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const clientId = location.state?.clientId;

  // 🆕 NEW STATE for client address and checkbox
  const [clientAddress, setClientAddress] = useState("");
  const [useSameAddress, setUseSameAddress] = useState(false);
  // --------------------------------------------

  const [billingData, setBillingData] = useState({
    billingName: "",
    accountNo: "",
    gstNo: "",
    panNo: "",
    billingAddress: "",
    poOfficial: "",
  });

  const [errors, setErrors] = useState({});

  // 🆕 useEffect to fetch client's address
  useEffect(() => {
  const fetchClientAddress = async () => {
    if (!clientId) return;
    try {
      const response = await axiosInstance.get(`/clients/${clientId}`);
      const address = response.data.address || ""; // Adjust according to your API response
      setClientAddress(address);
       console.log("Full client received:", address);
    } catch (err) {
      console.error("Error fetching client address:", err);
    }
  };
  fetchClientAddress();
}, [clientId]);
  // ------------------------------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error when typing
  };

  // 🆕 NEW handler for the checkbox
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setUseSameAddress(isChecked);

    if (isChecked) {
      // If checked, copy the client address to billing address
      setBillingData((prev) => ({ ...prev, billingAddress: clientAddress }));
    } else {
      // If unchecked, clear the billing address for manual entry
      setBillingData((prev) => ({ ...prev, billingAddress: "" }));
    }
    setErrors((prev) => ({ ...prev, billingAddress: "" })); // Clear address error
  };
  // ------------------------------------------------

  const validateForm = () => {
    let validationErrors = {};

    if (!billingData.billingName.trim()) validationErrors.billingName = "Billing Name is required.";

    if (!billingData.gstNo.trim()) validationErrors.gstNo = "GST number is required.";
    else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(billingData.gstNo)) {
      validationErrors.gstNo = "Enter a valid GST number.";
    }

    if (!billingData.panNo.trim()) validationErrors.panNo = "PAN number is required.";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(billingData.panNo)) {
      validationErrors.panNo = "Enter a valid PAN number.";
    }

    if (!billingData.billingAddress.trim()) validationErrors.billingAddress = "Billing Address is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
  if (!validateForm()) return;

  // ... (rest of your handleSubmit logic is the same)
  if (!clientId) {
    alert("Client ID not found!");
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append("clientId", clientId); 
  formDataToSend.append("billingName", billingData.billingName);
  formDataToSend.append("accountNo", billingData.accountNo);
  formDataToSend.append("gstNo", billingData.gstNo);
  formDataToSend.append("panNo", billingData.panNo);
  formDataToSend.append("billingAddress", billingData.billingAddress); // This will be the selected address

  if (billingData.poOfficial) {
    formDataToSend.append("poOfficial", billingData.poOfficial); 
  }

  axiosInstance
  .post("/billings", formDataToSend, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then((res) => {
    console.log("Billing created:", res.data.billing);
    const createdBilling = res.data.billing; 
    onNext(createdBilling);

    navigate("/sales/select-package", {
      state: {
        clientId: clientId,           
        billId: createdBilling.id,    
      },
    });
  })
  .catch((err) => {
    console.error("AxiosError:", err.response?.data || err.message);
    alert("Failed to create billing. Check console for details.");
  });
};

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-8xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8">
          {/* Progress Stepper (omitted for brevity) */}
          <div className="font-poppins flex items-center justify-center mb-10">
            {/* ... Stepper Content ... */}
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
            {/* ... (Billing Name, Account No, GST, PAN fields remain unchanged) ... */}
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

            {/* Address and Checkbox */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Billing Address</label>
                {/* 🆕 Checkbox for same address */}
                {clientAddress && (
                  <div className="flex items-center">
                    <input
                      id="sameAddress"
                      type="checkbox"
                      checked={useSameAddress}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="sameAddress" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                      Same as Client Address
                    </label>
                  </div>
                )}
              </div>
                {/* 🆕 Address field is disabled if checkbox is checked */}
              <textarea
                name="billingAddress"
                value={billingData.billingAddress}
                onChange={handleInputChange}
                placeholder="Billing Address"
                rows={3}
                disabled={useSameAddress} // ❗ Disabled when using client address
                className={`w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white resize-none h-24 ${
                  useSameAddress ? 'bg-gray-100 cursor-not-allowed' : '' // Grey out when disabled
                } ${
                  errors.billingAddress
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                }`}
              />
              {errors.billingAddress && <p className="text-red-500 text-xs mt-1">{errors.billingAddress}</p>}
            </div>

            {/* PO + Email (omitted for brevity) */}
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="items-center">
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