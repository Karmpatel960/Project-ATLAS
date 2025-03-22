"use client"

import { useState } from "react"
import { Search, Plus, Filter, Copy, Check, Mail, X, User, Key, Save } from "lucide-react"
import { Button } from "../../components/ui/Button"

export default function ManageStudentAccountsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingStudent, setIsAddingStudent] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [copiedId, setCopiedId] = useState(null)

  // New student form state
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    grade: "",
    password: "",
    sendEmail: true,
  })

  // Sample student accounts data
  const [studentAccounts, setStudentAccounts] = useState([
    {
      id: 1,
      name: "Emily Johnson",
      email: "emily.j@example.com",
      grade: "10th",
      status: "active",
      lastLogin: "2 hours ago",
      dateCreated: "2025-03-01",
      username: "emily.j",
      temporaryPassword: "Student123",
    },
    {
      id: 2,
      name: "James Wilson",
      email: "james.w@example.com",
      grade: "11th",
      status: "active",
      lastLogin: "1 day ago",
      dateCreated: "2025-03-01",
      username: "james.w",
      temporaryPassword: "Student456",
    },
    {
      id: 3,
      name: "Olivia Martinez",
      email: "olivia.m@example.com",
      grade: "9th",
      status: "pending",
      lastLogin: "Never",
      dateCreated: "2025-03-15",
      username: "olivia.m",
      temporaryPassword: "Student789",
    },
    {
      id: 4,
      name: "William Johnson",
      email: "william.j@example.com",
      grade: "12th",
      status: "active",
      lastLogin: "3 hours ago",
      dateCreated: "2025-02-15",
      username: "william.j",
      temporaryPassword: "Student101",
    },
  ])

  // Generate a random password
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewStudent({
      ...newStudent,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle adding a new student account
  const handleAddStudent = () => {
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.email) {
      return // Validation would go here
    }

    const username = `${newStudent.firstName.toLowerCase()}.${newStudent.lastName.charAt(0).toLowerCase()}`
    const password = newStudent.password || generatePassword()

    const newStudentAccount = {
      id: studentAccounts.length + 1,
      name: `${newStudent.firstName} ${newStudent.lastName}`,
      email: newStudent.email,
      grade: newStudent.grade,
      status: "pending",
      lastLogin: "Never",
      dateCreated: new Date().toISOString().split("T")[0],
      username: username,
      temporaryPassword: password,
    }

    setStudentAccounts([...studentAccounts, newStudentAccount])

    // In a real application, you would send an email here if sendEmail is true
    if (newStudent.sendEmail) {
      console.log(`Email sent to ${newStudent.email} with login credentials`)
    }

    setNewStudent({
      firstName: "",
      lastName: "",
      email: "",
      grade: "",
      password: "",
      sendEmail: true,
    })

    setIsAddingStudent(false)
  }

  // Handle copying login credentials
  const handleCopyCredentials = (student) => {
    const credentials = `Username: ${student.username}\nPassword: ${student.temporaryPassword}`
    navigator.clipboard.writeText(credentials)
    setCopiedId(student.id)

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  // Handle sending login credentials via email
  const handleSendCredentials = (student) => {
    // In a real application, this would send an email with the credentials
    console.log(`Sending credentials to ${student.email}`)

    // Update the student status
    const updatedAccounts = studentAccounts.map((acc) => {
      if (acc.id === student.id) {
        return { ...acc, status: "active" }
      }
      return acc
    })

    setStudentAccounts(updatedAccounts)

    // Show a success message (in a real app, you'd use a toast notification)
    alert(`Login credentials sent to ${student.email}`)
  }

  // Filter student accounts based on search query and status filter
  const filteredAccounts = studentAccounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.username.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || account.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Manage Student Accounts</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search students..."
              className="w-full sm:w-[250px] rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsAddingStudent(true)} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Student Account
          </Button>
        </div>
      </div>

      {/* Filters */}
      {isFilterOpen && (
        <div className="rounded-lg border bg-card p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Student Accounts Table */}
      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h2 className="font-semibold">Student Accounts</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage student login credentials and access.</p>
        </div>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b">
              <tr>
                <th className="h-12 px-4 text-left font-medium">Name</th>
                <th className="h-12 px-4 text-left font-medium">Email</th>
                <th className="h-12 px-4 text-left font-medium">Username</th>
                <th className="h-12 px-4 text-left font-medium">Grade</th>
                <th className="h-12 px-4 text-left font-medium">Status</th>
                <th className="h-12 px-4 text-left font-medium">Last Login</th>
                <th className="h-12 px-4 text-left font-medium w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{account.name}</td>
                  <td className="p-4 align-middle">{account.email}</td>
                  <td className="p-4 align-middle">{account.username}</td>
                  <td className="p-4 align-middle">{account.grade}</td>
                  <td className="p-4 align-middle">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        account.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {account.status === "active" ? "Active" : "Pending"}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-muted-foreground">{account.lastLogin}</td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => handleCopyCredentials(account)}
                      >
                        {copiedId === account.id ? (
                          <>
                            <Check className="mr-1 h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-4 w-4" />
                            Copy Login
                          </>
                        )}
                      </Button>
                      {account.status === "pending" && (
                        <Button size="sm" className="h-8" onClick={() => handleSendCredentials(account)}>
                          <Mail className="mr-1 h-4 w-4" />
                          Send
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Account Modal */}
      {isAddingStudent && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card border rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add Student Account</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsAddingStudent(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      id="firstName"
                      name="firstName"
                      value={newStudent.firstName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      id="lastName"
                      name="lastName"
                      value={newStudent.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={newStudent.email}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="grade" className="text-sm font-medium">
                  Grade
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={newStudent.grade}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Grade</option>
                  <option value="9th">9th Grade</option>
                  <option value="10th">10th Grade</option>
                  <option value="11th">11th Grade</option>
                  <option value="12th">12th Grade</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password (Optional)
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    name="password"
                    type="text"
                    value={newStudent.password}
                    onChange={handleInputChange}
                    placeholder="Leave blank to generate random password"
                    className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  If left blank, a secure random password will be generated.
                </p>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="sendEmail"
                  name="sendEmail"
                  checked={newStudent.sendEmail}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="sendEmail" className="text-sm">
                  Send login credentials to student's email
                </label>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingStudent(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStudent}>
                  <Save className="mr-2 h-4 w-4" />
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

