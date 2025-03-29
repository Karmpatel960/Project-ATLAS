import { Check } from "lucide-react"
import { Button } from "./ui/Button"

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$9",
      description: "Perfect for individual teachers and small classes",
      features: [
        "Up to 25 students per class",
        "HD video conferencing",
        "Basic whiteboard tools",
        "Google Classroom integration",
        "24/7 email support",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      description: "Ideal for schools and educational institutions",
      features: [
        "Up to 100 students per class",
        "Advanced whiteboard and collaboration",
        "Breakout rooms",
        "All integrations (Google & Microsoft)",
        "Recording and analytics",
        "Priority support",
      ],
      buttonText: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large institutions with specific requirements",
      features: [
        "Unlimited students",
        "Custom integrations",
        "Advanced security features",
        "Dedicated account manager",
        "Custom branding",
        "24/7 phone and email support",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose the Perfect Plan for Your Needs</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Flexible pricing options designed to fit educational institutions of all sizes.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-xl border p-6 shadow-sm bg-card ${
                plan.popular ? "border-primary ring-1 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full" variant={plan.popular ? "default" : "outline"}>
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


