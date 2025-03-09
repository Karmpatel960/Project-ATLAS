import { useState } from 'react'
import { Search, Plus, Filter, MoreHorizontal, Users, Calendar, Clock, X, Check, BookOpen } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function ClassesPage() {
  const [isAddingClass, setIsAddingClass] = useState(false)
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    schedule: '',
    time: '',
    maxStudents: ''
  })
  const [classes, setClasses] = useState([
    { 
      id: 1, 
      name: 'Mathematics 101', 
      description: 'Fundamentals of algebra and geometry',
      students: 28, 
      schedule: 'Mon, Wed, Fri', 
      time: '10:00 AM - 11:30 AM',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Physics Fundamentals', 
      description: 'Introduction to physics concepts',
      students: 22, 
      schedule: 'Tue, Thu', 
      time: '1:00 PM - 2:30 PM',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'English Literature', 
      description: 'Classic and contemporary literature analysis',
      students: 18, 
      schedule: 'Mon, Wed', 
      time: '3:00 PM - 4:30 PM',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Chemistry 101', 
      description: 'Introduction to chemical principles',
      students: 24, 
      schedule: 'Tue, Thu', 
      time: '9:00 AM - 10:30 AM',
      status: 'inactive'
    },
    { 
      id: 5, 
      name: 'World History', 
      description: 'Survey of major historical events',
      students: 26, 
      schedule: 'Mon, Wed, Fri', 
      time: '11:00 AM - 12:30 PM',
      status: 'active'
    },
  ])

  const handleAddClass = () => {
    if (!newClass.name || !newClass.schedule || !newClass.time) {
      return // Validation would go here
    }
    
    const newClassObj = {
      id: classes.length + 1,
      name: newClass.name,
      description: newClass.description,
      students: 0,
      schedule: newClass.schedule,
      time: newClass.time,
      status: 'active'
    }
    
    setClasses([...classes, newClassObj])
    setNewClass({
      name: '',
      description: '',
      schedule: '',
      time: '',
      maxStudents: ''
    })
    setIsAddingClass(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewClass({
      ...newClass,
      [name]: value
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Classes</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search classes..."
              className="w-full sm:w-[250px] rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsAddingClass(true)} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Create Class
          </Button>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <div key={cls.id} className="rounded-lg border bg-card overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{cls.name}</h3>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  cls.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {cls.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{cls.description}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{cls.students} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{cls.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{cls.time}</span>
              </div>
              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {isAddingClass && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card border rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Create New Class</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsAddingClass(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Class Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={newClass.name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g., Biology 101"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newClass.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Brief description of the class"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="schedule" className="text-sm font-medium">
                  Schedule
                </label>
                <input
                  id="schedule"
                  name="schedule"
                  value={newClass.schedule}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g., Mon, Wed, Fri"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">
                  Time
                </label>
                <input
                  id="time"
                  name="time"
                  value={newClass.time}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g., 10:00 AM - 11:30 AM"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="maxStudents" className="text-sm font-medium">
                  Maximum Students
                </label>
                <input
                  id="maxStudents"
                  name="maxStudents"
                  type="number"
                  value={newClass.maxStudents}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g., 30"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingClass(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddClass}>
                  <Check className="mr-2 h-4 w-4" />
                  Create Class
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
