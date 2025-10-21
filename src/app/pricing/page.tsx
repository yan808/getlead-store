"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Shield, Zap, Users, Star, Loader2 } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$200",
    perLead: "$20 per lead",
    description: "Perfect for new businesses",
    features: [
      "Up to 10 leads/day",
      "SMS notifications",
      "Basic analytics",
      "Email support",
      "Standard lead quality"
    ],
    popular: false
  },
  {
    name: "Growth",
    price: "$200",
    perLead: "$10 per lead",
    description: "Scale your operations",
    features: [
      "Up to 50 leads/day",
      "SMS + Email notifications",
      "Advanced analytics",
      "Priority support",
      "Premium lead quality",
      "Team management (up to 5 users)"
    ],
    popular: true
  },
  {
    name: "Pro",
    price: "$200",
    perLead: "Custom pricing",
    description: "Enterprise-grade solution",
    features: [
      "Unlimited leads",
      "All notification channels",
      "Custom analytics",
      "Dedicated account manager",
      "Highest lead quality",
      "Unlimited team members",
      "API access",
      "Custom integrations"
    ],
    popular: false
  }
]

const testimonials = [
  {
    name: "James L.",
    business: "Denver Locksmith Pro",
    rating: 5,
    text: "We grew from 5 to 40 locksmith jobs per week — and stopped worrying about Google Ads."
  },
  {
    name: "Alex R.",
    business: "California Garage Experts",
    rating: 5,
    text: "Finally a system that sends real customers, not random calls."
  },
  {
    name: "Sarah M.",
    business: "Miami HVAC Solutions",
    rating: 5,
    text: "The quality of leads is outstanding. Every lead is a real customer ready to buy."
  }
]

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleGetStarted = async (planName: string) => {
    if (planName === "Pro") {
      // For Pro plan, show contact form or redirect to contact
      window.location.href = "mailto:sales@getlead.store?subject=Pro Plan Inquiry"
      return
    }

    setLoadingPlan(planName)
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: planName.toLowerCase() }),
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No checkout URL received')
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Header */}
      <header className="bg-white border-b border-[#E0DEDB] px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#1A73E8] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold text-[#37322F]">GetLead.Store</span>
          </Link>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/signin">
              <Button variant="outline" size="sm" className="border-[#E0DEDB] text-[#605A57] text-xs sm:text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs sm:text-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back to home */}
        <Link href="/" className="inline-flex items-center text-[#605A57] hover:text-[#37322F] transition-colors mb-6 sm:mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to GetLead.Store
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#37322F] mb-4 sm:mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-[#605A57] max-w-2xl mx-auto mb-6 sm:mb-8">
            Choose the plan that fits your business. All plans include our core lead generation service.
          </p>
          <div className="inline-flex items-center bg-blue-50 text-[#1A73E8] px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="font-medium">Activation required to start receiving leads</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`border-0 shadow-lg rounded-xl relative ${
                plan.popular ? "border-2 border-[#1A73E8] shadow-xl" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#1A73E8] text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-[#37322F]">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-[#1A73E8] mb-2">{plan.price}</div>
                <CardDescription className="text-[#605A57]">{plan.perLead}</CardDescription>
                <p className="text-sm text-[#605A57] mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-[#605A57]">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full h-12 ${
                    plan.popular 
                      ? "bg-[#1A73E8] hover:bg-[#1557B0] text-white" 
                      : "bg-white border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white"
                  }`}
                  onClick={() => handleGetStarted(plan.name)}
                  disabled={loadingPlan === plan.name}
                >
                  {loadingPlan === plan.name ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    plan.name === "Pro" ? "Contact Sales" : "Get Started"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#37322F] text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">
                  What is included in the activation fee?
                </h3>
                <p className="text-[#605A57]">
                  The activation covers your onboarding and campaign setup. This includes setting up your targeted ads, configuring your lead delivery preferences, and ensuring everything is working properly before you start receiving leads.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">
                  How are leads charged?
                </h3>
                <p className="text-[#605A57]">
                  Each lead is billed automatically through Stripe when delivered. You only pay for leads that actually come through our system, ensuring you get value for every dollar spent.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">
                  Can I pause my account?
                </h3>
                <p className="text-[#605A57]">
                  Yes, you can pause lead delivery any time from your dashboard. Your account will remain active, but you won&apos;t receive new leads until you resume the service.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">
                  What types of service businesses do you support?
                </h3>
                <p className="text-[#605A57]">
                  We support locksmiths, towing services, cleaning companies, garage door repair, HVAC services, plumbing, and many other service-based businesses. Contact us if you&apos;re unsure about your specific niche.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">
                  How quickly will I start receiving leads?
                </h3>
                <p className="text-[#605A57]">
                  After activation, you&apos;ll typically start receiving leads within 24-48 hours as we set up and launch your targeted campaigns.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">
                  What if I&apos;m not satisfied?
                </h3>
                <p className="text-[#605A57]">
                  We offer a 30-day money-back guarantee. If you&apos;re not satisfied with the quality of leads, we&apos;ll refund your activation fee.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#37322F] text-center mb-12">
            What Our Customers Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-[#605A57] mb-4 italic">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-[#37322F]">{testimonial.name}</p>
                    <p className="text-sm text-[#605A57]">{testimonial.business}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-[#37322F] mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-[#605A57] mb-8 max-w-2xl mx-auto">
            Join thousands of service businesses already using GetLead.Store to grow their customer base.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-[#1A73E8] hover:bg-[#1557B0] text-white px-8 py-4">
                Start for Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-[#E0DEDB] text-[#605A57] px-8 py-4">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
