import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RaiseRequestForm() {
  const [formData, setFormData] = useState({
    jobType: 'Installation',
    companyName: 'Aman Bus',
    clientName: 'Aman',
    contactNo: '9876543210',
    location: 'Mumbai',
    deviceModel: 'STPL',
    vehicleType: 'Car',
    required: {
      fuelSensor: false,
      doorSensor: false,
      immobilizer: false,
      buzzerSensor: false,
      gprsAntenna: false,
      gpsAntenna: false,
      speedAlarm: false,
      mfcReader: false
    },
    availableTimeSlots: '',
    payment: 'Yes',
    remarks: '',
    noOfInstallation: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      required: {
        ...prev.required,
        [name]: checked
      }
    }));
  };

  const handleRadioChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    navigate("/cce/view-job");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <h1 className="text-xl font-medium text-gray-800 mb-6">
          Raise Request (Job)
        </h1>

        {/* Job Type Tabs */}
        <div className="flex border-gray-200 mb-6">
          {['Installation', 'Removal', 'Service'].map((type) => (
            <button
              key={type}
              onClick={() => handleInputChange({ target: { name: 'jobType', value: type } })}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                formData.jobType === type
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact No <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="deviceModel"
                value={formData.deviceModel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-6 mt-2">
                {['Car', 'Truck', 'Bus'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="vehicleType"
                      value={type}
                      checked={formData.vehicleType === type}
                      onChange={(e) => handleRadioChange('vehicleType', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Required Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Required <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'fuelSensor', label: 'Fuel Sensor' },
                { key: 'doorSensor', label: 'Door Sensor' },
                { key: 'immobilizer', label: 'Immobilizer' },
                { key: 'buzzerSensor', label: 'Buzzer Sensor' },
                { key: 'gprsAntenna', label: 'GPRS Antenna' },
                { key: 'gpsAntenna', label: 'GPS Antenna' },
                { key: 'speedAlarm', label: 'Speed Alarm' },
                { key: 'mfcReader', label: 'MFC Reader' }
              ].map((item) => (
                <label key={item.key} className="flex items-center">
                  <input
                    type="checkbox"
                    name={item.key}
                    checked={formData.required[item.key]}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fourth Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Time slots <span className="text-red-500">*</span>
              </label>
              <select
                name="availableTimeSlots"
                value={formData.availableTimeSlots}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select time slot</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                <option value="evening">Evening (4 PM - 7 PM)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-6 mt-2">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value={option}
                      checked={formData.payment === option}
                      onChange={(e) => handleRadioChange('payment', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remarks <span className="text-red-500">*</span>
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* No of Installation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No of Installation <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="noOfInstallation"
                value={formData.noOfInstallation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
                onClick={handleSubmit}
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-400 text-white text-sm font-medium rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}