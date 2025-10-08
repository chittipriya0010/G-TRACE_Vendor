import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell, Mail, ChevronDown, User } from "lucide-react";
import logo from "../../images/logo.png"; // ✅ your logo

const Header = () => {
  const location = useLocation();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.fullName) setUserName(user.fullName);
  }, []);

  const showViewExisting = [
    "/sales/edit-bill",
    "/sales/detailed-client",
    "/sales/display-billed",
  ].includes(location.pathname);

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-100 px-4 py-2 h-[56px] flex items-center justify-between">
  {/* ✅ Left: Logo + Search */}
  <div className="flex items-center gap-4 flex-1">
    <img
      src={logo}
      alt="Logo"
      className="h-8 w-auto object-contain cursor-pointer"
    />

    <div className="flex-1 max-w-lg">
      {showViewExisting ? (
        <h1 className="text-lg font-semibold whitespace-nowrap">
          Welcome Back, Hi {userName} 👋
        </h1>
      ) : (
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search for invoice clients..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg text-sm pl-10 pr-2 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      )}
    </div>
  </div>

  {/* ✅ Right: Icons + User */}
  <div className="flex items-center gap-5 ml-4">
    <Mail size={20} className="text-gray-600 cursor-pointer hover:text-blue-600" />
    <Bell size={20} className="text-gray-600 cursor-pointer hover:text-blue-600" />
    <div className="flex items-center gap-2 cursor-pointer rounded-full px-2 py-1 hover:bg-gray-100 transition-colors">
      <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
        <User size={16} className="text-white" />
      </div>
      <span
        className="font-[Poppins] font-medium text-gray-700 truncate max-w-[120px]"
        title={userName}
      >
        {userName}
      </span>
      <ChevronDown size={16} className="text-gray-500" />
    </div>
  </div>
</header>
  );
};

export default Header;