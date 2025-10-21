"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, CheckCircle, Star, Users, Zap, Shield, Phone, Mail, MapPin, Clock, Menu, X } from "lucide-react"

export default function MobileLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#1A73E8] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-lg font-bold text-[#37322F]">GetLead.Store</span>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <nav className="px-4 py-4 space-y-3">
              <Link href="/pricing" className="block text-[#605A57] hover:text-[#37322F] py-2">
                Pricing
              </Link>
              <Link href="/signin" className="block text-[#605A57] hover:text-[#37322F] py-2">
                Sign In
              </Link>
              <Link href="/signup">
                <Button className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="px-4 py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Generate High-Quality Leads for Your Service Business
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Select your niche, service area, and daily volume — we&apos;ll deliver verified customers straight to your dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-[#1A73E8] hover:bg-[#1557B0] text-white px-8 py-4">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-300 text-gray-700 px-8 py-4">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Grid */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#37322F] mb-4">
              Why Choose GetLead.Store
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide real, qualified leads that convert into paying customers for your service business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#1A73E8] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">Real Leads, Not Clicks</h3>
                <p className="text-[#605A57] text-sm">
                  We qualify every request and send you real customers ready to buy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">State-Wide Coverage</h3>
                <p className="text-[#605A57] text-sm">
                  Expand your business across multiple cities without running ads yourself.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">Instant Notifications</h3>
                <p className="text-[#605A57] text-sm">
                  Get SMS, email, or Telegram alerts the moment a new lead arrives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Mobile Stack */}
      <section className="px-4 py-12 bg-[#F7F5F3]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#37322F] mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#1A73E8] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">Register & Choose Your Niche</h3>
                <p className="text-[#605A57]">Select your service type and target area</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#1A73E8] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">We Launch Targeted Ads for You</h3>
                <p className="text-[#605A57]">Our system runs optimized campaigns in your area</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#1A73E8] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#37322F] mb-2">You Receive Verified Leads</h3>
                <p className="text-[#605A57]">Get real customers delivered to your dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Mobile Cards */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#37322F] mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-[#605A57] mb-4 italic">
                  &quot;We grew from 5 to 40 locksmith jobs per week — and stopped worrying about Google Ads.&quot;
                </p>
                <div>
                  <p className="font-semibold text-[#37322F]">James L.</p>
                  <p className="text-sm text-[#605A57]">Denver Locksmith Pro</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-[#605A57] mb-4 italic">
                  &quot;Finally a system that sends real customers, not random calls.&quot;
                </p>
                <div>
                  <p className="font-semibold text-[#37322F]">Alex R.</p>
                  <p className="text-sm text-[#605A57]">California Garage Experts</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing - Mobile Optimized */}
      <section className="px-4 py-12 bg-[#F7F5F3]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#37322F] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600">
              Choose the plan that fits your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-bold text-[#37322F]">Starter</CardTitle>
                <div className="text-3xl font-bold text-[#1A73E8] mb-2">$200</div>
                <CardDescription className="text-[#605A57]">$20 per lead</CardDescription>
                <p className="text-sm text-[#605A57] mt-2">Perfect for new businesses</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-[#605A57] text-sm">Up to 10 leads/day</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-[#605A57] text-sm">SMS notifications</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-[#605A57] text-sm">Basic analytics</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full bg-white border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#1A73E8] shadow-xl rounded-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#1A73E8] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-bold text-[#37322F]">Growth</CardTitle>
                <div className="text-3xl font-bold text-[#1A73E8] mb-2">$200</div>
                <CardDescription className="text-[#605A57]">$10 per lead</CardDescription>
                <p className="text-sm text-[#605A57] mt-2">Scale your operations</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-[#605A57] text-sm">Up to 50 leads/day</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-[#605A57] text-sm">All notifications</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-[#605A57] text-sm">Advanced analytics</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-bold text-[#37322F]">Pro</CardTitle>
                <div className="text-3xl font-bold text-[#1A73E8] mb-2">$200</div>
                <CardDescription className="text-[#605A57]">Custom pricing</CardDescription>
                <p className="text-sm text-[#605A57] mt-2">Enterprise solution</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-[#605A57] text-sm">Unlimited leads</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-[#605A57] text-sm">Dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-[#605A57] text-sm">Custom integrations</span>
                  </li>
                </ul>
                <Button className="w-full bg-white border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ - Mobile Accordion */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#37322F] mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-4">
              <AccordionTrigger className="text-left">
                What is included in the activation fee?
              </AccordionTrigger>
              <AccordionContent>
                The activation covers your onboarding and campaign setup. This includes setting up your targeted ads, configuring your lead delivery preferences, and ensuring everything is working properly before you start receiving leads.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-4">
              <AccordionTrigger className="text-left">
                How are leads charged?
              </AccordionTrigger>
              <AccordionContent>
                Each lead is billed automatically through Stripe when delivered. You only pay for leads that actually come through our system, ensuring you get value for every dollar spent.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-4">
              <AccordionTrigger className="text-left">
                Can I pause my account?
              </AccordionTrigger>
              <AccordionContent>
                Yes, you can pause lead delivery any time from your dashboard. Your account will remain active, but you won&apos;t receive new leads until you resume the service.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 bg-[#1A73E8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of service businesses already using GetLead.Store to grow their customer base.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-white text-[#1A73E8] hover:bg-gray-100 px-8 py-4">
                Start for Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#1A73E8] px-8 py-4">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-[#37322F] text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#1A73E8] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-lg font-bold">GetLead.Store</span>
              </div>
              <p className="text-gray-400 text-sm">
                Generate high-quality leads for your service business.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/integrations" className="hover:text-white">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 GetLead.Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
