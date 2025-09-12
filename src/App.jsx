import { Routes, Route } from "react-router-dom";
// import VendorManagementSystem from "./pages/VendorManagementSystem/VendorManagementSystem";
import VendorManagementSystem from "./pages/VendorManagementSystem";
import VendorRoutes from "./pages/VendorManagementSystem/VendorRoutes";

function App() {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route path="/" element={<VendorManagementSystem />}>
      {/* <Route path="/" element={<VendorManagementSystem />}> */}
      {/* <Route path="/vendors/*" element={<VendorManagementSystem />}> */}

      </Route>
    </Routes>
  );
}

export default App;
