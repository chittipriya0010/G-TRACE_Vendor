import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  FilePieChart,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "../../images/logo.png";

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("Request Stock");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Request Stock", icon: <FileText size={16} />, route: "/request-stock" },
    { name: "Not Working", icon: <FileText size={16} />, route: "/cce/not-working" },
    { name: "View Request Stock", icon: <FileText size={16} />, route: "/cce/view-request-stock" },
    { name: "Raise Request (Job)", icon: <Plus size={16} />, route: "/cce/request-job" },
    { name: "View Job Status", icon: <FilePieChart size={16} />, route: "/cce/view-job" },
    { name: "Deletion List", icon: <FileText size={16} />, route: "/cce/deletion-list" },
    { name: "Addition List", icon: <FileText size={16} />, route: "/cce/new-addition" },
    { name: "Requisition Form", icon: <Plus size={16} />, route: "/cce/requisition-form" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const handleAddNewClick = () => {
    navigate("/sales/new-account");
  };

  const handleMenuItemClick = (item) => {
    setActiveItem(item.name);
    navigate(item.route);
  };

  return (
    <div className="fix flex-col justify-between min-h-screen w-[220px] bg-white font-Poppins border-r border-gray-100">
      <div>
        {/* Logo Section */}
        <div className="flex items-center justify-center pt-3 pb-4 border-b border-gray-100 bg-white">
          <img
            src={logo}
            alt="Logo"
            className="w-[90px] h-auto object-contain"
            style={{ marginBottom: "-8px" }}
          />
        </div>

        {/* Add New Button */}
        <div className="px-4 mt-6 mb-8">
          <button
            onClick={handleAddNewClick}
            className="w-full flex font-Poppins items-center justify-center gap-1 bg-orange-500 text-white font-semibold text-base px-4 py-2.5 rounded-md hover:bg-orange-600 transition"
            style={{ letterSpacing: "0.01em" }}
          >
            Add New <Plus size={16} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="px-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMenuItemClick(item)}
              className={`flex items-center gap-2 w-full px-3 py-2 mb-1 rounded-lg text-left transition-all ${
                activeItem === item.name
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-gray-600 font-medium hover:bg-gray-50"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => navigate("/sales/settings")}
          className="flex items-center gap-2 w-full px-3 py-2 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Settings size={16} /> Setting
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
