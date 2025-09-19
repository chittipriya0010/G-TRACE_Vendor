import React from "react";
import PopupWrapper from "./PopupWrapper";
import { X } from "lucide-react";

const MailPopup = ({ show, onClose, handleSendMail }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
      {/* Popup */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg md:max-w-xl lg:max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b-2 border-orange-300 flex-shrink-0">
          <h2 className="text-xl font-medium text-gray-800">Send Mail/Repair Done</h2>
          <button
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 transition-colors"
            onClick={onClose}
            aria-label="Close popup"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* First row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Username<span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                <option>Select Name</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No. of vehicles<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Add Vehicle button */}
          <div>
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Add Vehicle
            </button>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle No.<span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                <option>Select Vehicle</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Receiving Date of Device<span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                <option>Select Date</option>
              </select>
            </div>
          </div>

          {/* Third row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status<span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                <option>Select Status</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warranty/out of warranty<span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                <option>Select Warranty</option>
              </select>
            </div>
          </div>

          {/* Fourth row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Spare changed<span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                <option>Select Spare Part</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Spare Cost<span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                <option>Select Cost</option>
              </select>
            </div>
          </div>

          {/* Remove button */}
          <div>
            <button className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors">
              Remove
            </button>
          </div>

          {/* Subject field */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Repair Detail"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* To and CC fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CC<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={handleSendMail}
              className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Send E-mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailPopup;
