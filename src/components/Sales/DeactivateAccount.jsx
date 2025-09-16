import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeactivateAccount = ({ onNext, activeStep }) => {
  const [formData, setFormData] = useState({
    userName: "",
    totalNoOfVehicles: "",
    DeviceRemoved: "",
    Deactivate: "",
    noOfRemovedDevice: "",
    companyName: "",
    alertDate: "",
    remark: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Deactivate Account mounted (activeStep):", activeStep);
    return () => console.log("Deactivate Account unmounted");
  }, [activeStep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.userName.trim()) validationErrors.userName = "User name is required.";
    if (!formData.companyName.trim()) validationErrors.companyName = "Company name is required.";
    if (!formData.totalNoOfVehicles.trim()) validationErrors.totalNoOfVehicles = "Total no. of vehicles is required.";
    if (!formData.Deactivate) validationErrors.Deactivate = "Please select a deactivation type.";

    // Only validate these when Temporary is chosen
    if (formData.Deactivate === "Temporary") {
      if (!formData.noOfRemovedDevice.trim()) validationErrors.noOfRemovedDevice = "Enter number of removed devices.";
      if (!formData.alertDate.trim()) validationErrors.alertDate = "Enter alert date.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form has errors");
      return;
    }

    console.log("DeactivateAccount: handleSubmit called, formData:", formData);

    try {
      if (typeof onNext === "function") {
        onNext(formData);
      }
      navigate("/sales/billing");
    } catch (err) {
      console.error("DeactivateAccount: error calling onNext:", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8">
          <h1 className="font-poppins text-2xl font-semibold text-gray-800 mb-6 text-center">
            Deactivate Account
          </h1>

          <form onSubmit={handleSubmit} className="font-poppins bg-white rounded-lg p-6 space-y-6">
            {/* User Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
              <input
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Enter user name"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
              />
              {errors.userName && <p className="text-red-500 text-xs">{errors.userName}</p>}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter company name"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
              />
              {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName}</p>}
            </div>

            {/* Total Vehicles */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total No. of Vehicles</label>
              <input
                type="number"
                name="totalNoOfVehicles"
                value={formData.totalNoOfVehicles}
                onChange={handleInputChange}
                placeholder="e.g. 25"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
              />
              {errors.totalNoOfVehicles && <p className="text-red-500 text-xs">{errors.totalNoOfVehicles}</p>}
            </div>

            {/* Device Removed (Yes/No) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Device Removed</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="DeviceRemoved"
                    value="Yes"
                    checked={formData.DeviceRemoved === "Yes"}
                    onChange={handleInputChange}
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="DeviceRemoved"
                    value="No"
                    checked={formData.DeviceRemoved === "No"}
                    onChange={handleInputChange}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Deactivation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deactivate Account</label>
              <div className="flex items-center gap-6">
                {["Temporary", "Permanent", "Delete From Debtors"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="Deactivate"
                      value={opt}
                      checked={formData.Deactivate === opt}
                      onChange={handleInputChange}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {errors.Deactivate && <p className="text-red-500 text-xs">{errors.Deactivate}</p>}
            </div>

            {/* No of Removed Devices - Only active if Temporary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No of Removed Devices</label>
              <input
                type="number"
                name="noOfRemovedDevice"
                value={formData.noOfRemovedDevice}
                onChange={handleInputChange}
                disabled={formData.Deactivate !== "Temporary"}
                placeholder="e.g. 5"
                className={`w-full border rounded-lg px-3 py-2 text-sm outline-none ${
                  formData.Deactivate !== "Temporary" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
              {errors.noOfRemovedDevice && <p className="text-red-500 text-xs">{errors.noOfRemovedDevice}</p>}
            </div>

            {/* Alert Date - Only active if Temporary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alert Date</label>
              <input
                type="date"
                name="alertDate"
                value={formData.alertDate}
                onChange={handleInputChange}
                disabled={formData.Deactivate !== "Temporary"}
                className={`w-full border rounded-lg px-3 py-2 text-sm outline-none ${
                  formData.Deactivate !== "Temporary" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
              {errors.alertDate && <p className="text-red-500 text-xs">{errors.alertDate}</p>}
            </div>

            {/* Remark */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter remarks..."
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-medium px-8 py-2 rounded-lg cursor-pointer transition hover:bg-blue-700"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeactivateAccount;