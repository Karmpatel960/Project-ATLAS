import { apiClient } from "./config"

// Integrations API calls for admin/teacher
export const getConnectedPlatforms = async () => {
  try {
    const response = await apiClient.get("/integrations/platforms")
    return response.data
  } catch (error) {
    console.error("Failed to fetch connected platforms:", error.response?.data || error.message)
    throw error
  }
}

export const connectPlatform = async (platform, credentials) => {
  try {
    const response = await apiClient.post(`/integrations/platforms/${platform}/connect`, credentials)
    return response.data
  } catch (error) {
    console.error(`Failed to connect ${platform}:`, error.response?.data || error.message)
    throw error
  }
}

export const disconnectPlatform = async (platform) => {
  try {
    const response = await apiClient.delete(`/integrations/platforms/${platform}`)
    return response.data
  } catch (error) {
    console.error(`Failed to disconnect ${platform}:`, error.response?.data || error.message)
    throw error
  }
}

export const syncPlatform = async (platform, options = {}) => {
  try {
    const response = await apiClient.post(`/integrations/platforms/${platform}/sync`, options)
    return response.data
  } catch (error) {
    console.error(`Failed to sync ${platform}:`, error.response?.data || error.message)
    throw error
  }
}

export const getSyncHistory = async () => {
  try {
    const response = await apiClient.get("/integrations/sync-history")
    return response.data
  } catch (error) {
    console.error("Failed to fetch sync history:", error.response?.data || error.message)
    throw error
  }
}

export const getIntegrationSettings = async () => {
  try {
    const response = await apiClient.get("/integrations/settings")
    return response.data
  } catch (error) {
    console.error("Failed to fetch integration settings:", error.response?.data || error.message)
    throw error
  }
}

export const updateIntegrationSettings = async (settings) => {
  try {
    const response = await apiClient.put("/integrations/settings", settings)
    return response.data
  } catch (error) {
    console.error("Failed to update integration settings:", error.response?.data || error.message)
    throw error
  }
}

