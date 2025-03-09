import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AuthPage from "./pages/AuthPage"
import ForgotPasswordPage from "../src/components/Login/ForgotPassword.jsx"
import DashboardLayout from '../src/components/Dashboard/DashboardLayout.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import StudentsPage from './pages/dashboard/StudentsPage.jsx'
import ClassesPage from './pages/dashboard/ClassesPage.jsx'
import './index.css'

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
      </Routes>
    </div>
  )
}

export default App