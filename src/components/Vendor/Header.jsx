import { Bell, Home, MailOpen } from "lucide-react";

// Header Component
  const Header = () => (
    <div className="bg-white text-black px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
          <img className="w-[80px]" src="/logo.webp" />
          {/* <Home className="w-5 h-5" /> */}
        <h1 className="text-xl font-medium">Welcome Back, Hi Amit 🙋</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 rounded-full p-2">
            <MailOpen className="w-5 h-5 text-black" />
        </div>
        <div className="bg-gray-100 rounded-full p-2">
            <Bell className="w-5 h-5 text-black"/>
        </div>
        <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">
          A
        </div>
        <select className="bg-transparent text-black rounded px-2 py-1 text-sm">
          <option className="text-black">karan</option>
        </select>
      </div>
    </div>
  );

  export default Header;