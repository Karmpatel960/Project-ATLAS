import { Users, Video, FileText, Calendar, MessageSquare, BarChart } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Video className="h-10 w-10 text-primary" />,
      title: "HD Video Conferencing",
      description: "Crystal clear video and audio for up to 100 participants with no time limits.",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Interactive Whiteboard",
      description: "Collaborate in real-time with digital whiteboard tools and document sharing.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Breakout Rooms",
      description: "Create smaller group sessions for discussions and collaborative work.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Class Scheduling",
      description: "Easily schedule and manage recurring classes with calendar integration.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Chat & Discussion",
      description: "Built-in messaging for class discussions and private communications.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Attendance & Analytics",
      description: "Track student participation and engagement with detailed analytics.",
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything You Need for Virtual Learning
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools educators need to create engaging virtual classroom experiences.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm bg-card">
              <div className="p-2 rounded-full bg-primary/10">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

