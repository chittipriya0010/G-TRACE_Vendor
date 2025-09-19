import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Cce/Sidebar";
import Header from "../../components/Cce/Header";

const CceManagementSystem = ({ userEmail }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
  <div className="flex-shrink-0">
    <Header userEmail={userEmail} />
  </div>
  <div className="flex flex-row flex-grow h-0">
    <div className="flex-shrink-0 h-full relative">
      <Sidebar onLogout={handleLogout} />
    </div>
    <main className="flex-grow p-4 min-w-0 ml-1 overflow-auto bg-gray-50">
      <Outlet />
    </main>
  </div>
</div>
  );
};

export default CceManagementSystem;