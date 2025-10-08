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
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  TableIcon,
  Table2Icon,
} from "lucide-react";

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, route: "/sales" },
  { name: "Invoices", icon: <FileText className="w-5 h-5" />, route: "/sales/invoices" },
  { name: "Client", icon: <Users className="w-5 h-5" />, route: "/sales/display-billed" },
  { name: "Expenses", icon: <FilePieChart className="w-5 h-5" />, route: "/sales/expenses" },
  { name: "Admin Portal", icon: <ShieldCheck className="w-5 h-5" />, route: "/sales/admin-sales" },
  { name: "Dispatch Service Dashboard", icon: <TableIcon className="w-5 h-5" />, route: "/dispatch/service-assign-engineer" },
  { name: "Dispatch Installation Dashboard", icon: <Table2Icon className="w-5 h-5" />, route: "/dispatch/install-assign-engineer" },
];

  const handleMenuItemClick = (item) => {
    setActiveItem(item.name);
    if (item.route) navigate(item.route);
  };

  const handleAddNewClick = () => {
    navigate("/sales/new-account");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div
      className={`flex flex-col bg-white border-gray-200 transition-all duration-300 min-h-screen ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div className="flex-1">
        {/* Add New Button */}
        {!isCollapsed && (
          <div className="p-4">
            <button
              onClick={handleAddNewClick}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>
        )}

        {/* Collapsed Add Button */}
        {isCollapsed && (
          <div className="p-2 mt-4">
            <button
              onClick={handleAddNewClick}
              className="w-full flex items-center justify-center bg-orange-500 text-white p-2.5 rounded-lg hover:bg-orange-600 transition-colors"
              title="Add New"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className={`${isCollapsed ? "px-2" : "px-4"} space-y-1`}>
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMenuItemClick(item)}
              className={`w-full flex items-center rounded-lg transition-all duration-200 ${
                isCollapsed 
                  ? "justify-center p-2.5" 
                  : "gap-3 px-3 py-2.5 text-left"
              } ${
                activeItem === item.name
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={isCollapsed ? item.name : ""}
            >
              <div className={`${activeItem === item.name ? "text-blue-600" : ""}`}>
                {item.icon}
              </div>
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className={`border-t border-gray-200 ${isCollapsed ? "px-2" : "px-4"} py-4`}>
        {/* Settings */}
        <button
          onClick={() => navigate("/sales/settings")}
          className={`w-full flex items-center rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 mb-2 ${
            isCollapsed 
              ? "justify-center p-2.5" 
              : "gap-3 px-3 py-2.5 text-left"
          }`}
          title={isCollapsed ? "Settings" : ""}
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center rounded-lg transition-all duration-200 text-gray-600 hover:bg-red-50 hover:text-red-600 mb-4 ${
            isCollapsed 
              ? "justify-center p-2.5" 
              : "gap-3 px-3 py-2.5 text-left"
          }`}
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>

        {/* Collapse Toggle */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;