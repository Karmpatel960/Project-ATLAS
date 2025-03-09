// DashboardLayout.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GraduationCap, LayoutDashboard, Users, BookOpen, Calendar, Settings, Bell, LogOut, Menu, X, ChevronDown, Search } from 'lucide-react'
import { ThemeToggle } from '../ThemeToggle'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Students', href: '/dashboard/students', icon: Users },
    { name: 'Classes', href: '/dashboard/classes', icon: BookOpen },
    { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar backdrop */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-card transition-transform duration-300 ease-in-out lg:relative lg:z-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            {isSidebarOpen && <span className="text-xl font-bold">ATLAS</span>}
          </Link>
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Sidebar content */}
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5" />
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            {isSidebarOpen ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Teacher</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium">JD</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-6 w-6" />
          </button>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <ThemeToggle />
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
            </button>

            {/* Profile dropdown (mobile only) */}
            <div className="relative lg:hidden">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 text-sm"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium">JD</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-card shadow-lg border">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-muted">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-muted">Settings</a>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

