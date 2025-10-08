import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    ChevronRight,
    ChevronLeft,
    Settings,
    LogOut,
    // Ensure you have these icons imported from 'lucide-react'
    LayoutDashboard,
    FileBadge,
    List,
    FolderOpenDot,
    FileBarChart,
    SquareMinus,
    SquarePlus,
    ClipboardList,
    Table,
    Ban,
    Highlighter,
    ShieldCheck // Icon for Installation Admin
} from "lucide-react";

// Helper function to safely get user data and role
const getRoleFromLocalStorage = () => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
        try {
            const user = JSON.parse(userData);
            return user.role?.toLowerCase().replace(/\s/g, "") || "";
        } catch (e) {
            console.error("Error parsing user data from sessionStorage:", e);
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
    const isCceUser = userRole.includes("cce");

    // --- MENU DEFINITION & ROLE FILTERING ---

    const ALL_CCE_MENU_ITEMS = [
        // Role: ["cce"] - Standard CCE User Only
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, route: "/dashboard", role: ["cce", "cceadmin"] },
        { name: "Request Stock", icon: <FileBadge size={20} />, route: "/request-stock", role: ["cce"] },
        { name: "View Request Stock", icon: <List size={20} />, route: "/cce/view-request-stock", role: ["cce"] },
        { name: "Raise Request (Job)", icon: <FolderOpenDot size={20} />, route: "/cce/request-job", role: ["cce"] },
        { name: "View Job Status", icon: <FileBarChart size={20} />, route: "/cce/view-job", role: ["cce"] },
        { name: "Deletion List", icon: <SquareMinus size={20} />, route: "/cce/deletion-list", role: ["cce"] },
        { name: "Not Working", icon: <Ban size={20} />, route: "/cce/not-working", role: ["cce"] },
        { name: "Addition List", icon: <SquarePlus size={20} />, route: "/cce/new-addition", role: ["cce"] },
        { name: "Requisition Form", icon: <ClipboardList size={20} />, route: "/cce/requisition-form", role: ["cce"] },
        
        // Roles: ["cce", "cceadmin"] - Both Users
        { name: "Raised Service Requests", icon: <Highlighter size={20} />, route: "/cce/raised-service-requests", role: ["cce"] },
        { name: "Dispatch Dashboard", icon: <Table size={20} />, route: "/dispatch/assign-engineer", role: ["cce"] },

        // 🛠️ FIX 1 & 2: Added Installation Admin with Icon and role restriction
        { name: "Installation Admin", icon: <ShieldCheck size={20} />, route: "/cce/install-admin", role: ["cceadmin"] },
    ];

    // Filter the menu items based on the current user's role
    const menuItems = useMemo(() => {
        const normalizedRole = userRole;

        if (!isCceUser) return [];

        return ALL_CCE_MENU_ITEMS.filter(item => {
            return item.role?.includes(normalizedRole);
        });
    }, [userRole, isCceUser]);


    const handleLogout = () => {
        sessionStorage.removeItem("user");
        navigate("/login");
    };

    const handleMenuItemClick = (item) => {
        navigate(item.route);
    };

    // Helper to determine if a route is currently active
    const isActive = (route) => location.pathname.startsWith(route);

    return (
        <div className={`flex flex-col justify-between h-full transition-all duration-250 ${isCollapsed ? "w-[54px]" : "w-[250px]"} bg-white text-gray-800 shadow`}>
            <div>
                <nav className={`mt-2 ${isCollapsed ? "px-1" : "px-4"}`}>
                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleMenuItemClick(item)}
                            title={isCollapsed ? item.name : ""}
                            className={`flex items-center ${isCollapsed ? "justify-center" : "gap-4"} w-full ${isCollapsed ? "px-1 py-3" : "px-4 py-3"} mb-1 transition-all rounded-full ${
                                isActive(item.route)
                                    ? "bg-blue-100 text-blue-800 font-semibold"
                                    : "text-gray-500 font-medium hover:bg-gray-100"
                            }`}
                        >
                            {/* 🛠️ FIX 3: Display the icon */}
                            <div className={`${isActive(item.route) ? "text-blue-600" : "text-gray-500"}`}>
                                {item.icon}
                            </div>
                            
                            {!isCollapsed && <span className="text-sm">{item.name}</span>}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="flex flex-col items-center border-t border-gray-200">
                {/* Settings Button (Always visible) */}
                <button
                    onClick={() => navigate("/settings")} 
                    title={isCollapsed ? "Settings" : "Setting"}
                    className={`flex items-center ${isCollapsed ? "justify-center px-1 py-3" : "gap-4 px-4 py-3"} w-full text-gray-500 font-medium rounded-full hover:bg-gray-100 transition-colors mt-1`}
                >
                    <Settings size={20} />
                    {!isCollapsed && <span className="text-sm">Setting</span>}
                </button>

                {/* Logout Button (Always visible) */}
                <button
                    onClick={handleLogout}
                    title={isCollapsed ? "Logout" : "Logout"}
                    className={`flex items-center ${isCollapsed ? "justify-center px-1 py-3" : "gap-4 px-4 py-3"} w-full text-gray-500 font-medium rounded-full hover:bg-red-100 hover:text-red-700 transition-colors mb-2`}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="text-sm">Logout</span>}
                </button>

                {/* Collapse Toggle */}
                <div className="flex items-center justify-center pt-2 pb-2">
                    <button
                        className="bg-gray-100 rounded-full p-1 hover:bg-blue-100 transition"
                        onClick={() => setIsCollapsed((prev) => !prev)}
                        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;