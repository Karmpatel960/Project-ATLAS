import { useState } from 'react'
import { Search, Plus, Filter, MoreHorizontal, Mail, Download, Trash2, X, Check } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function StudentsPage() {
  const [isAddingStudent, setIsAddingStudent] = useState(false)
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    grade: '',
    status: 'active'
  })
  const [students, setStudents] = useState([
    { id: 1, name: 'Emma Thompson', email: 'emma.t@example.com', grade: '10th', status: 'active', lastActive: '2 hours ago' },
    { id: 2, name: 'James Wilson', email: 'james.w@example.com', grade: '11th', status: 'active', lastActive: '1 day ago' },
    { id: 3, name: 'Olivia Martinez', email: 'olivia.m@example.com', grade: '9th', status: 'inactive', lastActive: '5 days ago' },
    { id: 4, name: 'William Johnson', email: 'william.j@example.com', grade: '12th', status: 'active', lastActive: '3 hours ago' },
    { id: 5, name: 'Sophia Brown', email: 'sophia.b@example.com', grade: '10th', status: 'active', lastActive: '1 hour ago' },
    { id: 6, name: 'Benjamin Davis', email: 'benjamin.d@example.com', grade: '11th', status: 'inactive', lastActive: '1 week ago' },
    { id: 7, name: 'Mia Rodriguez', email: 'mia.r@example.com', grade: '9th', status: 'active', lastActive: '4 hours ago' },
    { id: 8, name: 'Ethan Smith', email: 'ethan.s@example.com', grade: '12th', status: 'active', lastActive: '2 days ago' }
  ])

  const handleAddStudent = () => {
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.email) {
      return // Validation would go here
    }
    
    const newStudentObj = {
      id: students.length + 1,
      name: `${newStudent.firstName} ${newStudent.lastName}`,
      email: newStudent.email,
      grade: newStudent.grade,
      status: newStudent.status,
      lastActive: 'Just now'
    }
    
    setStudents([...students, newStudentObj])
    setNewStudent({
      firstName: '',
      lastName: '',
      email: '',
      grade: '',
      status: 'active'
    })
    setIsAddingStudent(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewStudent({
      ...newStudent,
      [name]: value
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Students</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search students..."
              className="w-full sm:w-[250px] rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsAddingStudent(true)} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Student Table */}
      <div className="rounded-lg border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b">
              <tr>
                <th className="h-12 px-4 text-left font-medium">Name</th>
                <th className="h-12 px-4 text-left font-medium">Email</th>
                <th className="h-12 px-4 text-left font-medium">Grade</th>
                <th className="h-12 px-4 text-left font-medium">Status</th>
                <th className="h-12 px-4 text-left font-medium">Last Active</th>
                <th className="h-12 px-4 text-left font-medium w-[70px]"></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{student.name}</td>
                  <td className="p-4 align-middle">{student.email}</td>
                  <td className="p-4 align-middle">{student.grade}</td>
                  <td className="p-4 align-middle">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      student.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {student.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-muted-foreground">{student.lastActive}</td>
                  <td className="p-4 align-middle">
                    <div className="relative">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddingStudent && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card border rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Student</h2>
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
                  <input
                    id="firstName"
                    name="firstName"
                    value={newStudent.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={newStudent.lastName}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
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
                <label className="text-sm font-medium">Status</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={newStudent.status === 'active'}
                      onChange={handleInputChange}
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <span>Active</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={newStudent.status === 'inactive'}
                      onChange={handleInputChange}
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingStudent(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStudent}>
                  <Check className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
