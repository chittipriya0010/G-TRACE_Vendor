// components/Cce/MessagePopup.jsx
import React from "react";
import PopupWrapper from "./PopupWrapper";

const MessagePopup = ({
  show,
  onClose,
  mobileNumber,
  setMobileNumber,
  messageText,
  setMessageText,
  handleSendText,
}) => {
  if (!show) return null;

  return (
    <PopupWrapper title="Send SMS" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Numbers</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <textarea
            rows={4}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-gray-50"
          />
        </div>

        <div className="flex justify-center gap-3 pt-3">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={handleSendText}
          >
            Submit
          </button>
          <button
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors bg-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default MessagePopup;
