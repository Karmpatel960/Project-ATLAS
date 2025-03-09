import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { GraduationCap, Mail, Lock, User, ArrowRight, EyeOff, Eye } from 'lucide-react'

export default function AuthPage() {
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // Check if we should show login or signup based on the URL
  useEffect(() => {
    if (location.pathname === '/signup') {
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  }, [location.pathname])

  const toggleAuthMode = () => {
    if (isLogin) {
      navigate('/signup')
    } else {
      navigate('/login')
    }
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    navigate('/forgot-password')
  }

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login clicked')
    // After successful login, redirect to dashboard
    navigate('/dashboard')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement login/signup logic here
    console.log('Form submitted')
    // After successful login/signup, redirect to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-4 md:px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">ATLAS</span>
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-lg border p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">{isLogin ? 'Welcome back' : 'Create an account'}</h1>
              <p className="text-muted-foreground mt-2">
                {isLogin 
                  ? 'Enter your credentials to access your account' 
                  : 'Fill in the form below to create your account'}
              </p>
            </div>

            {/* Google Login Button */}
            <Button 
              variant="outline" 
              className="w-full mb-6 flex items-center justify-center gap-2 h-12"
              onClick={handleGoogleLogin}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              <span>Continue with Google</span>
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <input
                      id="name"
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="m@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                  </label>
                  {isLogin && (
                    <button 
                      type="button" 
                      onClick={handleForgotPassword}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-11">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={toggleAuthMode} 
                className="font-medium text-primary hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} ATLAS. All rights reserved.</p>
      </footer>
    </div>
  )
}
