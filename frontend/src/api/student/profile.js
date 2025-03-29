import { apiClient } from "../config"

// Student profile API calls
export const getStudentProfile = async () => {
  try {
    const response = await apiClient.get("/student/profile")
    return response.data
  } catch (error) {
    console.error("Failed to fetch student profile:", error.response?.data || error.message)
    throw error
  }
}

export const updateStudentProfile = async (profileData) => {
  try {
    const response = await apiClient.put("/student/profile", profileData)
    return response.data
  } catch (error) {
    console.error("Failed to update student profile:", error.response?.data || error.message)
    throw error
  }
}

export const uploadProfileImage = async (imageFile) => {
  try {
    const formData = new FormData()
    formData.append("image", imageFile)

    const response = await apiClient.post("/student/profile/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    console.error("Failed to upload profile image:", error.response?.data || error.message)
    throw error
  }
}

export const getStudentAchievements = async () => {
  try {
    const response = await apiClient.get("/student/profile/achievements")
    return response.data
  } catch (error) {
    console.error("Failed to fetch student achievements:", error.response?.data || error.message)
    throw error
  }
}

export const getAcademicInfo = async () => {
  try {
    const response = await apiClient.get("/student/profile/academic-info")
    return response.data
  } catch (error) {
    console.error("Failed to fetch academic information:", error.response?.data || error.message)
    throw error
  }
}

