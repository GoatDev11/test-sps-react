import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate("/users");
    }
  }, [navigate]);

  // Handle login form submission
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await AuthService.login(email, password);
      navigate("/users");
    } catch (error) {
      setError("Login error: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Iniciar Sesión</h1>

        {error && (
          <div className="signin-error">
            {error}
          </div>
        )}

        <div className="signin-form">
          <div className="signin-input-group">
            <label className="signin-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signin-input"
              placeholder="admin@spsgroup.com.br"
            />
          </div>

          <div className="signin-input-group">
            <label className="signin-label">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signin-input"
              placeholder="1234"
            />
          </div>

          <button
            type="button"
            className="signin-button"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </div>

        <div className="signin-credentials">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Email: admin@spsgroup.com.br</p>
          <p>Contraseña: 1234</p>
        </div>
      </div>
    </div>
  );
}

export default SignIn; 