import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RequisitionForm() {
  const [formData, setFormData] = useState({
    assignInput: '',
    locationInput: '',
    clientDropdown: '',
    purposeDropdown: '',
    jobTypeDropdown: '',
    paymentStatus: 'Yes',
    overallMaterialRequired: '',
    productionDescription: { acWiring: '', sim: '', marker: '', bigTie: '' },
    productQty: { acWiring: '', sim: '', marker: '', bigTie: '' },
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For nested objects handle separately
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
    // TODO: handle form submission, validation etc
    navigate('/some-success-page'); // change according to your app
  };

  const todayStr = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Top header with title, team, date */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Requisition Form</h1>
          <div className="flex items-center gap-4 text-blue-600 font-semibold">
            <div className="px-3 py-1 border border-blue-600 rounded">Team D</div>
            <div>{todayStr}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Assign input, Location input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Assign Input</label>
              <input
                type="text"
                name="assignInput"
                value={formData.assignInput}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter assignment"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Location Input</label>
              <input
                type="text"
                name="locationInput"
                value={formData.locationInput}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter location"
                required
              />
            </div>
          </div>

          {/* Client dropdown, Purpose dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Client Dropdown</label>
              <select
                name="clientDropdown"
                value={formData.clientDropdown}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select Client</option>
                <option value="Client A">Client A</option>
                <option value="Client B">Client B</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Purpose Dropdown</label>
              <select
                name="purposeDropdown"
                value={formData.purposeDropdown}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select Purpose</option>
                <option value="Purpose 1">Purpose 1</option>
                <option value="Purpose 2">Purpose 2</option>
              </select>
            </div>
          </div>

          {/* Job Type dropdown, Payment Status (radio) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Job Type Dropdown</label>
              <select
                name="jobTypeDropdown"
                value={formData.jobTypeDropdown}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select Job Type</option>
                <option value="Installation">Installation</option>
                <option value="Repair">Repair</option>
                <option value="Service">Service</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Payment Status</label>
              <div className="flex items-center space-x-6 mt-1">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentStatus"
                      value={option}
                      checked={formData.paymentStatus === option}
                      onChange={handleRadioChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Overall Material Required */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Over All Material Required</label>
            <input
              type="number"
              name="overallMaterialRequired"
              value={formData.overallMaterialRequired}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter number"
              required
            />
          </div>

          {/* Production Description and Product Qty Inline */}
          <div>
  <div className="mb-3 font-medium text-gray-700">Production Description</div>
  <div className="grid grid-cols-4 gap-3">
    {['acWiring', 'sim', 'marker', 'bigTie'].map((key) => (
      <input
        key={key}
        type="text"
        name={`prodDesc_${key}`}
        placeholder={{ acWiring: 'AC Wiring', sim: 'Sim', marker: 'Marker', bigTie: 'Big Tie' }[key]}
        value={formData.productionDescription[key]}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    ))}
  </div>

  <div className="mb-3 font-medium text-gray-700 mt-6">Product Qty.</div>
  <div className="grid grid-cols-4 gap-3">
    {['acWiring', 'sim', 'marker', 'bigTie'].map((key) => (
      <input
        key={`qty_${key}`}
        type="number"
        name={`prodQty_${key}`}
        placeholder="Qty"
        value={formData.productQty[key]}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    ))}
  </div>
</div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
