import "./Integrations.css"

const integrations = [
  {
    name: "Google Classroom",
    logo: "/google-classroom-logo.svg",
    description: "Seamlessly sync your courses, assignments, and grades with Google Classroom.",
  },
  {
    name: "Google Calendar",
    logo: "/google-calendar-logo.svg",
    description: "Automatically schedule classes and send reminders to students and teachers.",
  },
  {
    name: "Google Meet",
    logo: "/google-meet-logo.svg",
    description:
      "Host high-quality video lessons with all the features of Google Meet, integrated directly into ATLAS.",
  },
]

export default function Integrations() {
  return (
    <section id="integrations" className="integrations">
      <div className="integrations-content">
        <h2>Seamless Google Workspace Integration</h2>
        <div className="integrations-grid">
          {integrations.map((integration, index) => (
            <div key={index} className="integration-card">
              <img src={integration.logo || "/placeholder.svg"} alt={integration.name} className="integration-logo" />
              <h3>{integration.name}</h3>
              <p>{integration.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

