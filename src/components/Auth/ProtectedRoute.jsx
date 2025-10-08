import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const normalize = (str) => str?.toLowerCase().replace(/\s/g, "");

const ProtectedRoute = ({ allowedRoles = [], allowedPermissions = [], children }) => {
  // 🛠️ CHANGED: Get user data from sessionStorage
  const userData = sessionStorage.getItem("user"); 
  if (!userData) return <Navigate to="/login" replace />;

  const user = JSON.parse(userData);
  const userRole = user.role;
  const userPermissions = user.permissions || [];

  console.log("✅ ProtectedRoute Debug");
  console.log("Allowed Roles:", allowedRoles);
  console.log("User Role:", userRole);
  console.log("User Permissions:", userPermissions);

  const hasRole =
    allowedRoles.length === 0 ||
    allowedRoles.some(role => normalize(role) === normalize(userRole));

  const hasPermission =
    allowedPermissions.length === 0 ||
    allowedPermissions.some(perm => userPermissions.includes(perm));

  if (!hasRole || !hasPermission) {
    console.warn("🚫 User is not authorized to access this page!");
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;