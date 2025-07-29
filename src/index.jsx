import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./components/Router/RouterAdmin/routes";
import AuthService from "./services/AuthService";
import "./index.css";

// Axios interceptor for authentication
AuthService.setupAxiosInterceptors();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
