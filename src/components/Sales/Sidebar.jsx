import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  const location = useLocation(); // get current location
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();

  // Show "View Existing" only on specific routes (edit-bill and detailed-client)
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
    // Perform any logout logic here e.g. clear auth tokens, reset user state etc.

    // Redirect user to /login
    navigate("/login");
  };

  const handleAddNewClick = () => {
    navigate("/sales/new-account");
  };

  return (
    <div className="flex flex-col justify-between min-h-screen w-[180px] max-w-full border-r border-gray-200 bg-white font-poppins">
      <div>
        {/* Logo Section */}
        <div className="flex items-center justify-center p-6">
          <img
            src={logo}
            alt="Logo"
            className="w-[82px] h-[82px] rounded-lg object-contain mr-2"
          />
        </div>

        {/* Add New Button always */}
        <div className="px-4 mb-6">
          <button 
          onClick={handleAddNewClick}
          className="w-full flex items-center justify-center gap-1 bg-orange-500 text-white font-medium text-sm px-4 py-2.5 rounded-lg shadow-md hover:bg-orange-600 transition-colors">
            Add New <Plus size={16} />
          </button>
        </div>

        {/* Conditional menu */}
        {showViewExisting ? (
          <nav className="space-y-1 px-4 mb-6">
            <div className="text-gray-500 text-xs font-medium mb-2">View Existing</div>
            <a href="#" className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded text-sm">
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
                className={`flex items-center gap-3 w-full px-4 py-2.5 mb-1 rounded-lg text-left transition-all ${
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
        )}
      </div>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors">
          <Settings size={18} /> Setting
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;