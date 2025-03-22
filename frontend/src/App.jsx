import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AuthPage from "./pages/AuthPage"
import ForgotPasswordPage from "../src/components/Login/ForgotPassword.jsx"
import DashboardLayout from '../src/components/Dashboard/DashboardLayout.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import StudentsPage from './pages/dashboard/StudentsPage.jsx'
import ClassesPage from './pages/dashboard/ClassesPage.jsx'
import SchedulePage from './pages/dashboard/SchedulePage.jsx'
import SettingsPage from './pages/dashboard/SettingsPage.jsx'
import IntegrationHubPage from './pages/dashboard/IntegrationPage.jsx'
import './index.css'

import ManageStudentAccountsPage from "./pages/dashboard/ManageStudentAccountsPage.jsx"

import StudentDashboardLayout from "./components/student/StudentDashboard.jsx"
import StudentDashboardPage from "./pages/student/StudentDashboardPage.jsx"
import CoursesPage from "./pages/student/CoursesPage.jsx"
import AssignmentsPage from "./pages/student/AssignmentsPage.jsx"
import GradesPage from "./pages/student/GradesPage.jsx"
import ProfilePage from "./pages/student/ProfilePage.jsx"
import StudentSettingsPage from "./pages/student/SettingsPage.jsx"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/dashboard/students" element={<DashboardLayout><StudentsPage /></DashboardLayout>} />
        <Route path="/dashboard/classes" element={<DashboardLayout><ClassesPage /></DashboardLayout>} />
        <Route
          path="/dashboard/schedule"
          element={
            <DashboardLayout>
              <SchedulePage />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/integrations"
          element={
            <DashboardLayout>
              <IntegrationHubPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/student-accounts"
          element={
            <DashboardLayout>
              <ManageStudentAccountsPage />
            </DashboardLayout>
          }
        />

        {/* Student Dashboard Routes */}
        <Route
          path="/student"
          element={
            <StudentDashboardLayout>
              <StudentDashboardPage />
            </StudentDashboardLayout>
          }
        />
        <Route
          path="/student/courses"
          element={
            <StudentDashboardLayout>
              <CoursesPage />
            </StudentDashboardLayout>
          }
        />
        <Route
          path="/student/assignments"
          element={
            <StudentDashboardLayout>
              <AssignmentsPage />
            </StudentDashboardLayout>
          }
        />
        <Route
          path="/student/schedule"
          element={
            <StudentDashboardLayout>
              <SchedulePage />
            </StudentDashboardLayout>
          }
        />
        <Route
          path="/student/grades"
          element={
            <StudentDashboardLayout>
              <GradesPage />
            </StudentDashboardLayout>
          }
        />
        <Route
          path="/student/profile"
          element={
            <StudentDashboardLayout>
              <ProfilePage />
            </StudentDashboardLayout>
          }
        />
        <Route
          path="/student/settings"
          element={
            <StudentDashboardLayout>
              <StudentSettingsPage />
            </StudentDashboardLayout>
          }
        />
      </Routes>
    </div>
  )
}

export default App