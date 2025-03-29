import { apiClient } from "../config"

// Student dashboard API calls
export const getStudentDashboard = async () => {
  try {
    const response = await apiClient.get("/student/dashboard")
    return response.data
  } catch (error) {
    console.error("Failed to fetch student dashboard data:", error.response?.data || error.message)
    throw error
  }
}

export const getEnrolledCourses = async () => {
  try {
    const response = await apiClient.get("/student/dashboard/courses")
    return response.data
  } catch (error) {
    console.error("Failed to fetch enrolled courses:", error.response?.data || error.message)
    throw error
  }
}

export const getUpcomingAssignments = async () => {
  try {
    const response = await apiClient.get("/student/dashboard/assignments")
    return response.data
  } catch (error) {
    console.error("Failed to fetch upcoming assignments:", error.response?.data || error.message)
    throw error
  }
}

export const getRecentGrades = async () => {
  try {
    const response = await apiClient.get("/student/dashboard/grades")
    return response.data
  } catch (error) {
    console.error("Failed to fetch recent grades:", error.response?.data || error.message)
    throw error
  }
}

export const getStudentEvents = async () => {
  try {
    const response = await apiClient.get("/student/dashboard/events")
    return response.data
  } catch (error) {
    console.error("Failed to fetch student events:", error.response?.data || error.message)
    throw error
  }
}

