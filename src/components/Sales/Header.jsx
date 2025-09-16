import React from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = ({ userEmail = "karan aujla" }) => {
  const location = useLocation();

  // Define routes where we want the welcome message
  const showViewExisting = [
    "/sales/edit-bill",
    "/sales/detailed-client",
    "/sales/display-billed",
  ].includes(location.pathname);

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {showViewExisting ? (
        <h1 className="font-poppins, sans-serif text-lg font-semibold">
          Welcome Back, Hi Amit 👋
        </h1>
      ) : (
        <div className="relative flex-1 max-w-lg">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search for invoice clients.."
            className="font-[Poppins] w-full border border-gray-200 rounded-lg text-sm pl-10 pr-4 py-2.5 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-4">
        <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span
            className="font-[Poppins] font-medium text-gray-700 truncate max-w-[150px]"
            title={userEmail}
          >
            {userEmail}
          </span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;