import "./Pricing.css"

const plans = [
  {
    name: "Basic",
    price: "$5",
    period: "per student / month",
    features: ["Up to 100 students", "10GB storage per class", "Basic analytics", "Email support"],
  },
  {
    name: "Pro",
    price: "$10",
    period: "per student / month",
    features: [
      "Unlimited students",
      "100GB storage per class",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Contact us for pricing",
    features: [
      "All Pro features",
      "Dedicated account manager",
      "On-premise deployment option",
      "Custom integrations",
      "24/7 phone support",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <div className="pricing-content">
        <h2>Choose Your Plan</h2>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className="pricing-card">
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <p className="period">{plan.period}</p>
              <ul>
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className="pricing-button">
                {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

