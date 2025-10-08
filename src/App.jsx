import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VendorManagementSystem from "./pages/VendorManagementSystem/VendorManagementSystem";
import VendorRoutes from "./pages/VendorManagementSystem/VendorRoutes";
import SalesLogin from "./components/Sales/SalesLogin";
import ErrorPage from "./pages/ErrorPage";
import SalesRoutes from "./pages/SalesManagementSystem/SalesRoutes";
import SalesManagementSystem from "./pages/SalesManagementSystem/SalesManagementSystem";
import CceManagementSystem from "./pages/CceManagementSystem/CceManagementSystem";
import CceRoutes from "./pages/CceManagementSystem/CceRoutes";
import StockrManagementSystem from "./pages/StockManagementSystem/StockManagementSystem";
import StockRoutes from "./pages/StockManagementSystem/StockRoutes";
import DispatchManagementSystem from "./pages/DispatchManagementSystem/DispatchManagementSystem";
import DispatchRoutes from "./pages/DispatchManagementSystem/DispatchRoutes";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { AuthProvider } from "./components/Context/AuthContext";

// ✅ Import Unauthorized page
import Unauthorized from "./pages/Unauthorized"; // <-- Add this line

function App() {
   const SALES_MANAGEMENT_ROLES = ["Sales", "salesAdmin"];
  const router = createBrowserRouter([
    {
      path: "/vendors",
      element: <VendorManagementSystem />,
      errorElement: <ErrorPage />,
      children: VendorRoutes,
    },
    {
      // 🛠️ FIX APPLIED HERE: The wrapper for all /sales routes must allow both roles.
      element: <ProtectedRoute allowedRoles={SALES_MANAGEMENT_ROLES} />, 
      children: [
        {
          // This defines the base path for all routes in SalesRoutes.jsx
          path: "/sales", 
          element: <SalesManagementSystem />,
          children: SalesRoutes,
        },
      ],
    },
    {
      path: "/login",
      element: <SalesLogin />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/cce",
      element: <CceManagementSystem />,
      children: CceRoutes,
      errorElement: <ErrorPage />,
    },
    {
      path: "/stocks",
      element: <StockrManagementSystem />,
      errorElement: <ErrorPage />,
      children: StockRoutes,
    },
    {
      path: "/dispatch",
      element: <DispatchManagementSystem />,
      children: DispatchRoutes,
      errorElement: <ErrorPage />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />, // ✅ now recognized
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
