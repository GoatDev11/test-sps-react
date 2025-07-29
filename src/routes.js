import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import SignIn from "./components/signin/SignIn";
import Users from "./components/users/Users";
import UserEdit from "./components/userEdit/UserEdit";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      
      {/* Protected routes - require authentication */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:userId"
        element={
          <ProtectedRoute>
            <UserEdit />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes; 