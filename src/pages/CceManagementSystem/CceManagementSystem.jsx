import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Cce/Sidebar";
import Header from "../../components/Cce/Header";

const CceManagementSystem = ({ userEmail }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const showViewExisting = [
    "/sales/edit-bill",
    "/sales/detailed-client",
    "/sales/display-billed",
  ].includes(location.pathname);

  const handleLogout = () => {
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar with fixed width */}
      <Sidebar onLogout={handleLogout} showViewExisting={showViewExisting} />

      {/* Main content area flex-grow + overflow-x-auto */}
      <div className="flex-grow flex flex-col overflow-x-auto">
        <Header userEmail={userEmail} showViewExisting={showViewExisting} />
        <main className="flex-grow p-6 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CceManagementSystem;