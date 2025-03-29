import { apiClient } from "./config"

// Schedule API calls for admin/teacher
export const getSchedule = async (month, year) => {
  try {
    const response = await apiClient.get(`/schedule?month=${month}&year=${year}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch schedule:", error.response?.data || error.message)
    throw error
  }
}

export const getUpcomingEvents = async () => {
  try {
    const response = await apiClient.get("/schedule/upcoming")
    return response.data
  } catch (error) {
    console.error("Failed to fetch upcoming events:", error.response?.data || error.message)
    throw error
  }
}

export const addEvent = async (eventData) => {
  try {
    const response = await apiClient.post("/schedule/events", eventData)
    return response.data
  } catch (error) {
    console.error("Failed to add event:", error.response?.data || error.message)
    throw error
  }
}

export const updateEvent = async (id, eventData) => {
  try {
    const response = await apiClient.put(`/schedule/events/${id}`, eventData)
    return response.data
  } catch (error) {
    console.error(`Failed to update event with ID ${id}:`, error.response?.data || error.message)
    throw error
  }
}

export const deleteEvent = async (id) => {
  try {
    const response = await apiClient.delete(`/schedule/events/${id}`)
    return response.data
  } catch (error) {
    console.error(`Failed to delete event with ID ${id}:`, error.response?.data || error.message)
    throw error
  }
}

