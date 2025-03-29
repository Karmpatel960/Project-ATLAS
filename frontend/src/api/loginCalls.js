import axios from "axios";

const API_BASE_URL = "https://8000-idx-backend-1743257290953.cluster-7ubberrabzh4qqy2g4z7wgxuw2.cloudworkstations.dev/api"; // Replace with your actual API URL

export const login = async (email, password, role) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password, role });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const signup = async (name, email, password, role) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password, role });
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw error;
  }
};

export const googleLogin = async (role) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/google`, { role });
    return response.data;
  } catch (error) {
    console.error("Google login failed:", error.response?.data || error.message);
    throw error;
  }
};
