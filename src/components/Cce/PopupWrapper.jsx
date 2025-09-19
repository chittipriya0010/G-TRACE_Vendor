// components/Cce/PopupWrapper.jsx
import React from "react";
import { X } from "lucide-react";

const PopupWrapper = ({ title, onClose, children, titleStyle = "", isMailPopup = false }) => (
  <>
    {/* Backdrop */}
    <div className="fixed inset-0 bg-black/40 z-[9998] !z-[9998]" onClick={onClose} />

    {/* Popup */}
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        bg-white rounded-lg shadow-xl z-[9999] !z-[9999]
        ${isMailPopup
          ? "w-[80vw] max-w-[700px] max-h-[85vh] overflow-y-auto"
          : "w-[450px] max-w-[85vw]"}
      `}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-orange-300 sticky top-0 bg-white z-10">
        <h2 className={`text-lg font-medium text-gray-800 ${titleStyle}`}>{title}</h2>
        <button
          className="text-gray-400 hover:text-gray-600 rounded-full p-1"
          onClick={onClose}
          aria-label="Close popup"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">{children}</div>
    </div>
  </>
);

export default PopupWrapper;