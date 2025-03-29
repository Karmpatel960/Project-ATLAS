import { apiClient } from "../config"

// Student assignments API calls
export const getStudentAssignments = async (search = "", filters = {}) => {
  try {
    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (filters.status) params.append("status", filters.status)
    if (filters.course) params.append("course", filters.course)
    if (filters.sortBy) params.append("sortBy", filters.sortBy)

    const response = await apiClient.get(`/student/assignments?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch student assignments:", error.response?.data || error.message)
    throw error
  }
}

export const getAssignmentDetails = async (assignmentId) => {
  try {
    const response = await apiClient.get(`/student/assignments/${assignmentId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch assignment details for ID ${assignmentId}:`, error.response?.data || error.message)
    throw error
  }
}

export const submitAssignment = async (assignmentId, submissionData) => {
  try {
    const response = await apiClient.post(`/student/assignments/${assignmentId}/submit`, submissionData)
    return response.data
  } catch (error) {
    console.error(`Failed to submit assignment with ID ${assignmentId}:`, error.response?.data || error.message)
    throw error
  }
}

export const getAssignmentFeedback = async (assignmentId) => {
  try {
    const response = await apiClient.get(`/student/assignments/${assignmentId}/feedback`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch assignment feedback for ID ${assignmentId}:`, error.response?.data || error.message)
    throw error
  }
}

