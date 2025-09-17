import React, { useState } from "react";
import { User, Building, File } from "lucide-react";

const RaiseService = () => {
  const [formData, setFormData] = useState({
    clientUserName: "lotusvalleynodia",
    companyName: "Highway Trans services Pvt Ltd",
    registrationNo: "UP16TJ4492",
    deviceIMEI: "1194042",
    dateOfInstallation: "2015-10-08T13:35:46",
    notWorking: "2024-04-11T00:05:41",
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
    personName: "",
    fromTime: "",
    toTime: "",
    contactNo: "",
    remark: "",
  });

  const deviceModelOptions = ["Model A", "Model B", "Model C"];

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
    alert("Service request submitted!");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow space-y-8">
      <h2 className="text-2xl font-semibold text-center">Raise Service</h2>

      {/* Upper info boxes */}
      <div className="grid grid-cols-3 gap-6 text-gray-700 font-medium text-sm">
        <div className="flex items-center gap-2">
          <User className="text-orange-500" />
          <div>
            <div>Client User Name:*</div>
            <div className="font-semibold">{formData.clientUserName}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Building className="text-sky-500" />
          <div>
            <div>Company Name:*</div>
            <div className="font-semibold">{formData.companyName}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <File className="text-pink-500" />
          <div>
            <div>Registration No*</div>
            <div className="font-semibold">{formData.registrationNo}</div>
          </div>
        </div>
      </div>

      {/* Two column grid form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-12 gap-y-6 text-gray-800">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Device IMEI:*</label>
            <div className="px-2 py-1 bg-gray-100 rounded">{formData.deviceIMEI}</div>
          </div>

          <div>
            <label className="block font-medium mb-1">Date Of Installation:*</label>
            <div className="px-2 py-1 bg-gray-100 rounded">
              {new Date(formData.dateOfInstallation).toLocaleString()}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Not Working:*</label>
            <div className="px-2 py-1 bg-gray-100 rounded">
              {new Date(formData.notWorking).toLocaleString()}
            </div>
          </div>

          {/* Issues checkboxes */}
          <div>
            <label className="block font-medium mb-2">Issue:</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(formData.issue).map((key) => (
                <label key={key} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={key}
                    checked={formData.issue[key]}
                    onChange={handleChange}
                    className="form-checkbox text-blue-600"
                  />
                  <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block font-medium mb-1">Location:*</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="deviceModel" className="block font-medium mb-1">Device Model:*</label>
            <select
              id="deviceModel"
              name="deviceModel"
              value={formData.deviceModel}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="" disabled>Select One</option>
              {deviceModelOptions.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contactNo" className="block font-medium mb-1">Contact No:*</label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="9876543210"
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Branch radio buttons */}
          <div>
            <span className="block font-medium mb-1">Branch:*</span>
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="branch"
                value="Delhi"
                checked={formData.branch === "Delhi"}
                onChange={handleChange}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">Delhi</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="branch"
                value="Inter Branch"
                checked={formData.branch === "Inter Branch"}
                onChange={handleChange}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">Inter Branch</span>
            </label>
          </div>

          <div>
            <label htmlFor="personName" className="block font-medium mb-1">Person Name:*</label>
            <input
              type="text"
              id="personName"
              name="personName"
              value={formData.personName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="fromTime" className="block font-medium mb-1">From Time:*</label>
            <input
              type="date"
              id="fromTime"
              name="fromTime"
              value={formData.fromTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="toTime" className="block font-medium mb-1">To Time:*</label>
            <input
              type="date"
              id="toTime"
              name="toTime"
              value={formData.toTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Remark textarea */}
          <div className="col-span-2">
            <label htmlFor="remark" className="block font-medium mb-1">Remark:*</label>
            <textarea
              id="remark"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-center gap-6 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-10 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  clientUserName: "lotusvalleynodia",
                  companyName: "Highway Trans services Pvt Ltd",
                  registrationNo: "UP16TJ4492",
                  deviceIMEI: "1194042",
                  dateOfInstallation: "2015-10-08T13:35:46",
                  notWorking: "2024-04-11T00:05:41",
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
                  personName: "",
                  fromTime: "",
                  toTime: "",
                  contactNo: "",
                  remark: "",
                })
              }
              className="bg-gray-300 text-gray-700 px-10 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RaiseService;