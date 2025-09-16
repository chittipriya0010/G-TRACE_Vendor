import React, { useState } from "react";
import { ChevronLeft, User, Building2, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const EditBill = ({ company, onSave }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: company?.user || "Pooja Sharma",
    companyName: company?.company || "Creative Edge Pvt Ltd",
    address: "Sarai Jullena Gandhi Transport Nagar Delhi 12",
    monthYear: "Jan 2025",
    pricePerUnit: 200,
    discount: 50000,
    totalAmount: 70000,
    vehicles: [
      { id: 1, vehicleNo: "HR20AT77", duration: "28 days", price: 200, selected: false },
      { id: 2, vehicleNo: "HR20AT77", duration: "28 days", price: 200, selected: false },
      { id: 3, vehicleNo: "HR20AT77", duration: "15 days", price: 200, selected: false },
      { id: 4, vehicleNo: "HR20AT77", duration: "15 days", price: 200, selected: false },
      { id: 5, vehicleNo: "HR20AT77", duration: "1 month", price: 200, selected: false },
      { id: 6, vehicleNo: "HR20AT77", duration: "1 Month", price: 200, selected: false },
      { id: 7, vehicleNo: "HR20AT77", duration: "1 Month", price: 200, selected: false },
      { id: 8, vehicleNo: "HR20AT77", duration: "1 Month", price: 200, selected: false },
    ]
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBack = () => {
    // If you want to do any custom logic on back, do here

    // Navigate to /sales/display-billed
    navigate("/sales/display-billed");
  };

  const handleVehicleToggle = (vehicleId) => {
    setFormData(prev => ({
      ...prev,
      vehicles: prev.vehicles.map(vehicle =>
        vehicle.id === vehicleId
          ? { ...vehicle, selected: !vehicle.selected }
          : vehicle
      )
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ChevronLeft size={20} />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User size={16} className="inline mr-1" />
            User Name
          </label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => handleInputChange('userName', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building2 size={16} className="inline mr-1" />
            Company Name
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin size={16} className="inline mr-1" />
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} className="inline mr-1" />
            Month/Year
          </label>
          <input
            type="text"
            value={formData.monthYear}
            onChange={(e) => handleInputChange('monthYear', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Price Information */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Unit</label>
          <input
            type="number"
            value={formData.pricePerUnit}
            onChange={(e) => handleInputChange('pricePerUnit', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
          <input
            type="number"
            value={formData.discount}
            onChange={(e) => handleInputChange('discount', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
          <input
            type="number"
            value={formData.totalAmount}
            onChange={(e) => handleInputChange('totalAmount', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-end">
          <button className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 mr-2">
            Submit
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Billed
          </button>
        </div>
      </div>

      {/* Vehicle List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border-b font-medium text-sm text-gray-700">
          <div>Vehicle No</div>
          <div>Duration</div>
          <div>Price</div>
        </div>
        
        {formData.vehicles.map((vehicle) => (
          <div key={vehicle.id} className="grid grid-cols-3 gap-4 p-4 border-b border-gray-100 items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={vehicle.selected}
                onChange={() => handleVehicleToggle(vehicle.id)}
                className="mr-2 rounded"
              />
              <span className="text-sm">{vehicle.vehicleNo}</span>
            </div>
            <div className="text-sm text-gray-600">{vehicle.duration}</div>
            <div className="text-sm">₹ {vehicle.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditBill;