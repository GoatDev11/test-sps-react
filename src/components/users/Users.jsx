import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    type: "user",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  // Fetch all users from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await UserService.list();
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      setError("Error al cargar usuarios: " + error);
    } finally {
      setLoading(false);
    }
  };

  // Handle new user creation
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await UserService.create(newUser);
      setNewUser({ name: "", email: "", type: "user", password: "" });
      setShowCreateForm(false);
      loadUsers();
    } catch (error) {
      setError("Error al crear usuario: " + error);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        await UserService.delete(id);
        loadUsers();
      } catch (error) {
        setError("Error al eliminar usuario: " + error);
      }
    }
  };

  // Handle user logout
  const handleLogout = () => {
    AuthService.logout();
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="users-container">
        <div className="users-loading">Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Gestión de Usuarios</h1>
        <div className="users-header-actions">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="users-create-button"
          >
            {showCreateForm ? "Cancelar" : "Crear Usuario"}
          </button>
          <button onClick={handleLogout} className="users-logout-button">
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Error message display */}
      {error && (
        <div className="users-error">
          <span>{error}</span>
          <button onClick={() => setError("")} className="users-close-error">
            ×
          </button>
        </div>
      )}

      {/* New user creation form */}
      {showCreateForm && (
        <div className="users-create-form">
          <h3>+ Crear Nuevo Usuario</h3>
          <form onSubmit={handleCreateUser}>
            <div className="users-form-row">
              <div className="users-form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                  className="users-input"
                  placeholder="Ingresa el nombre completo"
                />
              </div>
              <div className="users-form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                  className="users-input"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>
            <div className="users-form-row">
              <div className="users-form-group">
                <label>Tipo:</label>
                <select
                  value={newUser.type}
                  onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
                  className="users-input"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="users-form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                  className="users-input"
                  placeholder="Mínimo 4 caracteres"
                />
              </div>
            </div>
            <button type="submit" className="users-submit-button">
              Crear Usuario
            </button>
          </form>
        </div>
      )}

      {/* Users list display */}
      <div className="users-list">
        {users.length === 0 ? (
          <div className="users-empty-state">
            No hay usuarios registrados
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="users-user-card">
              <div className="users-user-info">
                <h3>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Tipo:</strong> {user.type}</p>
                <p><strong>ID:</strong> {user.id}</p>
              </div>
              <div className="users-user-actions">
                <Link to={`/users/${user.id}`} className="users-edit-button">
                  Editar
                </Link>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="users-delete-button"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Users; 