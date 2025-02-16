import "./Hero.css"

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Transform Your Virtual Classroom Experience</h1>
          <p>
            ATLAS seamlessly integrates with Google Workspace to provide a powerful, intuitive virtual classroom
            solution.
          </p>
          <button className="cta-button">Start Your Free Trial</button>
        </div>
        <div className="hero-image">
          <img src="/virtual-classroom.svg" alt="Virtual Classroom" />
        </div>
      </div>
      <div className="integration-logos">
        <img src="/google-classroom-logo.svg" alt="Google Classroom" />
        <img src="/google-calendar-logo.svg" alt="Google Calendar" />
        <img src="/google-meet-logo.svg" alt="Google Meet" />
      </div>
    </section>
  )
}

