import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Search,
    User,
    LogOut,
    LifeBuoy, // Tech Support
} from "lucide-react";

// Reverting to the original file import as requested
import logo from "../../images/logo.png";

/**
 * Helper function to safely get user data from localStorage or sessionStorage.
 * Checks localStorage first (for "Remember Me" persistence), then sessionStorage.
 */
const getLoggedInUser = () => {
    // 1. Check localStorage first (for persistent login)
    let userData = localStorage.getItem("user");

    // 2. Fallback to sessionStorage (for session-only login)
    if (!userData) {
        userData = sessionStorage.getItem("user");
    }

    if (userData) {
        try {
            const user = JSON.parse(userData);
            // Prioritize name, fall back to email, then use a generic title
            return {
                displayName: user.full_name || user.name || user.email || "User",
                email: user.email || null,
            };
        } catch (e) {
            console.error("Error parsing user data from storage:", e);
        }
    }
    return { displayName: "Guest", email: null };
};

// --- Header Component ---
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    
    const [showTechSupportPopup, setShowTechSupportPopup] = useState(false);
    
    // Dynamically retrieve user data, re-evaluating if location changes (e.g., after login/logout context update)
    // This now correctly looks in both localStorage and sessionStorage.
    const user = useMemo(getLoggedInUser, [location]); 

    /**
     * Handles logout by clearing user data from ALL storage mechanisms.
     */
    const handleLogout = () => {
        // Clear both localStorage (for Remember Me) and sessionStorage (for session-only)
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        // In a real app, you would also call an AuthContext logout function here
        navigate("/login"); 
    };

    const toggleTechSupportPopup = () => {
        setShowTechSupportPopup(prev => !prev);
        console.log("Tech support button clicked. State:", !showTechSupportPopup);
    };
    

    return (
        <header className="font-sans bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-between h-[56px] shadow-sm">

        {/* Left Section: Logo + Search */}
        <div className="flex items-center gap-4 flex-1 min-w-0 h-full">

            <div className="flex-shrink-0 flex items-center h-full">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-[36px] w-[110px] object-contain"
                />
            </div>

            <div className="relative flex-1 max-w-lg h-full hidden sm:block">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                />
                <input
                    type="text"
                    placeholder="Search for invoice clients..."
                    className="font-sans w-full bg-gray-50 border border-gray-200 rounded-lg text-sm pl-9 pr-6 py-2 outline-none transition duration-150 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                    style={{ height: "36px" }}
                />
            </div>

        </div>

        {/* Right Section: Tech Support + User Info + Logout */}
        <div className="flex items-center gap-5 ml-4 h-full">
            
            {/* 1. Tech Support Button */}
            <button
                onClick={toggleTechSupportPopup}
                title="Tech Support Team"
                className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition duration-150"
            >
                <LifeBuoy size={20} />
            </button>

            {/* 2. User Section (Simplified, non-dropdown display) */}
            <div 
                className="flex items-center gap-3 select-none relative px-3 py-2 rounded-lg bg-gray-50 border border-gray-200" 
                title={user.email || user.displayName}
            >
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-white" />
                </div>
                {/* Display logged-in name */}
                <span
                    className="font-medium text-gray-700 truncate max-w-[120px] text-sm"
                >
                    {user.displayName}
                </span>
            </div>
            
            {/* 3. Logout Button (Standalone Icon) */}
            <button 
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition duration-150"
            >
                <LogOut size={20} />
            </button>
        </div>
        
        {/* Tech Support Modal Placeholder */}
        {showTechSupportPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4">
                    <p className="font-semibold text-lg text-gray-800">Tech Support Contact</p>
                    <p className="text-sm text-gray-600 mt-2">
                        For assistance, please contact the support team:
                        <ul className="mt-2 list-disc list-inside">
                            <li>Phone: 1-800-TECH-HELP</li>
                            <li>Email: support@company.com</li>
                        </ul>
                    </p>
                    <button 
                        onClick={toggleTechSupportPopup} 
                        className="mt-4 w-full bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}
        </header>
    );
};

export default Header;
