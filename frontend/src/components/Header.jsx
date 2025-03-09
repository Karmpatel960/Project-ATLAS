"use client"

import { useState, useEffect } from "react"
import { Menu, X, GraduationCap } from "lucide-react"
import { Button } from "./ui/Button"
import { ThemeToggle } from "./ThemeToggle"
import { cn } from "../lib/utils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-2 px-4 md:px-6 mx-auto max-w-7xl rounded-full mt-4"
          : "bg-transparent py-4 px-4 md:px-6",
      )}
    >
      <div className="flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">ATLAS</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-primary">
            Features
          </a>
          <a href="#integrations" className="text-sm font-medium hover:text-primary">
            Integrations
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </a>
          <a href="#testimonials" className="text-sm font-medium hover:text-primary">
            Testimonials
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Log in
          </Button>
          <Button size="sm">Sign up</Button>
        </div>

        <div className="flex items-center md:hidden gap-2">
          <ThemeToggle />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background/95 backdrop-blur-sm mt-2 rounded-lg">
          <nav className="flex flex-col gap-4">
            <a href="#features" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              Features
            </a>
            <a
              href="#integrations"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Integrations
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="outline" size="sm" className="w-full">
                Log in
              </Button>
              <Button size="sm" className="w-full">
                Sign up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

