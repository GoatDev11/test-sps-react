import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./Home.css";

function Home() {
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">SPS REACT TEST</h1>
        <p className="home-subtitle">
          Sistema de Gestión de Usuarios
        </p>

        <div className="home-features">
          <div className="home-feature">
            <h3>Autenticación Segura</h3>
            <p>Login con JWT y protección de rutas</p>
          </div>
          <div className="home-feature">
            <h3>Gestión de Usuarios</h3>
            <p>CRUD completo de usuarios</p>
          </div>
          <div className="home-feature">
            <h3>API REST</h3>
            <p>Integración con backend</p>
          </div>
        </div>

        <div className="home-actions">
          {isAuthenticated ? (
            <Link to="/users" className="home-primary-button">
              Ir a Gestión de Usuarios
            </Link>
          ) : (
            <Link to="/signin" className="home-primary-button">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home; 