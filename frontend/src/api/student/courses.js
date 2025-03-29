import { apiClient } from "../config"

// Student courses API calls
export const getStudentCourses = async (search = "", filters = {}) => {
  try {
    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (filters.platform) params.append("platform", filters.platform)

    const response = await apiClient.get(`/student/courses?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch student courses:", error.response?.data || error.message)
    throw error
  }
}

export const getCourseDetails = async (courseId) => {
  try {
    const response = await apiClient.get(`/student/courses/${courseId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch course details for ID ${courseId}:`, error.response?.data || error.message)
    throw error
  }
}

export const getCourseMaterials = async (courseId) => {
  try {
    const response = await apiClient.get(`/student/courses/${courseId}/materials`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch course materials for ID ${courseId}:`, error.response?.data || error.message)
    throw error
  }
}

export const getCourseAssignments = async (courseId) => {
  try {
    const response = await apiClient.get(`/student/courses/${courseId}/assignments`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch course assignments for ID ${courseId}:`, error.response?.data || error.message)
    throw error
  }
}

