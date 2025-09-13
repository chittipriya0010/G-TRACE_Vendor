import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VendorManagementSystem from "./pages/VendorManagementSystem/VendorManagementSystem";
import VendorRoutes from "./pages/VendorManagementSystem/VendorRoutes";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/vendors",
      element: <VendorManagementSystem />,
      errorElement: <ErrorPage />,
      children: VendorRoutes,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
