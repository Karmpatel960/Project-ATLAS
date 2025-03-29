"use client"

import { useState } from "react"
import { Save, Bell, Moon, Sun, Globe, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "../../components/ui/Button"

export default function StudentSettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form states
  const [accountSettings, setAccountSettings] = useState({
    name: "Alex Smith",
    email: "alex.smith@example.com",
    language: "english",
    darkMode: "system",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    assignmentReminders: true,
    gradeUpdates: true,
    courseAnnouncements: true,
    dueDateReminders: true,
  })

  const handleAccountChange = (e) => {
    const { name, value, type, checked } = e.target
    setAccountSettings({
      ...accountSettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    })
  }

  const handleSaveSettings = (e) => {
    e.preventDefault()
    // In a real app, this would save the settings to a backend
    alert("Settings saved successfully!")
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    // In a real app, this would validate and update the password
    alert("Password updated successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <button
              onClick={() => setActiveTab("account")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeTab === "account" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeTab === "notifications" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeTab === "security" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              Security
            </button>
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {activeTab === "account" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Account Settings</h3>
                <p className="text-sm text-muted-foreground">Update your account information and preferences.</p>
              </div>
              <form onSubmit={handleSaveSettings}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={accountSettings.name}
                      onChange={handleAccountChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={accountSettings.email}
                      onChange={handleAccountChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="language" className="text-sm font-medium">
                      Language
                    </label>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <select
                        id="language"
                        name="language"
                        value={accountSettings.language}
                        onChange={handleAccountChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="darkMode" className="text-sm font-medium">
                      Theme
                    </label>
                    <div className="flex items-center gap-2">
                      {accountSettings.darkMode === "dark" ? (
                        <Moon className="h-4 w-4 text-muted-foreground" />
                      ) : accountSettings.darkMode === "light" ? (
                        <Sun className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <div className="flex h-4 w-4 items-center justify-center text-muted-foreground">
                          <Moon className="h-3 w-3 rotate-[-30deg]" />
                          <Sun className="h-3 w-3 rotate-[15deg]" />
                        </div>
                      )}
                      <select
                        id="darkMode"
                        name="darkMode"
                        value={accountSettings.darkMode}
                        onChange={handleAccountChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                      </select>
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Notification Settings</h3>
                <p className="text-sm text-muted-foreground">Configure how you receive notifications.</p>
              </div>
              <form onSubmit={handleSaveSettings}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <label htmlFor="emailNotifications" className="text-sm font-medium">
                        Email Notifications
                      </label>
                      <p className="text-xs text-muted-foreground">Receive notifications via email.</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <label htmlFor="assignmentReminders" className="text-sm font-medium">
                        Assignment Reminders
                      </label>
                      <p className="text-xs text-muted-foreground">Get reminders about upcoming assignments.</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="assignmentReminders"
                        name="assignmentReminders"
                        checked={notificationSettings.assignmentReminders}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <label htmlFor="gradeUpdates" className="text-sm font-medium">
                        Grade Updates
                      </label>
                      <p className="text-xs text-muted-foreground">Receive notifications when grades are updated.</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="gradeUpdates"
                        name="gradeUpdates"
                        checked={notificationSettings.gradeUpdates}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <label htmlFor="courseAnnouncements" className="text-sm font-medium">
                        Course Announcements
                      </label>
                      <p className="text-xs text-muted-foreground">Get notified about new course announcements.</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="courseAnnouncements"
                        name="courseAnnouncements"
                        checked={notificationSettings.courseAnnouncements}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <label htmlFor="dueDateReminders" className="text-sm font-medium">
                        Due Date Reminders
                      </label>
                      <p className="text-xs text-muted-foreground">Get reminders before assignment due dates.</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="dueDateReminders"
                        name="dueDateReminders"
                        checked={notificationSettings.dueDateReminders}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">
                    <Bell className="mr-2 h-4 w-4" />
                    Save Notification Settings
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Security Settings</h3>
                <p className="text-sm text-muted-foreground">Update your password and security preferences.</p>
              </div>
              <form onSubmit={handlePasswordChange}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="currentPassword" className="text-sm font-medium">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="text-sm font-medium">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

