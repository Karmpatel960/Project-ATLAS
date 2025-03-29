import { apiClient } from "./config"

// Dashboard API calls for admin/teacher
export const getDashboardStats = async () => {
  try {
    const response = await apiClient.get("/dashboard/stats")
    return response.data
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error.response?.data || error.message)
    throw error
  }
}

export const getUpcomingClasses = async () => {
  try {
    const response = await apiClient.get("/dashboard/upcoming-classes")
    return response.data
  } catch (error) {
    console.error("Failed to fetch upcoming classes:", error.response?.data || error.message)
    throw error
  }
}

export const getRecentActivities = async () => {
  try {
    const response = await apiClient.get("/dashboard/recent-activities")
    return response.data
  } catch (error) {
    console.error("Failed to fetch recent activities:", error.response?.data || error.message)
    throw error
  }
}

export const getPerformanceData = async (period = "week") => {
  try {
    const response = await apiClient.get(`/dashboard/performance?period=${period}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch performance data:", error.response?.data || error.message)
    throw error
  }
}

