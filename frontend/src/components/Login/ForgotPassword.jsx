"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/Button"
import { GraduationCap, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { useToast } from "../ui/ToastContext"
import { FullPageLoader } from "../ui/Loader"
import axios from "axios"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { addToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      addToast("Please enter your email address", "error")
      return
    }

    setIsLoading(true)

    try {
      // Replace with your actual API endpoint
      await axios.post(
        "https://8000-idx-backend-1743257290953.cluster-7ubberrabzh4qqy2g4z7wgxuw2.cloudworkstations.dev/api/forgot-password",
        { email },
      )
      setIsSubmitted(true)
      addToast("Password reset link has been sent to your email", "success")
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send reset link. Please try again."
      addToast(errorMessage, "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading && <FullPageLoader />}

      <header className="w-full py-4 px-4 md:px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">ATLAS</span>
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-lg border p-8">
            <button
              onClick={handleBackToLogin}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6"
              disabled={isLoading}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold">Reset your password</h1>
                  <p className="text-muted-foreground mt-2">
                    Enter your email address and we'll send you a link to reset your password
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="m@example.com"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11" disabled={isLoading}>
                    Send Reset Link
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Check your email</h2>
                <p className="mt-2 text-muted-foreground">
                  We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={handleSubmit}
                    className="font-medium text-primary hover:underline"
                    disabled={isLoading}
                  >
                    try again
                  </button>
                </p>
                <Button onClick={handleBackToLogin} variant="outline" className="mt-6" disabled={isLoading}>
                  Back to login
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} ATLAS. All rights reserved.</p>
      </footer>
    </div>
  )
}

