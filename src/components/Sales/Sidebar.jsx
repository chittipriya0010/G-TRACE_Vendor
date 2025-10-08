import React, { useState, useMemo } from "react";
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
} from "lucide-react";

// Helper function to safely get user data and role
const getRoleFromLocalStorage = () => {
  const userData = sessionStorage.getItem("user");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      // Ensure the role is returned as a normalized string for comparison
      return user.role?.toLowerCase().replace(/\s/g, "") || "";
    } catch (e) {
      console.error("Error parsing user data from localStorage:", e);
      return "";
    }
  }
  return "";
};

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Retrieve and memoize the current user's role
  const userRole = useMemo(getRoleFromLocalStorage, [location]); 

  // 🛠️ FIX APPLIED HERE: Define ALL menu items with a 'role' property
  const allMenuItems = useMemo(() => [
    // Accessible by both Sales and Admin
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, route: "/sales", role: ["sales", "salesadmin"] },
    { name: "Invoices", icon: <FileText className="w-5 h-5" />, route: "/sales/invoices", role: ["sales", "salesadmin"] },
    
    // 🎯 TARGET FIX: 'Client Management' only for the standard 'sales' role
    { 
      name: "Client Management", 
      icon: <Users className="w-5 h-5" />, 
      route: "/sales/display-billed", 
      role: ["sales"] // <<< CHANGED: Removed 'salesadmin'
    }, 
    
    { name: "Expenses", icon: <FilePieChart className="w-5 h-5" />, route: "/sales/expenses", role: ["sales", "salesadmin"] },
    
    // Admin Only Item
    { name: "Admin Portal", icon: <ShieldCheck className="w-5 h-5" />, route: "/sales/admin-sales", role: ["salesadmin"] },
  ], []);

  // Filter the menu items based on the current user's role
  const menuItems = useMemo(() => {
    const normalizedRole = userRole.toLowerCase().replace(/\s/g, "");

    return allMenuItems.filter(item => {
        // Checks if the item's role array includes the user's normalized role
        return item.role?.includes(normalizedRole);
    });
  }, [allMenuItems, userRole]);


  const handleMenuItemClick = (item) => {
    if (item.route) navigate(item.route);
  };

  const handleAddNewClick = () => {
    navigate("/sales/new-account");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user"); 
    navigate("/login");
  };

  // Conditional rendering for the "Add New" button (only for Sales/Admin)
  const isSalesOrAdmin = userRole === "sales" || userRole === "salesadmin";
  const shouldShowAddNew = isSalesOrAdmin;

  return (
    <div
      className={`flex flex-col bg-white border-gray-200 transition-all duration-300 min-h-screen ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div className="flex-1">
        {/* Add New Button */}
        {shouldShowAddNew && (
          <>
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
          </>
        )}
        
        {/* Navigation Menu (Filtered based on role) */}
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
                // Use location.pathname to determine the active item accurately
                location.pathname.startsWith(item.route) 
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={isCollapsed ? item.name : ""}
            >
              <div className={`${location.pathname.startsWith(item.route) ? "text-blue-600" : ""}`}>
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