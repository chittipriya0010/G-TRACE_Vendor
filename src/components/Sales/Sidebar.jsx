import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  FilePieChart,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";
import logo from "../../images/logo.png";

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();

  const showViewExisting = [
    "/sales/edit-bill",
    "/sales/detailed-client",
    "/sales/display-billed",
  ].includes(location.pathname);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Invoices", icon: <FileText size={18} /> },
    { name: "Client", icon: <Users size={18} /> },
    { name: "Expenses", icon: <FilePieChart size={18} /> },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const handleAddNewClick = () => {
    navigate("/sales/new-account");
  };

  return (
    <div className="flex flex-col justify-between min-h-screen w-[220px] bg-white font-Poppins border-r border-gray-100">
      <div>
        {/* Logo Section with strong border and spacing */}
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

        {/* Main Menu */}
        {showViewExisting ? (
          <nav className="space-y-1 px-4 mb-6">
            <div className="text-gray-500 text-xs font-medium mb-2 font-Poppins">View Existing</div>
            <a href="#" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded text-sm font-Poppins">
              Pending
            </a>
            <a href="#" className="block text-blue-600 bg-blue-50 px-3 py-2 rounded text-sm font-medium">
              Billed
            </a>
          </nav>
        ) : (
          <nav className="px-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 mb-1 rounded-lg text-left transition-all font-Poppins text-base ${
                  activeItem === item.name
                    ? "bg-blue-100 text-blue-700 font-bold"
                    : "text-gray-700 font-medium hover:bg-gray-50"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => navigate("/sales/settings")}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
        >
          <Settings size={18} /> Setting
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
