import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check admin status
  return isAdmin ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;
