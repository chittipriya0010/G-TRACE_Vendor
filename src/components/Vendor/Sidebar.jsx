import { Home } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-20 bg-cyan-800 text-white flex flex-col items-center py-4">
      {/* Home Icon */}
      <div className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer">
        <Home size={28} />
      </div>
    </div>
  );
};

export default Sidebar;
