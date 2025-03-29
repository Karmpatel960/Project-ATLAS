import { apiClient } from "./config"

// Students API calls for admin/teacher
export const getAllStudents = async (search = "", filters = {}) => {
  try {
    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (filters.status) params.append("status", filters.status)
    if (filters.grade) params.append("grade", filters.grade)

    const response = await apiClient.get(`/students?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch students:", error.response?.data || error.message)
    throw error
  }
}

export const getStudentById = async (id) => {
  try {
    const response = await apiClient.get(`/students/${id}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch student with ID ${id}:`, error.response?.data || error.message)
    throw error
  }
}

export const addStudent = async (studentData) => {
  try {
    const response = await apiClient.post("/students", studentData)
    return response.data
  } catch (error) {
    console.error("Failed to add student:", error.response?.data || error.message)
    throw error
  }
}

export const updateStudent = async (id, studentData) => {
  try {
    const response = await apiClient.put(`/students/${id}`, studentData)
    return response.data
  } catch (error) {
    console.error(`Failed to update student with ID ${id}:`, error.response?.data || error.message)
    throw error
  }
}

export const deleteStudent = async (id) => {
  try {
    const response = await apiClient.delete(`/students/${id}`)
    return response.data
  } catch (error) {
    console.error(`Failed to delete student with ID ${id}:`, error.response?.data || error.message)
    throw error
  }
}

