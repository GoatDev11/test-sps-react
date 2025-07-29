import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3000";

class UserService {
  // Get all users
  async list() {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data.success ? response.data : response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Get user by ID
  async get(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  // Create new user
  async create(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  // Update existing user
  async update(id, userData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  // Delete user
  async delete(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;
