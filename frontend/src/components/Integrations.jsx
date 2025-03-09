import { Button } from "./ui/Button"
import { Check } from "lucide-react"
import classroom from "../assets/classroom.png"

export default function Integrations() {
  const integrations = [
    {
      name: "Google Classroom",
      logo: "https://github.com/Karmpatel960/Project-ATLAS/tree/feature/web/frontend/src/assets/classroom.png",
      description: "Sync your Google Classroom courses, assignments, and student roster with our platform.",
      features: ["Roster sync", "Assignment integration", "Grade passback", "Single sign-on"],
      buttonText: "Connect Google Classroom",
    },
    {
      name: "Google Meet",
      logo: "https://placehold.co/200x80",
      description: "Launch Google Meet sessions directly from our platform with enhanced teaching tools.",
      features: ["One-click launch", "Recording integration", "Attendance tracking", "Enhanced controls"],
      buttonText: "Connect Google Meet",
    },
    {
      name: "Microsoft Teams",
      logo: "https://placehold.co/200x80",
      description: "Integrate with Microsoft Teams for seamless communication and collaboration.",
      features: ["Teams channel integration", "File sharing", "Calendar sync", "Meeting scheduling"],
      buttonText: "Connect Microsoft Teams",
    },
  ]

  return (
    <section id="integrations" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Integrations</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Connect with Your Favorite Tools</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Seamlessly integrate with the platforms you already use to enhance your virtual classroom experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 mt-12">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-8 items-center rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="flex-shrink-0 w-full md:w-1/4 flex justify-center">
                <div className="relative h-20 w-40">
                  <img
                    src={integration.logo || "/placeholder.svg"}
                    alt={`${integration.name} logo`}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold">{integration.name}</h3>
                <p className="text-muted-foreground">{integration.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {integration.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-4">{integration.buttonText}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



