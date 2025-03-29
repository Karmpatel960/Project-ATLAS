"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, CheckCircle2, BarChart3 } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { useToast } from "../../components/ui/ToastContext"
import { Loader } from "../../components/ui/Loader"
import { getDashboardStats, getUpcomingClasses, getRecentActivities } from "../../api/dashboard"

export default function DashboardPage() {
  const { addToast } = useToast()
  const [stats, setStats] = useState([])
  const [upcomingClasses, setUpcomingClasses] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [performancePeriod, setPerformancePeriod] = useState("week")

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Fetch all dashboard data in parallel
        const [statsData, classesData, activitiesData] = await Promise.all([
          getDashboardStats(),
          getUpcomingClasses(),
          getRecentActivities(),
        ])

        setStats(statsData.stats || [])
        setUpcomingClasses(classesData.classes || [])
        setRecentActivities(activitiesData.activities || [])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
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
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Class
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <h3 className="text-2xl font-bold tracking-tight mt-2">{stat.value}</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p
              className={`mt-4 text-xs font-medium ${
                stat.changeType === "increase"
                  ? "text-green-500"
                  : stat.changeType === "decrease"
                    ? "text-red-500"
                    : "text-muted-foreground"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Classes */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-6 pb-2">
            <h2 className="font-semibold">Today's Classes</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="p-6 pt-0">
            {upcomingClasses.length > 0 ? (
              upcomingClasses.map((cls) => (
                <div key={cls.id} className="flex items-center gap-4 py-3 border-b last:border-0">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{cls.name}</p>
                    <p className="text-sm text-muted-foreground">{cls.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{cls.students} students</p>
                    <p className="text-xs text-muted-foreground">{cls.room}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>No classes scheduled for today</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-6 pb-2">
            <h2 className="font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="p-6 pt-0">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 py-3 border-b last:border-0">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">
                      {activity.action} <span className="font-normal text-muted-foreground">"{activity.target}"</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>No recent activities</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Class Performance</h2>
          <select
            className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            value={performancePeriod}
            onChange={(e) => setPerformancePeriod(e.target.value)}
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 3 months</option>
          </select>
        </div>
        <div className="h-[300px] flex items-center justify-center">
          <div className="flex flex-col items-center text-muted-foreground">
            <BarChart3 className="h-16 w-16 mb-4" />
            <p>Performance chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

