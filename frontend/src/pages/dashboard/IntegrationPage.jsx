"use client"

import { useState } from "react"
import {
  RefreshCw,
  Link2,
  Check,
  AlertCircle,
  FileText,
  Users,
  Calendar,
  BookOpen,
  BarChart2,
  Video,
  MessageSquare,
  Upload,
  ChevronDown,
  ExternalLink,
  Shield,
  X,
  Save,
} from "lucide-react"
import { Button } from "../../components/ui/Button"

export default function IntegrationHubPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState(null)
  const [syncInProgress, setSyncInProgress] = useState(false)
  const [lastSynced, setLastSynced] = useState({
    googleClassroom: "2 hours ago",
    microsoftTeams: "1 day ago",
  })

  // Mock connected platforms
  const [connectedPlatforms, setConnectedPlatforms] = useState([
    {
      id: "google-classroom",
      name: "Google Classroom",
      icon: "/google-classroom-icon.png",
      status: "connected",
      lastSync: "2 hours ago",
      courses: 5,
      students: 127,
      assignments: 24,
    },
    {
      id: "microsoft-teams",
      name: "Microsoft Teams",
      icon: "/microsoft-teams-icon.png",
      status: "connected",
      lastSync: "1 day ago",
      courses: 3,
      students: 82,
      assignments: 18,
    },
  ])

  // Mock sync history
  const [syncHistory, setSyncHistory] = useState([
    {
      id: 1,
      platform: "Google Classroom",
      type: "Assignments",
      status: "success",
      items: 12,
      timestamp: "Mar 16, 2025, 2:30 PM",
    },
    {
      id: 2,
      platform: "Microsoft Teams",
      type: "Students",
      status: "success",
      items: 28,
      timestamp: "Mar 16, 2025, 10:15 AM",
    },
    {
      id: 3,
      platform: "Google Classroom",
      type: "Grades",
      status: "success",
      items: 45,
      timestamp: "Mar 15, 2025, 4:20 PM",
    },
    {
      id: 4,
      platform: "Microsoft Teams",
      type: "Resources",
      status: "failed",
      items: 0,
      timestamp: "Mar 15, 2025, 11:05 AM",
    },
    {
      id: 5,
      platform: "Google Classroom",
      type: "Calendar",
      status: "success",
      items: 8,
      timestamp: "Mar 14, 2025, 3:45 PM",
    },
  ])

  // Mock sync options
  const syncOptions = [
    { id: "assignments", name: "Assignments", icon: FileText, description: "Sync assignments between platforms" },
    { id: "students", name: "Students", icon: Users, description: "Sync student roster and information" },
    { id: "calendar", name: "Calendar", icon: Calendar, description: "Sync class schedules and events" },
    { id: "resources", name: "Resources", icon: BookOpen, description: "Sync learning materials and resources" },
    { id: "grades", name: "Grades", icon: BarChart2, description: "Sync grades and assessments" },
  ]

  // Mock integration features
  const integrationFeatures = [
    {
      id: "video-conferencing",
      name: "Video Conferencing",
      icon: Video,
      description: "Launch and manage video calls directly from ATLAS",
      platforms: ["Google Meet", "Microsoft Teams"],
      status: "active",
    },
    {
      id: "discussions",
      name: "Discussions",
      icon: MessageSquare,
      description: "Unified discussion threads across platforms",
      platforms: ["Google Classroom", "Microsoft Teams"],
      status: "active",
    },
    {
      id: "file-sharing",
      name: "File Sharing",
      icon: Upload,
      description: "Share files across all connected platforms",
      platforms: ["Google Drive", "OneDrive"],
      status: "active",
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart2,
      description: "Combined analytics from all platforms",
      platforms: ["Google Classroom", "Microsoft Teams"],
      status: "active",
    },
  ]

  // Handle sync
  const handleSync = (platform) => {
    setSyncInProgress(true)

    // Simulate sync process
    setTimeout(() => {
      setSyncInProgress(false)

      // Update last synced time
      setLastSynced({
        ...lastSynced,
        [platform]: "Just now",
      })

      // Add to sync history
      setSyncHistory([
        {
          id: syncHistory.length + 1,
          platform: platform === "googleClassroom" ? "Google Classroom" : "Microsoft Teams",
          type: "All Data",
          status: "success",
          items: Math.floor(Math.random() * 50) + 10,
          timestamp: new Date().toLocaleString(),
        },
        ...syncHistory,
      ])
    }, 3000)
  }

  // Handle connect new platform
  const handleConnectPlatform = () => {
    setIsConnecting(true)
  }

  // Handle platform selection
  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform)
  }

  // Handle platform connection
  const handleConfirmConnection = () => {
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false)
      setSelectedPlatform(null)

      // If we were adding a new platform, we would update the connectedPlatforms state here
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Integration Hub</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleConnectPlatform()}>
            <Link2 className="mr-2 h-4 w-4" />
            Connect Platform
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "overview"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("sync")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "sync"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sync Center
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "history"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sync History
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "settings"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Settings
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Connected Platforms */}
          <div className="grid gap-6 md:grid-cols-2">
            {connectedPlatforms.map((platform) => (
              <div key={platform.id} className="rounded-lg border bg-card overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                        {platform.icon ? (
                          <img src={platform.icon || "/placeholder.svg"} alt={platform.name} className="h-8 w-8" />
                        ) : (
                          <Link2 className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{platform.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                            <Check className="h-3 w-3 mr-1" />
                            Connected
                          </span>
                          <span className="text-xs text-muted-foreground">Last synced: {platform.lastSync}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleSync(platform.id === "google-classroom" ? "googleClassroom" : "microsoftTeams")
                      }
                      disabled={syncInProgress}
                    >
                      {syncInProgress ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Syncing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Sync Now
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{platform.courses}</p>
                      <p className="text-sm text-muted-foreground">Courses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{platform.students}</p>
                      <p className="text-sm text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{platform.assignments}</p>
                      <p className="text-sm text-muted-foreground">Assignments</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button variant="ghost" size="sm" className="text-primary">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Manage Settings
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Integration Features */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Integration Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {integrationFeatures.map((feature) => (
              <div key={feature.id} className="rounded-lg border bg-card p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{feature.name}</h3>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    <div className="mt-4">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Supported Platforms:</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sync Center Tab */}
      {activeTab === "sync" && (
        <div className="space-y-6">
          <div className="rounded-lg border bg-card">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Sync Center</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and synchronize data between ATLAS and your connected platforms.
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {connectedPlatforms.map((platform) => (
                  <div key={platform.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/30 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          {platform.icon ? (
                            <img src={platform.icon || "/placeholder.svg"} alt={platform.name} className="h-6 w-6" />
                          ) : (
                            <Link2 className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{platform.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            Last synced:{" "}
                            {platform.id === "google-classroom"
                              ? lastSynced.googleClassroom
                              : lastSynced.microsoftTeams}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() =>
                          handleSync(platform.id === "google-classroom" ? "googleClassroom" : "microsoftTeams")
                        }
                        disabled={syncInProgress}
                      >
                        {syncInProgress ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Syncing...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Sync All
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {syncOptions.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center justify-between py-2 border-b last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <div className="rounded-full bg-muted p-1.5">
                                <option.icon className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{option.name}</p>
                                <p className="text-xs text-muted-foreground">{option.description}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Sync
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sync History Tab */}
      {activeTab === "history" && (
        <div className="space-y-6">
          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Sync History</h2>
              <p className="text-sm text-muted-foreground mt-1">
                View the history of synchronization activities between platforms.
              </p>
            </div>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="h-12 px-4 text-left font-medium">Platform</th>
                    <th className="h-12 px-4 text-left font-medium">Type</th>
                    <th className="h-12 px-4 text-left font-medium">Status</th>
                    <th className="h-12 px-4 text-left font-medium">Items</th>
                    <th className="h-12 px-4 text-left font-medium">Timestamp</th>
                    <th className="h-12 px-4 text-left font-medium w-[70px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {syncHistory.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">{item.platform}</td>
                      <td className="p-4 align-middle">{item.type}</td>
                      <td className="p-4 align-middle">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.status === "success"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {item.status === "success" ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Success
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Failed
                            </>
                          )}
                        </span>
                      </td>
                      <td className="p-4 align-middle">{item.items}</td>
                      <td className="p-4 align-middle text-muted-foreground">{item.timestamp}</td>
                      <td className="p-4 align-middle">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="rounded-lg border bg-card">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Integration Settings</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Configure how ATLAS integrates with external platforms.
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">General Settings</h3>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium">Automatic Synchronization</h4>
                      <p className="text-sm text-muted-foreground">Automatically sync data between platforms</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium">Sync Frequency</h4>
                      <p className="text-sm text-muted-foreground">How often to automatically sync data</p>
                    </div>
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option>Every hour</option>
                      <option>Every 6 hours</option>
                      <option>Every 12 hours</option>
                      <option>Once a day</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium">Conflict Resolution</h4>
                      <p className="text-sm text-muted-foreground">How to handle data conflicts between platforms</p>
                    </div>
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option>ATLAS takes precedence</option>
                      <option>External platform takes precedence</option>
                      <option>Use most recent update</option>
                      <option>Ask me every time</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="font-medium">Sync Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive notifications about sync activities</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <h3 className="text-lg font-medium">Platform-Specific Settings</h3>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/30 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <img src="/google-classroom-icon.png" alt="Google Classroom" className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium">Google Classroom</h4>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/30 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <img src="/microsoft-teams-icon.png" alt="Microsoft Teams" className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium">Microsoft Teams</h4>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <h3 className="text-lg font-medium">Advanced Settings</h3>

                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h4 className="font-medium">Data Retention</h4>
                      <p className="text-sm text-muted-foreground">How long to keep sync history and logs</p>
                    </div>
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>1 year</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="font-medium">API Rate Limiting</h4>
                      <p className="text-sm text-muted-foreground">Limit API calls to external platforms</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Platform Modal */}
      {isConnecting && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card border rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Connect Platform</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsConnecting(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {!selectedPlatform ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Select a platform to connect with ATLAS. This will allow you to sync data between platforms.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => handleSelectPlatform("google-classroom")}
                    className="w-full flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <img src="/google-classroom-icon.png" alt="Google Classroom" className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Google Classroom</h3>
                      <p className="text-xs text-muted-foreground">Connect with Google Classroom</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectPlatform("microsoft-teams")}
                    className="w-full flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <img src="/microsoft-teams-icon.png" alt="Microsoft Teams" className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Microsoft Teams</h3>
                      <p className="text-xs text-muted-foreground">Connect with Microsoft Teams</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectPlatform("zoom")}
                    className="w-full flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <img src="/zoom-icon.png" alt="Zoom" className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Zoom</h3>
                      <p className="text-xs text-muted-foreground">Connect with Zoom</p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/30">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <img
                      src={`/${selectedPlatform}-icon.png`}
                      alt={selectedPlatform === "google-classroom" ? "Google Classroom" : "Microsoft Teams"}
                      className="h-6 w-6"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {selectedPlatform === "google-classroom"
                        ? "Google Classroom"
                        : selectedPlatform === "microsoft-teams"
                          ? "Microsoft Teams"
                          : "Zoom"}
                    </h3>
                    <p className="text-xs text-muted-foreground">Connect and sync your data</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <p>ATLAS will request the following permissions:</p>
                  </div>
                  <ul className="space-y-2 pl-6 text-sm">
                    <li className="list-disc text-muted-foreground">Access to courses and class materials</li>
                    <li className="list-disc text-muted-foreground">Access to assignments and grades</li>
                    <li className="list-disc text-muted-foreground">Access to student roster information</li>
                    <li className="list-disc text-muted-foreground">Access to calendar and scheduling</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">
                    ATLAS will never modify your data without your explicit permission.
                  </p>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setSelectedPlatform(null)}>
                    Back
                  </Button>
                  <Button onClick={handleConfirmConnection}>Connect</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

