import React, { useState } from "react";
import { ChevronLeft, User, Building2, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const DetailClient = ({ company }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    // If you want to do any custom logic on back, do here

    // Navigate to /sales/display-billed
    navigate("/sales/display-billed");
  };
  const billingData = [
    { month: "Jan 2025", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
    { month: "Dec 2024", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
    { month: "Nov 2024", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
    { month: "Oct 2024", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
    { month: "Sep 2024", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
    { month: "Aug 2024", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
    { month: "Jul 2024", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
    { month: "Jun 2024", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
    { month: "May 2024", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
    { month: "Apr 2025", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
    { month: "Mar 2025", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
    { month: "Feb 2025", billed: "₹ 700", received: "₹ 550", balance: "₹ 150" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft size={20} />
          <span className="text-sm">Back</span>
        </button>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Company Name:</span> Creative Edge Pvt Ltd
        </div>
      </div>

      {/* Billing Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {billingData.map((data, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">{data.month}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Billed</span>
                <span className="text-gray-600">Received</span>
                <span className="text-gray-600">Balance</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>Subscription</span>
                </div>
                <span>{data.billed}</span>
                <span>{data.received}</span>
                <span className="text-blue-600">{data.balance}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  <span>Hardware</span>
                </div>
                <span>₹ 700</span>
                <span>₹ 550</span>
                <span className="text-blue-600">₹ 150</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailClient;