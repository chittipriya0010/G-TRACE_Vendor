import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NewAccountCreation = ({ onNext, activeStep }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    mobileNumber: "",
    companyName: "",
    state: "",
    potential: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log("NewAccountCreation mounted (activeStep):", activeStep);
    return () => console.log("NewAccountCreation unmounted");
  }, [activeStep]);

  const steps = [
    { id: 0, title: "Client Details", subtitle: "" },
    { id: 1, title: "Billing", subtitle: "" },
    { id: 2, title: "Package", subtitle: "" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error when typing
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.firstName.trim()) validationErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) validationErrors.lastName = "Last name is required.";

    if (!formData.emailAddress.trim()) {
      validationErrors.emailAddress = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      validationErrors.emailAddress = "Enter a valid email.";
    }

    if (!formData.mobileNumber.trim()) {
      validationErrors.mobileNumber = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      validationErrors.mobileNumber = "Enter a valid 10-digit number.";
    }

    if (!formData.companyName.trim()) validationErrors.companyName = "Company name is required.";
    if (!formData.state.trim()) validationErrors.state = "Please select a state.";
    if (!formData.potential.trim()) validationErrors.potential = "Please select potential.";
    if (!formData.address.trim()) validationErrors.address = "Address is required.";

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

   const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form has errors");
      return;
    }

    console.log("NewAccountCreation: handleSubmit called, formData:", formData);

    try {
      if (typeof onNext === "function") {
        onNext(formData); // inform parent with data
      } else {
        console.error("NewAccountCreation: onNext is not a function");
      }

      // Navigate to the next step route
      navigate("/sales/billing");  // Adjust route path as per your router setup

    } catch (err) {
      console.error("NewAccountCreation: error calling onNext:", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-poppins text-2xl font-semibold text-gray-800 mb-2">
              New account creation
            </h1>
          </div>

          {/* Progress Stepper */}
          <div className="font-poppins flex items-center justify-center mb-10">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm ${
                      activeStep > idx
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

          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            className="font-poppins bg-gray-50 rounded-lg p-6 mb-6"
          >
            <div className="font-poppins bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium text-blue-600 mb-6">
                Client Personal Information
              </h2>

              <div className="flex flex-col gap-4">
                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none transition-all bg-white ${
                        errors.firstName
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none bg-white ${
                        errors.lastName
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email + Mobile */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      placeholder="mahi123@gmail.com"
                      className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none bg-white ${
                        errors.emailAddress
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                    {errors.emailAddress && (
                      <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none bg-white ${
                        errors.mobileNumber
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                    {errors.mobileNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
                    )}
                  </div>
                </div>

                {/* Company + State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Flexpack (Pvt) (Ltd)"
                      className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none bg-white ${
                        errors.companyName
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      }`}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none bg-white ${
                        errors.state
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      }`}
                    >
                      <option value="">Select a state</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </select>
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                    )}
                  </div>
                </div>

                {/* Potential */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Potential
                    </label>
                    <select
                      name="potential"
                      value={formData.potential}
                      onChange={handleInputChange}
                      className={`w-full max-w-xs border rounded-lg px-3 py-2 text-sm outline-none bg-white ${
                        errors.potential
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                      }`}
                    >
                      <option value="">Select one</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    {errors.potential && (
                      <p className="text-red-500 text-xs mt-1">{errors.potential}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="116, satinder jeet singh sh, nr..."
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white resize-none h-24 ${
                      errors.address
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-medium px-8 py-2 rounded-lg cursor-pointer transition hover:bg-blue-700"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAccountCreation;