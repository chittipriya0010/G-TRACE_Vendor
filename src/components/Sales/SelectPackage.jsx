import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const deviceTypes = ["Printer", "Scanner", "Laptop", "Desktop"];

const models = {
  Printer: ["HP LaserJet", "Canon Pixma", "Epson EcoTank"],
  Scanner: ["Fujitsu ScanSnap", "Epson Perfection"],
  Laptop: ["Dell XPS 13", "MacBook Pro", "Lenovo ThinkPad"],
  Desktop: ["Dell OptiPlex", "HP EliteDesk"],
};

const accounts = ["Account A", "Account B", "Account C"];

const paymentMethods = ["Cash", "Cheque / RTGS"];
const plans = ["Monthly", "Quarterly", "Half Yearly", "Yearly"];

// Fixed GST constants
const GST_VALUES = {
  hardware: 5900,
  installation: 5500,
  hardwareOnLease: 5500,
  subscription: 5500,
};

const SelectPackage = ({ activeStep, onConfirm }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    deviceType: "",
    model: "",
    account: "",
    paymentMethod: "Cash",
    hardware: "",
    hardwareGstIncluded: false,
    installation: "",
    installationGstIncluded: false,
    hardwareOnLease: "",
    leasePlan: "Half Yearly",
    leaseMonths: "",
    leaseGstIncluded: true,
    subscription: "",
    subscriptionPlan: "Half Yearly",
    subscriptionGstIncluded: true,
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
  setErrors((prev) => ({ ...prev, [name]: "" }));
};

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!form.deviceType) validationErrors.deviceType = "Device type is required.";
    if (!form.model) validationErrors.model = "Model is required.";
    if (!form.account) validationErrors.account = "Account is required.";
    if (!form.paymentMethod) validationErrors.paymentMethod = "Payment method is required.";
    if (!form.hardware) validationErrors.hardware = "Hardware value required.";
    if (!form.installation) validationErrors.installation = "Installation value required.";
    if (!form.hardwareOnLease) validationErrors.hardwareOnLease = "Hardware lease required.";
    if (!form.leaseMonths) validationErrors.leaseMonths = "Months required.";
    if (!form.subscription) validationErrors.subscription = "Subscription required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowPopup(true);
  };

  const handleConfirmYes = () => {
    console.log("Selected Package:", form);
    setShowPopup(false);
    if (onConfirm) onConfirm();
    navigate("/sales/display-billed");  // Navigate to DisplayBilledInformation
  };
  const handleConfirmNo = () => {
    setShowPopup(false);
    if (onConfirm) onConfirm();
    navigate("/sales/new-account");    // Navigate back to NewAccountCreation
  }

  return (
    <div className="bg-gray-50 min-h-screen font-poppins">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-10">
            {["Client Details", "Billing", "Package Select"].map((title, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm ${
                      activeStep >= idx ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-blue-600 text-blue-600"
                    }`}
                  >
                    {activeStep > idx ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (idx + 1)}
                  </div>
                  <span className={`ml-2 font-semibold ${activeStep >= idx ? "text-blue-600" : "text-gray-400"}`}>
                    {title}
                  </span>
                </div>
                {idx < 2 && <div className={`flex-1 h-0.5 mx-4 ${activeStep > idx ? "bg-blue-600" : "bg-gray-300"}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Device Type */}
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Device Type:<span className="text-red-500">*</span></label>
              <select name="deviceType" value={form.deviceType} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
                <option value="">Select Device</option>
                {deviceTypes.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.deviceType && <p className="text-xs text-red-500">{errors.deviceType}</p>}
            </div>

            {/* Model */}
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Model No:<span className="text-red-500">*</span></label>
              <select name="model" value={form.model} onChange={handleChange} disabled={!form.deviceType}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
                <option value="">Select Model</option>
                {(models[form.deviceType] || []).map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              {errors.model && <p className="text-xs text-red-500">{errors.model}</p>}
            </div>

            {/* Account */}
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Account:<span className="text-red-500">*</span></label>
              <select name="account" value={form.account} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
                <option value="">Select Account</option>
                {accounts.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              {errors.account && <p className="text-xs text-red-500">{errors.account}</p>}
            </div>

            {/* Payment */}
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Select Payment:<span className="text-red-500">*</span></label>
              <div className="space-x-4">
                {paymentMethods.map((pm) => (
                  <label key={pm} className="text-sm">
                    <input type="radio" name="paymentMethod" value={pm}
                      checked={form.paymentMethod === pm} onChange={handleChange} /> {pm}
                  </label>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-xs text-red-500">{errors.paymentMethod}</p>}
            </div>

            {/* Hardware */}
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Hardware:<span className="text-red-500">*</span></label>
              <input name="hardware" value={form.hardware} onChange={handleNumberChange}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"/>
              {errors.hardware && <p className="text-xs text-red-500">{errors.hardware}</p>}
              <div className="flex justify-between text-black-600 font-bold mt-1">
  <span>Gst*</span>
  <span>₹{GST_VALUES.hardware}</span>
</div>
              <div className="space-x-4 mt-1 text-sm">
                <label><input type="radio" checked={!form.hardwareGstIncluded}
                  onChange={() => setForm((p) => ({ ...p, hardwareGstIncluded: false }))}/> Excluding</label>
                <label><input type="radio" checked={form.hardwareGstIncluded}
                  onChange={() => setForm((p) => ({ ...p, hardwareGstIncluded: true }))}/> Including</label>
              </div>
            </div>

            {/* Installation */}
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Installation:<span className="text-red-500">*</span></label>
              <input name="installation" value={form.installation} onChange={handleNumberChange}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"/>
              {errors.installation && <p className="text-xs text-red-500">{errors.installation}</p>}
              <div className="flex justify-between text-black-600 font-bold mt-1">
  <span>Gst*</span>
  <span>₹{GST_VALUES.installation}</span>
</div>
              <div className="space-x-4 mt-1 text-sm">
                <label><input type="radio" checked={!form.installationGstIncluded}
                  onChange={() => setForm((p) => ({ ...p, installationGstIncluded: false }))}/> Excluding</label>
                <label><input type="radio" checked={form.installationGstIncluded}
                  onChange={() => setForm((p) => ({ ...p, installationGstIncluded: true }))}/> Including</label>
              </div>
            </div>

            {/* Hardware Lease */}
            <div className="col-span-2">
              <label className="font-semibold text-gray-700 block mb-1">Hardware on Lease:<span className="text-red-500">*</span></label>
              <input name="hardwareOnLease" value={form.hardwareOnLease} onChange={handleNumberChange}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"/>
              {errors.hardwareOnLease && <p className="text-xs text-red-500">{errors.hardwareOnLease}</p>}
              <div className="flex justify-between text-black-600 font-bold mt-1">
  <span>Gst*</span>
  <span>₹{GST_VALUES.hardwareOnLease}</span>
</div>
              <div className="flex items-center gap-4 mt-2">
                <label>Select Plan</label>
                <select name="leasePlan" value={form.leasePlan} onChange={handleChange}
                  className="border rounded-lg px-3 py-2 bg-white">
                  {plans.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <label>Month</label>
                <input name="leaseMonths" value={form.leaseMonths} onChange={handleNumberChange} type="number"
                  className="w-20 border rounded-lg px-2 py-1"/>
              </div>
              {errors.leaseMonths && <p className="text-xs text-red-500">{errors.leaseMonths}</p>}
              <div className="text-sm mt-2 space-x-4">
                <label><input type="radio" checked={form.leaseGstIncluded}
                  onChange={() => setForm((p) => ({ ...p, leaseGstIncluded: true }))}/> Including</label>
                <label><input type="radio" checked={!form.leaseGstIncluded}
                  onChange={() => setForm((p) => ({ ...p, leaseGstIncluded: false }))}/> Excluding</label>
              </div>
            </div>

            {/* Subscription */}
            <div className="col-span-2">
              <label className="font-semibold text-gray-700 block mb-1">Subscription:<span className="text-red-500">*</span></label>
              <input name="subscription" value={form.subscription} onChange={handleNumberChange}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"/>
              {errors.subscription && <p className="text-xs text-red-500">{errors.subscription}</p>}
              <div className="flex justify-between text-black-600 font-bold mt-1">
  <span>Gst*</span>
  <span>₹{GST_VALUES.subscription}</span>
</div>
              <div className="flex items-center gap-4 mt-2">
                <label>Select Plan</label>
                <select name="subscriptionPlan" value={form.subscriptionPlan} onChange={handleChange}
                  className="border rounded-lg px-3 py-2 bg-white">
                  {plans.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="text-sm mt-2 space-x-4">
                <label><input type="radio" checked={form.subscriptionGstIncluded}
                  onChange={() => setForm((p) => ({ ...p, subscriptionGstIncluded: true }))}/> Including</label>
                <label><input type="radio" checked={!form.subscriptionGstIncluded}
                  onChange={() => setForm((p) => ({ ...p, subscriptionGstIncluded: false }))}/> Excluding</label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 text-center">
            <button onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-10 py-3 rounded-lg transition">
              SUBMIT
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-poppins">
          <div className="bg-white rounded-2xl p-10 max-w-md w-11/12 text-center shadow-xl">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              You have selected Hardware on Lease for {form.leasePlan} package up to {form.leaseMonths} months
            </h2>
            <p className="text-lg text-gray-600 mb-6">Do you want to confirm it?</p>
            <div className="flex gap-4 justify-center">
              <button onClick={handleConfirmNo}
                className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50">
                No
              </button>
              <button onClick={handleConfirmYes}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectPackage;