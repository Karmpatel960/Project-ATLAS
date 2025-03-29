import { apiClient } from "./config"

// Settings API calls for both admin/teacher and student
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get("/settings/profile")
    return response.data
  } catch (error) {
    console.error("Failed to fetch user profile:", error.response?.data || error.message)
    throw error
  }
}

export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.put("/settings/profile", profileData)
    return response.data
  } catch (error) {
    console.error("Failed to update user profile:", error.response?.data || error.message)
    throw error
  }
}

export const updatePassword = async (passwordData) => {
  try {
    const response = await apiClient.put("/settings/password", passwordData)
    return response.data
  } catch (error) {
    console.error("Failed to update password:", error.response?.data || error.message)
    throw error
  }
}

export const updateNotificationSettings = async (notificationSettings) => {
  try {
    const response = await apiClient.put("/settings/notifications", notificationSettings)
    return response.data
  } catch (error) {
    console.error("Failed to update notification settings:", error.response?.data || error.message)
    throw error
  }
}

export const updateAppearanceSettings = async (appearanceSettings) => {
  try {
    const response = await apiClient.put("/settings/appearance", appearanceSettings)
    return response.data
  } catch (error) {
    console.error("Failed to update appearance settings:", error.response?.data || error.message)
    throw error
  }
}

