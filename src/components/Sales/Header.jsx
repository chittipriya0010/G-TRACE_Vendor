import React from "react";
import { Search, Bell, Mail, ChevronDown, User } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = ({ userEmail = "karan aujla" }) => {
  const location = useLocation();

  const showViewExisting = [
    "/sales/edit-bill",
    "/sales/detailed-client",
    "/sales/display-billed",
  ].includes(location.pathname);

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
      {/* Left */}
      {showViewExisting ? (
        <h1 className="font-[Poppins] text-lg font-semibold">Welcome Back, Hi Amit 👋</h1>
      ) : (
        <div className="relative flex-1 max-w-[640px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="search"
            aria-label="Search invoice clients"
            placeholder="Search for invoice clients.."
            className="font-Poppins w-full text-sm pl-10 pr-4 py-2.5 outline-none placeholder-gray-400 bg-transparent"
          />
        </div>
      )}

      {/* Right */}
      <div className="flex items-center gap-4 ml-4">
        <button className="p-2 rounded-full hover:bg-gray-50 transition-colors">
          <Mail size={18} className="text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-50 transition-colors">
          <Bell size={18} className="text-gray-600" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-orange-400 rounded-full flex items-center justify-center">
            <User size={18} className="text-white" />
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
