"use client"

import { useState } from "react"
import {
  FileText,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
} from "lucide-react"
import { Button } from "../../components/ui/Button"

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")
  const [sortBy, setSortBy] = useState("dueDate")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Sample assignments data
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Algebra Quiz",
      description: "Complete the online quiz covering linear equations and inequalities",
      course: "Mathematics 101",
      courseId: 1,
      dueDate: "2025-03-20T23:59:00",
      status: "pending",
      platform: "Google Classroom",
      points: 25,
    },
    {
      id: 2,
      title: "Lab Report: Motion",
      description: "Write a lab report on the motion experiment conducted in class",
      course: "Physics Fundamentals",
      courseId: 2,
      dueDate: "2025-03-21T17:00:00",
      status: "pending",
      platform: "Microsoft Teams",
      points: 50,
    },
    {
      id: 3,
      title: "Shakespeare Analysis",
      description: "Write a 1000-word analysis of Shakespeare's Hamlet",
      course: "English Literature",
      courseId: 3,
      dueDate: "2025-03-22T23:59:00",
      status: "pending",
      platform: "Google Classroom",
      points: 100,
    },
    {
      id: 4,
      title: "Chemical Reactions Worksheet",
      description: "Complete the worksheet on balancing chemical equations",
      course: "Chemistry 101",
      courseId: 4,
      dueDate: "2025-03-23T09:00:00",
      status: "pending",
      platform: "Microsoft Teams",
      points: 30,
    },
    {
      id: 5,
      title: "Trigonometry Problems",
      description: "Solve the set of trigonometric equations",
      course: "Mathematics 101",
      courseId: 1,
      dueDate: "2025-03-15T23:59:00",
      status: "completed",
      platform: "Google Classroom",
      points: 40,
      grade: "38/40",
    },
    {
      id: 6,
      title: "Energy Conservation Quiz",
      description: "Complete the online quiz on energy conservation principles",
      course: "Physics Fundamentals",
      courseId: 2,
      dueDate: "2025-03-14T23:59:00",
      status: "completed",
      platform: "Microsoft Teams",
      points: 25,
      grade: "19.5/25",
    },
    {
      id: 7,
      title: "Poetry Analysis",
      description: "Analyze the themes in the selected poems",
      course: "English Literature",
      courseId: 3,
      dueDate: "2025-03-12T23:59:00",
      status: "completed",
      platform: "Google Classroom",
      points: 50,
      grade: "47.5/50",
    },
    {
      id: 8,
      title: "Periodic Table Quiz",
      description: "Complete the quiz on the periodic table of elements",
      course: "Chemistry 101",
      courseId: 4,
      dueDate: "2025-03-10T09:00:00",
      status: "missed",
      platform: "Microsoft Teams",
      points: 20,
    },
  ])

  // Get unique courses for filter dropdown
  const courses = [...new Set(assignments.map((a) => a.course))]

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    }

    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    }

    // Otherwise return formatted date
    return (
      date.toLocaleDateString([], { month: "short", day: "numeric" }) +
      `, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    )
  }

  // Calculate time remaining
  const getTimeRemaining = (dateString) => {
    const dueDate = new Date(dateString)
    const now = new Date()

    if (dueDate < now) {
      return "Past due"
    }

    const diffMs = dueDate - now
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} left`
    } else {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} left`
    }
  }

  // Filter and sort assignments
  const filteredAssignments = assignments
    .filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.course.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
      const matchesCourse = courseFilter === "all" || assignment.course === courseFilter
      return matchesSearch && matchesStatus && matchesCourse
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate)
      } else if (sortBy === "course") {
        return a.course.localeCompare(b.course)
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title)
      } else if (sortBy === "points") {
        return b.points - a.points
      }
      return 0
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search assignments..."
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="missed">Missed</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Course</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Sort By</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="dueDate">Due Date</option>
                <option value="course">Course</option>
                <option value="title">Title</option>
                <option value="points">Points</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Assignments List */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-semibold">All Assignments</h2>
          <p className="text-sm text-muted-foreground mt-1">View and manage all your assignments across platforms.</p>
        </div>
        <div className="divide-y">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{assignment.title}</h3>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            assignment.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : assignment.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {assignment.status === "completed" ? (
                            <>
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed
                            </>
                          ) : assignment.status === "pending" ? (
                            <>
                              <AlertCircle className="mr-1 h-3 w-3" />
                              Pending
                            </>
                          ) : (
                            <>
                              <XCircle className="mr-1 h-3 w-3" />
                              Missed
                            </>
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{assignment.description}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-muted-foreground">Course:</span>
                          <span>{assignment.course}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-muted-foreground">Platform:</span>
                          <span>{assignment.platform}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-muted-foreground">Points:</span>
                          <span>{assignment.points}</span>
                        </div>
                        {assignment.grade && (
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-muted-foreground">Grade:</span>
                            <span className="font-medium text-green-600 dark:text-green-400">{assignment.grade}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Due: {formatDate(assignment.dueDate)}</span>
                      </div>
                      {assignment.status === "pending" && (
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-yellow-600 dark:text-yellow-400">
                            {getTimeRemaining(assignment.dueDate)}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button
                      variant={assignment.status === "completed" ? "outline" : "default"}
                      size="sm"
                      className="mt-2"
                    >
                      {assignment.status === "completed" ? "View Submission" : "Start Assignment"}
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No assignments found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

