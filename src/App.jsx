import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VendorManagementSystem from "./pages/VendorManagementSystem/VendorManagementSystem";
import VendorRoutes from "./pages/VendorManagementSystem/VendorRoutes";
import ErrorPage from "./pages/ErrorPage";
import StockrManagementSystem from "./pages/StockManagementSystem/StockManagementSystem";
import StockRoutes from "./pages/StockManagementSystem/StockRoutes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/vendors",
      element: <VendorManagementSystem />,
      errorElement: <ErrorPage />,
      children: VendorRoutes,
    },
    {
      path: "/stocks",
      element: <StockrManagementSystem />,
      errorElement: <ErrorPage />,
      children: StockRoutes,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
