import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  FileBadge,
  Settings,
  LogOut,
  LayoutDashboard,
  List,
  FolderOpenDot,
  FileBarChart,
  SquareMinus,
  SquarePlus,
  ClipboardList
} from "lucide-react";

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, route: "/dashboard" },
    { name: "Request Stock", icon: <FileBadge size={20} />, route: "/request-stock" },
    { name: "View Request Stock", icon: <List size={20} />, route: "/cce/view-request-stock" },
    { name: "Raise Request (Job)", icon: <FolderOpenDot size={20} />, route: "/cce/request-job" },
    { name: "View Job Status", icon: <FileBarChart size={20} />, route: "/cce/view-job" },
    { name: "Deletion List", icon: <SquareMinus size={20} />, route: "/cce/deletion-list" },
    { name: "Addition List", icon: <SquarePlus size={20} />, route: "/cce/new-addition" },
    { name: "Requisition Form", icon: <ClipboardList size={20} />, route: "/cce/requisition-form" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const handleMenuItemClick = (item) => {
    setActiveItem(item.name);
    navigate(item.route);
  };

  return (
    <div className={`flex flex-col justify-between h-full transition-all duration-250 ${isCollapsed ? "w-[54px]" : "w-[250px]"} bg-white text-gray-800 shadow`}>
      <div>
        <nav className={`mt-2 ${isCollapsed ? "px-1" : "px-4"}`}>
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMenuItemClick(item)}
              className={`flex items-center ${isCollapsed ? "justify-center" : "gap-4"} w-full ${isCollapsed ? "px-1 py-3" : "px-4 py-3"} mb-1 transition-all rounded-full ${
                activeItem === item.name
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "text-gray-500 font-medium hover:bg-gray-100"
              }`}
            >
              <div className={`${activeItem === item.name ? "text-blue-600" : "text-gray-500"}`}>
                {item.icon}
              </div>
              {!isCollapsed && <span className="text-sm">{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center justify-center pt-2 pb-2">
          <button
            className="bg-gray-100 rounded-full p-1 hover:bg-blue-100 transition"
            onClick={() => setIsCollapsed((prev) => !prev)}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>
      {/* Bottom Settings and Logout */}
  {/* <div className={`p-4 ${isCollapsed ? "flex flex-col items-center" : ""}`}>
    <div className={`my-6 border-t border-gray-200 ${isCollapsed ? "mx-1" : "mx-4"}`}></div>
    <button
      onClick={() => navigate("/settings")}
      className={`flex items-center gap-4 w-full ${isCollapsed ? "justify-center px-1 py-3" : "px-4 py-3"} text-gray-500 font-medium rounded-full hover:bg-gray-100 transition-colors mb-2`}
    >
      <Settings size={20} />
      {!isCollapsed && <span className="text-sm">Setting</span>}
    </button>
    <button
      onClick={handleLogout}
      className={`flex items-center gap-4 w-full ${isCollapsed ? "justify-center px-1 py-3" : "px-4 py-3"} text-gray-500 font-medium rounded-full hover:bg-gray-100 transition-colors`}
    >
      <LogOut size={20} />
      {!isCollapsed && <span className="text-sm">Logout</span>}
    </button>
  </div> */}
</div>
  );
};

export default Sidebar;
