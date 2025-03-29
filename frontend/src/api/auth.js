import { apiClient } from "./config"

// Authentication API calls
export const login = async (email, password, role) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password, role })
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }
    return response.data
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message)
    throw error
  }
}

export const signup = async (name, email, password, role) => {
  try {
    const response = await apiClient.post("/auth/register", { name, email, password, role })
    // Store token in localStorage if provided
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }
    return response.data
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message)
    throw error
  }
}

export const googleLogin = async (role) => {
  try {
    const response = await apiClient.post("/auth/google", { role })
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }
    return response.data
  } catch (error) {
    console.error("Google login failed:", error.response?.data || error.message)
    throw error
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post("/auth/forgot-password", { email })
    return response.data
  } catch (error) {
    console.error("Forgot password request failed:", error.response?.data || error.message)
    throw error
  }
}

export const resetPassword = async (token, password) => {
  try {
    const response = await apiClient.post("/auth/reset-password", { token, password })
    return response.data
  } catch (error) {
    console.error("Password reset failed:", error.response?.data || error.message)
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await apiClient.post("/auth/logout")
    // Clear token from localStorage
    localStorage.removeItem("token")
    return response.data
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message)
    // Clear token anyway
    localStorage.removeItem("token")
    throw error
  }
}

