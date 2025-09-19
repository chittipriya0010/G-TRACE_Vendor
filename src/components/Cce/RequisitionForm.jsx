import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users } from "lucide-react";

export default function RequisitionForm() {
  const [formData, setFormData] = useState({
    homeToAssign: '',
    locationInput: '',
    clientDropdown: '',
    purposeDropdown: '',
    jobTypeDropdown: '',
    paymentStatus: 'Yes',
    overallMaterialRequired: '',
    productionDescription: { acWiring: '', sim: '', marker: '', bigTie: '' },
    productQty: { acWiring: '', sim: '', marker: '', bigTie: '' },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('prodDesc_')) {
      const key = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        productionDescription: {
          ...prev.productionDescription,
          [key]: value
        }
      }));
    } else if (name.startsWith('prodQty_')) {
      const key = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        productQty: {
          ...prev.productQty,
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      paymentStatus: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const todayStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/ /g, '.').replace(',', '');

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <div className="w-full mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8">
        {/* Top header with title, team, date */}
        <div className="flex justify-between items-center mb-8 justify-center">
          <h1 className="text-2xl font-bold text-gray-500 flex-1 text-center">Requisition Form</h1>
          <div className="flex items-center gap-4 text-blue-600 font-semibold text-sm absolute right-14">
            <div className="flex items-center gap-2 px-3 py-1 border border-blue-600 rounded-md">
              <Users size={16} />
              <span>Team D</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 border border-blue-600 rounded-md">
              <Calendar size={16} />
              <span>{todayStr}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {/* Home to assign */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Home to assign
              </label>
              <input
                type="text"
                name="homeToAssign"
                value={formData.homeToAssign}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Prabhakar"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="locationInput"
                value={formData.locationInput}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Mumbai"
                required
              />
            </div>

            {/* Client dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client
              </label>
              <select
                name="clientDropdown"
                value={formData.clientDropdown}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                required
              >
                <option value="">New</option>
                <option value="Client A">Client A</option>
                <option value="Client B">Client B</option>
              </select>
            </div>

            {/* Purpose dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose
              </label>
              <select
                name="purposeDropdown"
                value={formData.purposeDropdown}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                required
              >
                <option value="">E-lock</option>
                <option value="Purpose 1">Purpose 1</option>
                <option value="Purpose 2">Purpose 2</option>
              </select>
            </div>

            {/* Job Type dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job type
              </label>
              <select
                name="jobTypeDropdown"
                value={formData.jobTypeDropdown}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                required
              >
                <option value="">Service</option>
                <option value="Installation">Installation</option>
                <option value="Repair">Repair</option>
              </select>
            </div>

            {/* Payment Status (radio) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Status
              </label>
              <div className="flex items-center space-x-6 mt-2">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentStatus"
                      value={option}
                      checked={formData.paymentStatus === option}
                      onChange={handleRadioChange}
                      className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Overall Material Required */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Over All Material Required
              </label>
              <input
                type="number"
                name="overallMaterialRequired"
                value={formData.overallMaterialRequired}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="4"
                required
              />
            </div>
          </div>
          
          {/* Production Description and Product Qty grid */}
          <div className="grid grid-cols-2 gap-x-12 mt-6">
            <div>
              <div className="font-semibold text-gray-700 mb-2">
                Production Description
              </div>
              <div className="space-y-4">
                {['acWiring', 'sim', 'marker', 'bigTie'].map((key) => (
                  <input
                    key={key}
                    type="text"
                    name={`prodDesc_${key}`}
                    placeholder={{ acWiring: 'AC Wiring', sim: 'Sim', marker: 'Marker', bigTie: 'Big Tie' }[key]}
                    value={formData.productionDescription[key]}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="font-semibold text-gray-700 mb-2">
                Product Qty
              </div>
              <div className="space-y-4">
                {['acWiring', 'sim', 'marker', 'bigTie'].map((key) => (
                  <input
                    key={`qty_${key}`}
                    type="number"
                    name={`prodQty_${key}`}
                    placeholder="Qty"
                    value={formData.productQty[key]}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Buttons Section */}
          <div className="pt-8 flex justify-center space-x-4">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
