import { Button } from "./ui/Button"

export default function Cta() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Virtual Classroom?
            </h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of educators who are creating engaging learning experiences with ATLAS.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" variant="secondary" className="px-8">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/60">No credit card required. 14-day free trial.</p>
        </div>
      </div>
    </section>
  )
}



