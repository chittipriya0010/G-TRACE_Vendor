import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Vendor/Sidebar";
import Header from "../../components/Vendor/Header";

const VendorManagementSystem = () => {
  return (
     <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Content area */}
        <main className="p-6 bg-gray-100 flex-1">
          <Outlet /> {/* Nested routes render here */}
        </main>
      </div>
    </div>
  );
};

export default VendorManagementSystem;
