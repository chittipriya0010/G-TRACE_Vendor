import { Routes, Route } from "react-router-dom";
import VendorManagementSystem from "./pages/VendorManagementSystem/VendorManagementSystem";
import VendorRoutes from "./pages/VendorManagementSystem/VendorRoutes";

function App() {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route path="/vendors" element={<VendorManagementSystem />}>
        {/* All nested routes go inside */}
        <Route path="*" element={<VendorRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
