import { apiClient } from "./config"

// Student accounts API calls for admin/teacher
export const getStudentAccounts = async (search = "", filters = {}) => {
  try {
    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (filters.status) params.append("status", filters.status)

    const response = await apiClient.get(`/student-accounts?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch student accounts:", error.response?.data || error.message)
    throw error
  }
}

export const createStudentAccount = async (accountData) => {
  try {
    const response = await apiClient.post("/student-accounts", accountData)
    return response.data
  } catch (error) {
    console.error("Failed to create student account:", error.response?.data || error.message)
    throw error
  }
}

export const sendCredentials = async (studentId) => {
  try {
    const response = await apiClient.post(`/student-accounts/${studentId}/send-credentials`)
    return response.data
  } catch (error) {
    console.error("Failed to send credentials:", error.response?.data || error.message)
    throw error
  }
}

export const resetStudentPassword = async (studentId) => {
  try {
    const response = await apiClient.post(`/student-accounts/${studentId}/reset-password`)
    return response.data
  } catch (error) {
    console.error("Failed to reset student password:", error.response?.data || error.message)
    throw error
  }
}

export const activateStudentAccount = async (studentId) => {
  try {
    const response = await apiClient.put(`/student-accounts/${studentId}/activate`)
    return response.data
  } catch (error) {
    console.error("Failed to activate student account:", error.response?.data || error.message)
    throw error
  }
}

export const deactivateStudentAccount = async (studentId) => {
  try {
    const response = await apiClient.put(`/student-accounts/${studentId}/deactivate`)
    return response.data
  } catch (error) {
    console.error("Failed to deactivate student account:", error.response?.data || error.message)
    throw error
  }
}

