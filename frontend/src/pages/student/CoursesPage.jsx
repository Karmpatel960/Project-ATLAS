"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { BookOpen, Users, Calendar, ExternalLink, Search, ChevronRight } from "lucide-react"
import { Button } from "../../components/ui/Button"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPlatform, setFilterPlatform] = useState("all")

  // Sample courses data
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Mathematics 101",
      description: "Fundamentals of algebra, geometry, and calculus",
      instructor: "Dr. Sarah Johnson",
      progress: 68,
      platform: "Google Classroom",
      nextClass: "Tomorrow, 10:00 AM",
      students: 28,
      color: "bg-blue-100 dark:bg-blue-900",
      assignments: {
        total: 12,
        completed: 8,
      },
      materials: 24,
    },
    {
      id: 2,
      name: "Physics Fundamentals",
      description: "Introduction to mechanics, energy, and waves",
      instructor: "Prof. Michael Chen",
      progress: 42,
      platform: "Microsoft Teams",
      nextClass: "Today, 2:00 PM",
      students: 22,
      color: "bg-purple-100 dark:bg-purple-900",
      assignments: {
        total: 10,
        completed: 4,
      },
      materials: 18,
    },
    {
      id: 3,
      name: "English Literature",
      description: "Analysis of classic and contemporary literature",
      instructor: "Ms. Emily Rodriguez",
      progress: 85,
      platform: "Google Classroom",
      nextClass: "Wednesday, 11:30 AM",
      students: 18,
      color: "bg-green-100 dark:bg-green-900",
      assignments: {
        total: 8,
        completed: 7,
      },
      materials: 32,
    },
    {
      id: 4,
      name: "Chemistry 101",
      description: "Introduction to chemical principles and reactions",
      instructor: "Dr. James Wilson",
      progress: 32,
      platform: "Microsoft Teams",
      nextClass: "Thursday, 9:00 AM",
      students: 24,
      color: "bg-yellow-100 dark:bg-yellow-900",
      assignments: {
        total: 14,
        completed: 4,
      },
      materials: 28,
    },
    {
      id: 5,
      name: "World History",
      description: "Survey of major historical events and civilizations",
      instructor: "Dr. Lisa Thompson",
      progress: 55,
      platform: "Google Classroom",
      nextClass: "Friday, 1:00 PM",
      students: 26,
      color: "bg-red-100 dark:bg-red-900",
      assignments: {
        total: 9,
        completed: 5,
      },
      materials: 42,
    },
    {
      id: 6,
      name: "Computer Science",
      description: "Introduction to programming and algorithms",
      instructor: "Prof. David Lee",
      progress: 78,
      platform: "Microsoft Teams",
      nextClass: "Monday, 3:30 PM",
      students: 20,
      color: "bg-indigo-100 dark:bg-indigo-900",
      assignments: {
        total: 16,
        completed: 12,
      },
      materials: 36,
    },
  ])

  // Filter courses based on search query and platform filter
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform =
      filterPlatform === "all" || course.platform.toLowerCase().includes(filterPlatform.toLowerCase())
    return matchesSearch && matchesPlatform
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search courses..."
              className="w-full sm:w-[250px] rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
          >
            <option value="all">All Platforms</option>
            <option value="google classroom">Google Classroom</option>
            <option value="microsoft teams">Microsoft Teams</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div key={course.id} className="rounded-lg border bg-card overflow-hidden">
            <div className={`h-2 ${course.color}`}></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{course.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{course.description}</p>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm font-medium">Progress:</span>
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Instructor:</span>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Next class:</span>
                  <span>{course.nextClass}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Platform:</span>
                  <span>{course.platform}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-6">
                <div className="text-center p-2 rounded-md bg-muted/50">
                  <p className="text-xs text-muted-foreground">Assignments</p>
                  <p className="font-medium">
                    {course.assignments.completed}/{course.assignments.total}
                  </p>
                </div>
                <div className="text-center p-2 rounded-md bg-muted/50">
                  <p className="text-xs text-muted-foreground">Materials</p>
                  <p className="font-medium">{course.materials}</p>
                </div>
                <div className="text-center p-2 rounded-md bg-muted/50">
                  <p className="text-xs text-muted-foreground">Students</p>
                  <p className="font-medium">{course.students}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button variant="outline" size="sm" className="text-primary">
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Open in {course.platform.split(" ")[0]}
                </Button>
                <Link to={`/student/courses/${course.id}`}>
                  <Button size="sm">
                    View Course
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

