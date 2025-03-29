"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Cake, Award, Edit, Save, X, Upload } from "lucide-react"
import { Button } from "../../components/ui/Button"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200")

  // Profile data state
  const [profile, setProfile] = useState({
    name: "Alex Smith",
    email: "alex.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Campus Drive, College Town, ST 12345",
    birthdate: "2005-05-15",
    grade: "11th Grade",
    major: "Computer Science",
    gpa: "3.8",
    joinDate: "2023-09-01",
    bio: "I'm a passionate student interested in technology and science. I enjoy coding and participating in robotics competitions. In my free time, I like to read science fiction and play basketball.",
  })

  // Achievements data
  const achievements = [
    {
      id: 1,
      title: "Honor Roll",
      description: "Maintained a GPA of 3.5 or higher for 3 consecutive semesters",
      date: "2024-01-15",
      icon: Award,
    },
    {
      id: 2,
      title: "Science Fair Winner",
      description: "First place in the regional science fair competition",
      date: "2023-11-10",
      icon: Award,
    },
    {
      id: 3,
      title: "Perfect Attendance",
      description: "No absences for the entire semester",
      date: "2023-12-20",
      icon: Award,
    },
  ]

  // Enrolled courses
  const courses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      instructor: "Dr. Jane Wilson",
      progress: 75,
    },
    {
      id: 2,
      name: "Computer Science Fundamentals",
      instructor: "Prof. Michael Chen",
      progress: 90,
    },
    {
      id: 3,
      name: "Physics 101",
      instructor: "Dr. Robert Johnson",
      progress: 60,
    },
    {
      id: 4,
      name: "English Literature",
      instructor: "Ms. Sarah Thompson",
      progress: 85,
    },
  ]

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const handleSaveProfile = () => {
    // In a real app, this would save the profile to a backend
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="rounded-lg border bg-card shadow">
            <div className="p-6 text-center">
              <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                <img src={profileImage || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
                {isEditing && (
                  <label
                    htmlFor="profile-image"
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 text-white opacity-0 transition-opacity hover:opacity-100"
                  >
                    <Upload className="h-6 w-6" />
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.grade} Student</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Joined {new Date(profile.joinDate).toLocaleDateString()}
              </p>
            </div>
            <div className="border-t p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{profile.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cake className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{new Date(profile.birthdate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* About Me */}
          <div className="rounded-lg border bg-card shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium">About Me</h3>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  rows={4}
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              ) : (
                <p className="mt-2 text-sm">{profile.bio}</p>
              )}
            </div>
          </div>

          {/* Academic Information */}
          <div className="rounded-lg border bg-card shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium">Academic Information</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grade Level</label>
                  {isEditing ? (
                    <select
                      name="grade"
                      value={profile.grade}
                      onChange={handleProfileChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="9th Grade">9th Grade</option>
                      <option value="10th Grade">10th Grade</option>
                      <option value="11th Grade">11th Grade</option>
                      <option value="12th Grade">12th Grade</option>
                    </select>
                  ) : (
                    <p className="text-sm">{profile.grade}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Major/Focus</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="major"
                      value={profile.major}
                      onChange={handleProfileChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  ) : (
                    <p className="text-sm">{profile.major}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">GPA</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="gpa"
                      value={profile.gpa}
                      onChange={handleProfileChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  ) : (
                    <p className="text-sm">{profile.gpa}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="rounded-lg border bg-card shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium">Enrolled Courses</h3>
              <div className="mt-4 space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{course.name}</h4>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                      </div>
                      <div className="text-sm font-medium">{course.progress}%</div>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="rounded-lg border bg-card shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium">Achievements</h3>
              <div className="mt-4 space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-4 rounded-md border p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <achievement.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Awarded on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

