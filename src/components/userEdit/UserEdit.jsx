import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import "./UserEdit.css";

function UserEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "user",
    password: "",
  });

  useEffect(() => {
    loadUser();
  }, [userId]);

  // Fetch user data from API
  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await UserService.get(userId);
      const userData = response;
      setUser(userData);
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        type: userData.type || "user",
        password: "",
      });
    } catch (error) {
      setError("Error al cargar usuario: " + error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const updateData = { ...formData };
      // Only send password if provided
      if (!updateData.password) {
        delete updateData.password;
      }

      await UserService.update(userId, updateData);
      navigate("/users");
    } catch (error) {
      setError("Error al actualizar usuario: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate("/users");
  };

  // Loading state
  if (loading) {
    return (
      <div className="useredit-container">
        <div className="useredit-loading">Cargando usuario...</div>
      </div>
    );
  }

  // User not found state
  if (!user) {
    return (
      <div className="useredit-container">
        <div className="useredit-error">Usuario no encontrado</div>
        <button onClick={() => navigate("/users")} className="useredit-back-button">
          Volver a Usuarios
        </button>
      </div>
    );
  }

  return (
    <div className="useredit-container">
      <div className="useredit-header">
        <h1>Editar Usuario</h1>
        <button onClick={handleCancel} className="useredit-cancel-button">
          Volver
        </button>
      </div>

      {/* Error message display */}
      {error && (
        <div className="useredit-error">
          {error}
        </div>
      )}

      {/* Edit form container */}
      <div className="useredit-form-container">
        <form onSubmit={handleSubmit} className="useredit-form">
          {/* User ID field (read-only) */}
          <div className="useredit-form-group">
            <label className="useredit-label">ID del Usuario:</label>
            <input
              type="text"
              value={user.id}
              disabled
              className="useredit-disabled-input"
            />
          </div>

          {/* Name field */}
          <div className="useredit-form-group">
            <label className="useredit-label">Nombre:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="useredit-input"
              placeholder="Ingresa el nombre completo"
            />
          </div>

          {/* Email field */}
          <div className="useredit-form-group">
            <label className="useredit-label">Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="useredit-input"
              placeholder="ejemplo@correo.com"
            />
          </div>

          {/* User type field */}
          <div className="useredit-form-group">
            <label className="useredit-label">Tipo:</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="useredit-input"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {/* Password field */}
          <div className="useredit-form-group">
            <label className="useredit-label">Nueva Contraseña:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="useredit-input"
              placeholder="Dejar en blanco para mantener la contraseña actual"
            />
          </div>

          {/* Form action buttons */}
          <div className="useredit-form-actions">
            <button
              type="submit"
              disabled={saving}
              className="useredit-save-button"
            >
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="useredit-cancel-button"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserEdit; 