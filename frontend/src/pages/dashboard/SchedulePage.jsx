"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, BookOpen, X, Check, CalendarIcon } from "lucide-react"
import { Button } from "../../components/ui/Button"

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    class: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  })

  // Sample class data
  const classes = [
    { id: 1, name: "Mathematics 101" },
    { id: 2, name: "Physics Fundamentals" },
    { id: 3, name: "English Literature" },
    { id: 4, name: "Chemistry 101" },
    { id: 5, name: "World History" },
  ]

  // Sample events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Mathematics 101",
      class: "Mathematics 101",
      date: "2025-03-16",
      startTime: "10:00",
      endTime: "11:30",
      description: "Introduction to Algebra",
    },
    {
      id: 2,
      title: "Physics Lab",
      class: "Physics Fundamentals",
      date: "2025-03-16",
      startTime: "13:00",
      endTime: "14:30",
      description: "Practical experiments on motion",
    },
    {
      id: 3,
      title: "English Literature",
      class: "English Literature",
      date: "2025-03-17",
      startTime: "09:00",
      endTime: "10:30",
      description: "Shakespeare analysis",
    },
    {
      id: 4,
      title: "Chemistry Quiz",
      class: "Chemistry 101",
      date: "2025-03-18",
      startTime: "11:00",
      endTime: "12:00",
      description: "Mid-term assessment",
    },
    {
      id: 5,
      title: "World History",
      class: "World History",
      date: "2025-03-19",
      startTime: "14:00",
      endTime: "15:30",
      description: "Ancient civilizations",
    },
  ])

  // Get current month and year
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })
  const currentYear = currentDate.getFullYear()

  // Navigate to previous month
  const prevMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  // Navigate to next month
  const nextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  // Get events for a specific day
  const getEventsForDay = (day) => {
    if (!day) return []

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const formattedMonth = month < 10 ? `0${month}` : month
    const formattedDay = day < 10 ? `0${day}` : day
    const dateString = `${year}-${formattedMonth}-${formattedDay}`

    return events.filter((event) => event.date === dateString)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEvent({
      ...newEvent,
      [name]: value,
    })
  }

  // Handle form submission
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime || !newEvent.endTime) {
      return // Validation would go here
    }

    const newEventObj = {
      id: events.length + 1,
      ...newEvent,
    }

    setEvents([...events, newEventObj])
    setNewEvent({
      title: "",
      class: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
    })
    setIsAddingEvent(false)
  }

  // Format time (24h to 12h)
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <Button onClick={() => setIsAddingEvent(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Calendar */}
      <div className="rounded-lg border bg-card">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {currentMonth} {currentYear}
            </h2>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {generateCalendarDays().map((day, index) => {
              const eventsForDay = day ? getEventsForDay(day) : []
              const isToday =
                day &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear() &&
                day === new Date().getDate()

              return (
                <div
                  key={index}
                  className={`min-h-[100px] border rounded-md p-1 ${
                    day ? "bg-background" : "bg-muted/20"
                  } ${isToday ? "border-primary" : "border-border"}`}
                >
                  {day && (
                    <>
                      <div className="text-right">
                        <span
                          className={`text-sm inline-block rounded-full w-6 h-6 text-center leading-6 ${
                            isToday ? "bg-primary text-primary-foreground" : ""
                          }`}
                        >
                          {day}
                        </span>
                      </div>
                      <div className="mt-1 space-y-1">
                        {eventsForDay.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded bg-primary/10 text-primary truncate cursor-pointer"
                            title={`${event.title} (${formatTime(event.startTime)} - ${formatTime(event.endTime)})`}
                          >
                            {formatTime(event.startTime)} {event.title}
                          </div>
                        ))}
                        {eventsForDay.length > 3 && (
                          <div className="text-xs text-muted-foreground text-center">
                            +{eventsForDay.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Upcoming Events</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
        <div className="p-4">
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-start gap-4 py-3 border-b last:border-0">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.class}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {event.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No upcoming events</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsAddingEvent(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {isAddingEvent && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card border rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Event</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsAddingEvent(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Event Title
                </label>
                <input
                  id="title"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g., Math Quiz"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="class" className="text-sm font-medium">
                  Class
                </label>
                <select
                  id="class"
                  name="class"
                  value={newEvent.class}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.name}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="startTime" className="text-sm font-medium">
                    Start Time
                  </label>
                  <input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={newEvent.startTime}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="endTime" className="text-sm font-medium">
                    End Time
                  </label>
                  <input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={newEvent.endTime}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={newEvent.description}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Brief description of the event"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>
                  <Check className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

