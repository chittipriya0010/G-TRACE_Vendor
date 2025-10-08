import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sales/Sidebar";
import Header from "../../components/Sales/Header";

const SalesManagementSystem = ({ userEmail }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Calculate showViewExisting in layout (lifted from Sidebar)
  const showViewExisting = [
    "/sales/edit-bill",
    "/sales/detailed-client",
    "/sales/display-billed",
  ].includes(location.pathname);

  // Logout handler (lifted from Sidebar)
  const handleLogout = () => {
    // perform any necessary cleanup here, e.g. clearing tokens, user state
    navigate("/login"); // navigate to login route
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header spans full width */}
      <Header userEmail={userEmail} showViewExisting={showViewExisting} />
      
      {/* Content area with sidebar and main content */}
      <div className="flex">
        <Sidebar onLogout={handleLogout} showViewExisting={showViewExisting} />
        
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SalesManagementSystem;