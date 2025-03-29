"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Header.css"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/atlas-logo.svg" alt="ATLAS Logo" className="logo-image" />
          ATLAS
        </Link>
        <nav className="nav">
          <Link to="/#features" className="nav-link">
            Features
          </Link>
          <Link to="/#integrations" className="nav-link">
            Integrations
          </Link>
          <Link to="/#testimonials" className="nav-link">
            Testimonials
          </Link>
          <Link to="/#pricing" className="nav-link">
            Pricing
          </Link>
        </nav>
        <button className="cta-button">Start Free Trial</button>
      </div>
    </header>
  )
}

