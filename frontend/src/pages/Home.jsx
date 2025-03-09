import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Integrations from "../components/Integrations"
import Pricing from "../components/Pricing"
import Testimonials from "../components/Testimonials"
import Cta from "../components/Cta"
import Footer from "../components/Footer"
import { ThemeProvider } from "../components/ThemeProvider"

function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Features />
          <Integrations />
          <Pricing />
          <Testimonials />
          <Cta />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Home

