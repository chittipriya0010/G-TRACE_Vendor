// src/pages/Unauthorized.jsx
import React from "react";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="text-gray-600 mt-2">
        You don’t have permission to view this page.
      </p>
    </div>
  );
}