import { apiClient } from "./config"

// Classes API calls for admin/teacher
export const getAllClasses = async (search = "", filters = {}) => {
  try {
    const params = new URLSearchParams()
    if (search) params.append("search", search)
    if (filters.status) params.append("status", filters.status)

    const response = await apiClient.get(`/classes?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch classes:", error.response?.data || error.message)
    throw error
  }
}

export const getClassById = async (id) => {
  try {
    const response = await apiClient.get(`/classes/${id}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch class with ID ${id}:`, error.response?.data || error.message)
    throw error
  }
}

export const createClass = async (classData) => {
  try {
    const response = await apiClient.post("/classes", classData)
    return response.data
  } catch (error) {
    console.error("Failed to create class:", error.response?.data || error.message)
    throw error
  }
}

export const updateClass = async (id, classData) => {
  try {
    const response = await apiClient.put(`/classes/${id}`, classData)
    return response.data
  } catch (error) {
    console.error(`Failed to update class with ID ${id}:`, error.response?.data || error.message)
    throw error
  }
}

export const deleteClass = async (id) => {
  try {
    const response = await apiClient.delete(`/classes/${id}`)
    return response.data
  } catch (error) {
    console.error(`Failed to delete class with ID ${id}:`, error.response?.data || error.message)
    throw error
  }
}

export const getClassStudents = async (classId) => {
  try {
    const response = await apiClient.get(`/classes/${classId}/students`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch students for class with ID ${classId}:`, error.response?.data || error.message)
    throw error
  }
}

export const addStudentToClass = async (classId, studentId) => {
  try {
    const response = await apiClient.post(`/classes/${classId}/students`, { studentId })
    return response.data
  } catch (error) {
    console.error(`Failed to add student to class:`, error.response?.data || error.message)
    throw error
  }
}

export const removeStudentFromClass = async (classId, studentId) => {
  try {
    const response = await apiClient.delete(`/classes/${classId}/students/${studentId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to remove student from class:`, error.response?.data || error.message)
    throw error
  }
}

