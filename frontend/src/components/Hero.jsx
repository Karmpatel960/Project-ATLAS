import { Button } from "./ui/Button"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                ATLAS: Virtual Classroom for Modern Education
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Connect, teach, and learn from anywhere with our integrated virtual classroom platform. Seamlessly works
                with Google Classroom, Meet, and Microsoft Teams.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <span className="font-medium">✓</span>
                <span className="text-muted-foreground">No credit card required</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">✓</span>
                <span className="text-muted-foreground">14-day free trial</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl shadow-2xl">
              <img
                src="../"
                alt="Virtual classroom interface showing students and teacher in a video call"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-black/0 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

