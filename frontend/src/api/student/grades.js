import { apiClient } from "../config"

// Student grades API calls
export const getStudentGrades = async (search = "", filters = {}) => {
  try {
    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (filters.course) params.append("course", filters.course)

    const response = await apiClient.get(`/student/grades?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch student grades:", error.response?.data || error.message)
    throw error
  }
}

export const getCourseGrades = async (courseId) => {
  try {
    const response = await apiClient.get(`/student/grades/courses/${courseId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch grades for course ID ${courseId}:`, error.response?.data || error.message)
    throw error
  }
}

export const getGradeDetails = async (gradeId) => {
  try {
    const response = await apiClient.get(`/student/grades/${gradeId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch grade details for ID ${gradeId}:`, error.response?.data || error.message)
    throw error
  }
}

export const getOverallStats = async () => {
  try {
    const response = await apiClient.get("/student/grades/stats")
    return response.data
  } catch (error) {
    console.error("Failed to fetch overall grade statistics:", error.response?.data || error.message)
    throw error
  }
}

