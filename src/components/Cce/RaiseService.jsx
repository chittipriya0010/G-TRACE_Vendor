import React, { useState } from "react";
import { User, Building, File, CalendarDays, TabletSmartphone, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RaiseService = () => {
  const [formData, setFormData] = useState({
    clientUserName: "lotusvalleynoida",
    companyName: "Highway Trans services Pvt Ltd (Lotus Valley Noida)",
    registrationNo: "UP16JT4492",
    deviceIMEI: "1194042",
    dateOfInstallation: "2015-10-08 13:35:46",
    notWorking: "2024-04-11 00:05:41",
    issue: {
      AC: false,
      IPBox: false,
      Panic: false,
      Temperature: false,
      Other: false,
      NotWorking: false,
      Immobilize: false,
    },
    location: "Mumbai",
    branch: "Delhi",
    deviceModel: "",
    personName: "Amar",
    fromTime: "2024-12-10",
    toTime: "2025-01-02",
    contactNo: "9876543210",
    remark: "",
  });

  const deviceModelOptions = ["Select One", "Model A", "Model B", "Model C"];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        issue: { ...prev.issue, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can replace this with a custom modal or message box
    console.log("Service request submitted!");
  };

  const issueLabels = {
    AC: "AC",
    IPBox: "IP Box",
    Panic: "Panic",
    Temperature: "Temperature",
    Other: "Other",
    NotWorking: "Not Working",
    Immobilize: "Immobilize",
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/cce/not-working");
  };

  return (
    <div className="min-h-screen p-2 sm:p-14 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 sm:p-10 space-y-8">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-500">
          Raise Service
        </h2>

        {/* Upper Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 text-sm border-b pb-6">
          {/* Client User Name */}
          <div className="flex items-center gap-3 p-3 rounded-lg min-w-0">
            <div className="p-2 bg-red-100 rounded-md">
              <User className="text-red-500 w-5 h-5" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="font-medium text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                Client User Name:<span className="text-red-500">*</span>
              </div>
              <div className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                {formData.clientUserName}
              </div>
            </div>
            <div>|</div>
          </div>

          {/* Company Name */}
          <div className="flex items-center gap-3 p-3 rounded-lg min-w-0">
            <div className="p-2 bg-teal-100 rounded-md">
              <Building className="text-teal-500 w-5 h-5" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="font-medium text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                Company Name:<span className="text-red-500">*</span>
              </div>
              <div className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                {formData.companyName}
              </div>
            </div>
            <div>|</div>
          </div>

          {/* Registration No */}
          <div className="flex items-center gap-3 p-3 rounded-lg min-w-0">
            <div className="p-2 bg-blue-100 rounded-md">
              <File className="text-blue-500 w-5 h-5" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="font-medium text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                Registration No<span className="text-red-500">*</span>
              </div>
              <div className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                {formData.registrationNo}
              </div>
            </div>
          </div>

          {/* Device IMEI */}
          <div className="flex items-center gap-3 p-3 rounded-lg min-w-0">
            <div className="p-2 bg-red-100 rounded-md">
              <Search className="text-red-500 w-5 h-5" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="font-medium text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                Device IMEI:<span className="text-red-500">*</span>
              </div>
              <div className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                {formData.deviceIMEI}
              </div>
            </div>
            <div>|</div>
          </div>

          {/* Date Of Installation */}
          <div className="flex items-center gap-3 p-3 rounded-lg min-w-0">
            <div className="p-2 bg-teal-100 rounded-md">
              <CalendarDays className="text-teal-500 w-5 h-5" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="font-medium text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                Date Of Installation:<span className="text-red-500">*</span>
              </div>
              <div className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                {new Date(formData.dateOfInstallation).toLocaleDateString()}
              </div>
            </div>
            <div>|</div>
          </div>

          {/* Not working */}
          <div className="flex items-center gap-3 p-3 rounded-lg min-w-0">
            <div className="p-2 bg-orange-100 rounded-md">
              <TabletSmartphone className="text-orange-500 w-5 h-5" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="font-medium text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                Not working:<span className="text-red-500">*</span>
              </div>
              <div className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                {new Date(formData.notWorking).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Main form grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-3 md:grid-cols-2 gap-x-12 gap-y-6 text-gray-800">
          {/* Issue Checkboxes - Full width */}
          <div className="md:col-span-2">
            <span className="block text-sm font-bold text-gray-700 mb-2">Issue:<span className="text-red-500">*</span></span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.keys(formData.issue).map((key) => (
                <label key={key} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={key}
                    checked={formData.issue[key]}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{issueLabels[key]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-1">
              Location:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Branch Radio Buttons */}
          <div>
            <span className="block text-sm font-bold text-gray-700 mb-1">Branch:<span className="text-red-500">*</span></span>
            <div className="flex gap-6 mt-2">
              <label className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="branch"
                  value="Delhi"
                  checked={formData.branch === "Delhi"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700">Delhi</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="branch"
                  value="Inter Branch"
                  checked={formData.branch === "Inter Branch"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700">Inter Branch</span>
              </label>
            </div>
          </div>

          {/* Device Model */}
          <div>
            <label htmlFor="deviceModel" className="block text-sm font-bold text-gray-700 mb-1">
              Device Model:<span className="text-red-500">*</span>
            </label>
            <select
              id="deviceModel"
              name="deviceModel"
              value={formData.deviceModel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              required
            >
              {deviceModelOptions.map((model) => (
                <option key={model} value={model} disabled={model === "Select One"}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Person Name */}
          <div>
            <label htmlFor="personName" className="block text-sm font-bold text-gray-700 mb-1">
              Person Name:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="personName"
              name="personName"
              value={formData.personName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* From Time */}
          <div className="relative">
            <label htmlFor="fromTime" className="block text-sm font-bold text-gray-700 mb-1">
              From Time:<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="fromTime"
              name="fromTime"
              value={formData.fromTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* To Time */}
          <div className="relative">
            <label htmlFor="toTime" className="block text-sm font-bold text-gray-700 mb-1">
              To Time:<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="toTime"
              name="toTime"
              value={formData.toTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Contact No */}
          <div>
            <label htmlFor="contactNo" className="block text-sm font-bold text-gray-700 mb-1">
              Contact No:<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Empty div for layout balance in a grid */}
          <div className="hidden md:block"></div>

          {/* Remark textarea - Full width */}
          <div className="md:col-span-2">
            <label htmlFor="remark" className="block text-sm font-bold text-gray-700 mb-1">
              Remark:<span className="text-red-500">*</span>
            </label>
            <textarea
              id="remark"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              required
            />
          </div>

          {/* Buttons - Full width, centered */}
          <div className="md:col-span-2 flex justify-center gap-6 pt-4">
            <button
              type="submit"
              className="px-10 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-10 py-2 bg-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseService;
