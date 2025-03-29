export default function Testimonials() {
    const testimonials = [
      {
        quote:
          "ATLAS has transformed how we deliver online education. The integration with Google Classroom saves us hours of administrative work each week.",
        author: "Sarah Johnson",
        role: "High School Principal",
        avatar: "https://placehold.co/80x80",
      },
      {
        quote:
          "The video quality and interactive tools are far superior to what we were using before. My students are more engaged and learning outcomes have improved significantly.",
        author: "Michael Chen",
        role: "University Professor",
        avatar: "https://placehold.co/80x80",
      },
      {
        quote:
          "Being able to seamlessly switch between Microsoft Teams and the virtual classroom has made our hybrid learning model so much more effective.",
        author: "Emily Rodriguez",
        role: "Elementary Teacher",
        avatar: "https://placehold.co/80x80",
      },
    ]
  
    return (
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Educators Worldwide</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what teachers and educational institutions are saying about our platform.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col items-center space-y-4 rounded-xl bg-card p-6 shadow-sm">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={`Avatar of ${testimonial.author}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  