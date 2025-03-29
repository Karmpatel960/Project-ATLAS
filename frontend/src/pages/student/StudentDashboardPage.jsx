"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BookOpen, FileText, Clock, Calendar, BarChart2, AlertCircle, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { useToast } from "../../components/ui/ToastContext"
import { Loader } from "../../components/ui/Loader"
import {
  getStudentDashboard,
  getEnrolledCourses,
  getUpcomingAssignments,
  getRecentGrades,
  getStudentEvents,
} from "../../api/student/dashboard"

export default function StudentDashboardPage() {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)
  const [courses, setCourses] = useState([])
  const [upcomingAssignments, setUpcomingAssignments] = useState([])
  const [recentGrades, setRecentGrades] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Fetch all dashboard data in parallel
        const [dashboardResponse, coursesResponse, assignmentsResponse, gradesResponse, eventsResponse] =
          await Promise.all([
            getStudentDashboard(),
            getEnrolledCourses(),
            getUpcomingAssignments(),
            getRecentGrades(),
            getStudentEvents(),
          ])

        setDashboardData(dashboardResponse)
        setCourses(coursesResponse.courses || [])
        setUpcomingAssignments(assignmentsResponse.assignments || [])
        setRecentGrades(gradesResponse.grades || [])
        setUpcomingEvents(eventsResponse.events || [])
      } catch (error) {
        console.error("Error fetching student dashboard data:", error)
        addToast("Failed to load dashboard data. Please try again.", "error")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [addToast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            View Schedule
          </Button>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {dashboardData?.studentName || "Student"}!</h2>
            <p className="text-muted-foreground mt-1">
              You have {upcomingAssignments.length} upcoming assignments and {upcomingEvents.length} classes scheduled
              for this week.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              View Assignments
            </Button>
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              Go to Courses
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Enrolled Courses</p>
              <h3 className="text-2xl font-bold tracking-tight mt-1">{dashboardData?.stats?.enrolledCourses || 0}</h3>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Assignments</p>
              <h3 className="text-2xl font-bold tracking-tight mt-1">
                {dashboardData?.stats?.pendingAssignments || 0}
              </h3>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BarChart2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
              <h3 className="text-2xl font-bold tracking-tight mt-1">{dashboardData?.stats?.averageGrade || "0%"}</h3>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Study Hours</p>
              <h3 className="text-2xl font-bold tracking-tight mt-1">{dashboardData?.stats?.studyHours || "0h"}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* My Courses */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-6 pb-2">
            <h2 className="font-semibold">My Courses</h2>
            <Link to="/student/courses">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </Link>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div key={course.id} className="rounded-lg border overflow-hidden">
                    <div className={`h-2 ${course.color}`}></div>
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{course.name}</h3>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">Next class: {course.nextClass}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{course.platform}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{course.progress}%</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${course.progress}%` }}></div>
                            </div>
                          </div>
                          <Link to={`/student/courses/${course.id}`}>
                            <Button variant="ghost" size="sm" className="text-primary mt-2">
                              Go to Course
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p>No courses found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-6 pb-2">
            <h2 className="font-semibold">Upcoming Assignments</h2>
            <Link to="/student/assignments">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </Link>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {upcomingAssignments.length > 0 ? (
                upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-start gap-4 py-3 border-b last:border-0">
                    <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium text-red-500">Due: {assignment.dueDate}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{assignment.platform}</span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Pending
                        </span>
                        <Button variant="ghost" size="sm" className="h-7 text-primary">
                          Start Assignment
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p>No upcoming assignments</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Grades */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-6 pb-2">
            <h2 className="font-semibold">Recent Grades</h2>
            <Link to="/student/grades">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </Link>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {recentGrades.length > 0 ? (
                recentGrades.map((grade) => (
                  <div key={grade.id} className="flex items-start gap-4 py-3 border-b last:border-0">
                    <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                      <BarChart2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <p className="font-medium">{grade.title}</p>
                          <p className="text-sm text-muted-foreground">{grade.course}</p>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`text-lg font-bold ${
                              grade.status === "excellent"
                                ? "text-green-600 dark:text-green-400"
                                : grade.status === "good"
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-yellow-600 dark:text-yellow-400"
                            }`}
                          >
                            {grade.grade}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Graded on {grade.date}</span>
                        <Button variant="ghost" size="sm" className="h-7 text-primary">
                          View Feedback
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p>No recent grades</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-6 pb-2">
            <h2 className="font-semibold">Upcoming Events</h2>
            <Link to="/student/schedule">
              <Button variant="ghost" size="sm" className="text-primary">
                View Calendar
              </Button>
            </Link>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 py-3 border-b last:border-0">
                    <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{event.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            event.type === "class"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : event.type === "study"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {event.type === "class" ? "Class" : event.type === "study" ? "Study Group" : "Exam"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p>No upcoming events</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

