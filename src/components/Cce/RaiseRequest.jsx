import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  UserRound,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";

export default function RaiseRequest() {
  const [formData, setFormData] = useState({
    jobType: "Installation",
    companyName: "Aman Bus",
    clientName: "Aman",
    contactNo: "9876543210",
    location: "Mumbai",
    deviceModel: "RTPL",
    vehicleType: "Car",
    required: {
      fuelSensor: false,
      rfid: false,
      doorSensor: false,
      panicButton: false,
      immobilizer: false,
      buzzerSensor: false,
      speedAlarm: false,
      temperatureSensor: false,
    },
    availableTimeSlots: "",
    payment: "Yes",
    remarks: "",
    noOfInstallation: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      required: {
        ...prev.required,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // In a real app, you would submit this data to a backend.
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/cce/view-job");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-4 sm:pt-8 sm:pb-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-4 sm:p-6 mb-8">
        {/* Header Section */}
        <div className="mb-8 p-4 rounded-lg">
          <h1 className="text-2xl font-bold text-gray-500 text-center">
            Raise Request (Job)
          </h1>
        </div>

        {/* Job Type Tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-4 justify-center">
          <span className="text-sm font-semibold text-gray-700 mb-8">
            Job Type:
          </span>
          <div className="flex flex-wrap gap-2 mb-8">
            {["Installation", "Removal", "Service"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  handleInputChange({
                    target: { name: "jobType", value: type },
                  })
                }
                className={`px-4 py-2 text-sm font-medium border rounded-full transition-colors ${
                  formData.jobType === type
                    ? "bg-orange-500 text-white shadow-md"
                    : "hover:bg-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Main Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Company Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Company Name:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Client Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Client Name:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Contact No */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Contact No:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Location:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Device Model */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Device Model:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="deviceModel"
                  value={formData.deviceModel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Vehicle Type:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex items-center space-x-6 mt-2">
                {["Car", "Truck", "Bus"].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="vehicleType"
                      value={type}
                      checked={formData.vehicleType === type}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Required Checkboxes */}
            <div className="md:col-span-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                Required:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  { key: "fuelSensor", label: "Fuel Sensor" },
                  { key: "rfid", label: "RFID" },
                  { key: "doorSensor", label: "Door Sensor" },
                  { key: "panicButton", label: "Panic Button" },
                  { key: "immobilizer", label: "Immobilizer" },
                  { key: "buzzerSensor", label: "Car Buzzer" },
                  { key: "speedAlarm", label: "Speed Alarm" },
                  {
                    key: "temperatureSensor",
                    label: "Temperature Sensor",
                  },
                ].map((item) => (
                  <label key={item.key} className="flex items-center">
                    <input
                      type="checkbox"
                      name={item.key}
                      checked={formData.required[item.key] || false}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Available Time Slots */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Available Time slots:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="availableTimeSlots"
                  value={formData.availableTimeSlots}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Select Time Slot</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                  <option value="evening">Evening (4 PM - 7 PM)</option>
                </select>
              </div>
            </div>

            {/* Payment */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Payment:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex items-center space-x-6 mt-2">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      value={option}
                      checked={formData.payment === option}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Remarks - Full width */}
            <div className="md:col-span-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Remark:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            {/* No of Installation */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                No of Installation:
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                name="noOfInstallation"
                value={formData.noOfInstallation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex justify-center space-x-4 pt-6">
            <button
              onClick={handleSubmit}
              className="px-8 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
