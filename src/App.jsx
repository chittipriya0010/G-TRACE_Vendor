import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VendorManagementSystem from "./pages/VendorManagementSystem/VendorManagementSystem";
import VendorRoutes from "./pages/VendorManagementSystem/VendorRoutes";
import SalesLogin from "./components/Sales/SalesLogin";
import ErrorPage from "./pages/ErrorPage";
import SalesRoutes from "./pages/SalesManagementSystem/SalesRoutes";
import SalesManagementSystem from "./pages/SalesManagementSystem/SalesManagementSystem";

function App() {
  const router = createBrowserRouter([
    {
      path: "/vendors",
      element: <VendorManagementSystem />,
      errorElement: <ErrorPage />,
      children: VendorRoutes,
    },
    {
      path: "/sales",
      element: <SalesManagementSystem />,
      children: SalesRoutes,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <SalesLogin />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
