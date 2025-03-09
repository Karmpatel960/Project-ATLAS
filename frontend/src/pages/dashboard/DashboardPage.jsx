// DashboardPage.jsx
import { useState } from 'react'
import { Users, BookOpen, Calendar, TrendingUp, Clock, CheckCircle2, BarChart3 } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function DashboardPage() {
  // Sample data
  const stats = [
    { name: 'Total Students', value: '124', icon: Users, change: '+12%', changeType: 'increase' },
    { name: 'Active Classes', value: '8', icon: BookOpen, change: '+2', changeType: 'increase' },
    { name: 'Upcoming Sessions', value: '12', icon: Calendar, change: '3 today', changeType: 'neutral' },
    { name: 'Attendance Rate', value: '94%', icon: TrendingUp, change: '+2%', changeType: 'increase' },
  ]

  const upcomingClasses = [
    { id: 1, name: 'Mathematics 101', time: '10:00 AM - 11:30 AM', students: 28, room: 'Virtual Room 1' },
    { id: 2, name: 'Physics Fundamentals', time: '1:00 PM - 2:30 PM', students: 22, room: 'Virtual Room 3' },
    { id: 3, name: 'English Literature', time: '3:00 PM - 4:30 PM', students: 18, room: 'Virtual Room 2' },
  ]

  const recentActivities = [
    { id: 1, action: 'Added new student', target: 'Emily Johnson', time: '2 hours ago' },
    { id: 2, action: 'Created new class', target: 'Chemistry 101', time: '4 hours ago' },
    { id: 3, action: 'Updated schedule', target: 'Physics Fundamentals', time: '6 hours ago' },
    { id: 4, action: 'Graded assignments', target: 'Mathematics 101', time: '1 day ago' },
    { id: 5, action: 'Added new material', target: 'English Literature', time: '1 day ago' },
  ]

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
            <p className={`mt-4 text-xs font-medium ${
              stat.changeType === 'increase' ? 'text-green-500' : 
              stat.changeType === 'decrease' ? 'text-red-500' : 'text-muted-foreground'
            }`}>
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
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="p-6 pt-0">
            {upcomingClasses.map((cls) => (
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
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-6 pb-2">
            <h2 className="font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="p-6 pt-0">
            {recentActivities.map((activity) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Class Performance</h2>
          <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
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
