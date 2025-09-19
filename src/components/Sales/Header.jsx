import React from "react";
import { Search, Bell, Mail, ChevronDown, User } from "lucide-react";
import { BrowserRouter, useLocation } from "react-router-dom";

const Header = ({ userEmail = "karan aujla" }) => {
  const location = useLocation();

  const showViewExisting = [
    "/sales/edit-bill",
    "/sales/detailed-client",
    "/sales/display-billed",
  ].includes(location.pathname);

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-100 px-6 py-3 grid grid-cols-3 items-center">
      {/* Left section: Search bar or welcome message */}
      <div className="flex-1">
        {showViewExisting ? (
          <h1 className="font-[Poppins] text-lg font-semibold whitespace-nowrap">
            Welcome Back, Hi Amit 👋
          </h1>
        ) : (
          <div className="relative max-w-[640px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="search"
              aria-label="Search invoice clients"
              placeholder="Search for invoice clients.."
              className="font-Poppins w-full text-sm pl-9 pr-4 py-2.5 outline-none placeholder-gray-400 bg-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        )}
      </div>

      {/* Center section: This space is left empty to push content to the sides */}
      <div></div>

      {/* Right section: Icons and user profile */}
      <div className="flex items-center justify-end gap-4 ml-auto">
        <div className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
          <Mail size={18} className="text-gray-600" />
        </div>
        <div className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
          <Bell size={18} className="text-gray-600" />
        </div>

        <div className="flex items-center gap-2 cursor-pointer rounded-full p-1 hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-white" />
          </div>
          <span className="font-[Poppins] font-medium text-gray-700 truncate max-w-[120px]" title={userEmail}>
            {userEmail}
          </span>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;