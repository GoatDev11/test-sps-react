import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function ProtectedRoute({ children }) {
  // Check if user is authenticated
  const isAuthenticated = AuthService.isAuthenticated();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute; 