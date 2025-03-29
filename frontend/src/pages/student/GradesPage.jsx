"use client"

import { useState } from "react"
import {
  BarChart2,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronRight,
  FileText,
  ExternalLink,
} from "lucide-react"
import { Button } from "../../components/ui/Button"

export default function GradesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [expandedCourse, setExpandedCourse] = useState(null)

  // Sample grades data
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Mathematics 101",
      instructor: "Dr. Sarah Johnson",
      currentGrade: "A",
      percentage: 92,
      trend: "up",
      assignments: [
        {
          id: 101,
          title: "Algebra Quiz",
          type: "Quiz",
          dueDate: "2025-03-15",
          points: "38/40",
          percentage: 95,
          feedback: "Excellent work! Just a small error in question 7.",
        },
        {
          id: 102,
          title: "Geometry Homework",
          type: "Homework",
          dueDate: "2025-03-10",
          points: "28/30",
          percentage: 93,
          feedback: "Good job showing your work.",
        },
        {
          id: 103,
          title: "Calculus Midterm",
          type: "Exam",
          dueDate: "2025-03-05",
          points: "88/100",
          percentage: 88,
          feedback: "Strong understanding of derivatives. Work on integration techniques.",
        },
      ],
    },
    {
      id: 2,
      name: "Physics Fundamentals",
      instructor: "Prof. Michael Chen",
      currentGrade: "B",
      percentage: 83,
      trend: "stable",
      assignments: [
        {
          id: 201,
          title: "Energy Conservation Quiz",
          type: "Quiz",
          dueDate: "2025-03-14",
          points: "19.5/25",
          percentage: 78,
          feedback: "Good understanding of concepts. Review conservation laws.",
        },
        {
          id: 202,
          title: "Motion Lab Report",
          type: "Lab",
          dueDate: "2025-03-08",
          points: "42/50",
          percentage: 84,
          feedback: "Good data collection. Improve analysis section.",
        },
        {
          id: 203,
          title: "Forces Homework",
          type: "Homework",
          dueDate: "2025-03-01",
          points: "18/20",
          percentage: 90,
          feedback: "Well done!",
        },
      ],
    },
    {
      id: 3,
      name: "English Literature",
      instructor: "Ms. Emily Rodriguez",
      currentGrade: "A",
      percentage: 95,
      trend: "up",
      assignments: [
        {
          id: 301,
          title: "Poetry Analysis",
          type: "Essay",
          dueDate: "2025-03-12",
          points: "47.5/50",
          percentage: 95,
          feedback: "Excellent analysis of themes and literary devices. Very insightful.",
        },
        {
          id: 302,
          title: "Shakespeare Essay",
          type: "Essay",
          dueDate: "2025-03-05",
          points: "92/100",
          percentage: 92,
          feedback: "Strong thesis and supporting evidence. Work on transitions between paragraphs.",
        },
        {
          id: 303,
          title: "Reading Comprehension",
          type: "Quiz",
          dueDate: "2025-02-28",
          points: "24/25",
          percentage: 96,
          feedback: "Excellent understanding of the text.",
        },
      ],
    },
    {
      id: 4,
      name: "Chemistry 101",
      instructor: "Dr. James Wilson",
      currentGrade: "C+",
      percentage: 78,
      trend: "down",
      assignments: [
        {
          id: 401,
          title: "Periodic Table Quiz",
          type: "Quiz",
          dueDate: "2025-03-10",
          points: "0/20",
          percentage: 0,
          feedback: "Missed assignment",
        },
        {
          id: 402,
          title: "Chemical Reactions Lab",
          type: "Lab",
          dueDate: "2025-03-03",
          points: "38/50",
          percentage: 76,
          feedback: "Good lab procedure. Improve your analysis and conclusions.",
        },
        {
          id: 403,
          title: "Atomic Structure Homework",
          type: "Homework",
          dueDate: "2025-02-25",
          points: "18/20",
          percentage: 90,
          feedback: "Well done!",
        },
      ],
    },
  ])

  // Get unique courses for filter dropdown
  const courseNames = courses.map((c) => c.name)

  // Calculate overall GPA and average
  const calculateOverallStats = () => {
    const gradePoints = {
      "A+": 4.0,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      "D-": 0.7,
      F: 0.0,
    }

    let totalPoints = 0
    let totalPercentage = 0

    courses.forEach((course) => {
      totalPoints += gradePoints[course.currentGrade] || 0
      totalPercentage += course.percentage
    })

    const gpa = (totalPoints / courses.length).toFixed(2)
    const average = (totalPercentage / courses.length).toFixed(1)

    return { gpa, average }
  }

  const { gpa, average } = calculateOverallStats()

  // Filter courses based on search query and course filter
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = courseFilter === "all" || course.name === courseFilter
    return matchesSearch && matchesCourse
  })

  // Get letter grade based on percentage
  const getLetterGrade = (percentage) => {
    if (percentage >= 97) return "A+"
    if (percentage >= 93) return "A"
    if (percentage >= 90) return "A-"
    if (percentage >= 87) return "B+"
    if (percentage >= 83) return "B"
    if (percentage >= 80) return "B-"
    if (percentage >= 77) return "C+"
    if (percentage >= 73) return "C"
    if (percentage >= 70) return "C-"
    if (percentage >= 67) return "D+"
    if (percentage >= 63) return "D"
    if (percentage >= 60) return "D-"
    return "F"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Grades</h1>
        <div className="flex items-center gap-2">
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
          <Button variant="outline" size="icon" className="shrink-0" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      {isFilterOpen && (
        <div className="rounded-lg border bg-card p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Course</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courseNames.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BarChart2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current GPA</p>
              <h3 className="text-2xl font-bold tracking-tight mt-1">{gpa}</h3>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BarChart2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average</p>
              <h3 className="text-2xl font-bold tracking-tight mt-1">{average}%</h3>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BarChart2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Letter Grade</p>
              <h3 className="text-2xl font-bold tracking-tight mt-1">{getLetterGrade(Number.parseFloat(average))}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grades */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-semibold">Course Grades</h2>
          <p className="text-sm text-muted-foreground mt-1">View your grades for all courses.</p>
        </div>
        <div className="divide-y">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id}>
                <div
                  className="p-4 sm:p-6 hover:bg-muted/50 cursor-pointer"
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <BarChart2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{course.name}</h3>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Grade</p>
                        <p className="text-xl font-bold">{course.currentGrade}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Percentage</p>
                        <p className="text-xl font-bold">{course.percentage}%</p>
                      </div>
                      <div className="flex items-center">
                        {course.trend === "up" ? (
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        ) : course.trend === "down" ? (
                          <TrendingDown className="h-5 w-5 text-red-500" />
                        ) : (
                          <Minus className="h-5 w-5 text-yellow-500" />
                        )}
                        {expandedCourse === course.id ? (
                          <ChevronDown className="h-5 w-5 ml-2" />
                        ) : (
                          <ChevronRight className="h-5 w-5 ml-2" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded View */}
                {expandedCourse === course.id && (
                  <div className="bg-muted/30 p-4 sm:p-6 border-t">
                    <h4 className="font-medium mb-4">Assignments</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium p-2 pl-0">Assignment</th>
                            <th className="text-left font-medium p-2">Type</th>
                            <th className="text-left font-medium p-2">Due Date</th>
                            <th className="text-left font-medium p-2">Points</th>
                            <th className="text-left font-medium p-2">Percentage</th>
                            <th className="text-left font-medium p-2 w-[100px]">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {course.assignments.map((assignment) => (
                            <tr key={assignment.id} className="border-b last:border-0 hover:bg-muted/50">
                              <td className="p-2 pl-0">{assignment.title}</td>
                              <td className="p-2">{assignment.type}</td>
                              <td className="p-2">{assignment.dueDate}</td>
                              <td className="p-2">{assignment.points}</td>
                              <td className="p-2">{assignment.percentage}%</td>
                              <td className="p-2">
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        View in {course.name.includes("Google") ? "Google Classroom" : "Microsoft Teams"}
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No courses found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

