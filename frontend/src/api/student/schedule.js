import { apiClient } from "../config"

// Student schedule API calls
export const getStudentSchedule = async (month, year) => {
  try {
    const response = await apiClient.get(`/student/schedule?month=${month}&year=${year}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch student schedule:", error.response?.data || error.message)
    throw error
  }
}

export const getStudentUpcomingEvents = async () => {
  try {
    const response = await apiClient.get("/student/schedule/upcoming")
    return response.data
  } catch (error) {
    console.error("Failed to fetch student upcoming events:", error.response?.data || error.message)
    throw error
  }
}

export const addStudentEvent = async (eventData) => {
  try {
    const response = await apiClient.post("/student/schedule/events", eventData)
    return response.data
  } catch (error) {
    console.error("Failed to add student event:", error.response?.data || error.message)
    throw error
  }
}

export const updateStudentEvent = async (id, eventData) => {
  try {
    const response = await apiClient.put(`/student/schedule/events/${id}`, eventData)
    return response.data
  } catch (error) {
    console.error(`Failed to update student event with ID ${id}:`, error.response?.data || error.message)
    throw error
  }
}

export const deleteStudentEvent = async (id) => {
  try {
    const response = await apiClient.delete(`/student/schedule/events/${id}`)
    return response.data
  } catch (error) {
    console.error(`Failed to delete student event with ID ${id}:`, error.response?.data || error.message)
    throw error
  }
}

