"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, Wrench, Car, Sparkles, Thermometer, Settings, Droplets } from "lucide-react"

const niches = [
  { id: "locksmith", name: "Locksmith", icon: Wrench, description: "Emergency locksmith services" },
  { id: "towing", name: "Towing", icon: Car, description: "Vehicle towing and recovery" },
  { id: "cleaning", name: "Cleaning", icon: Sparkles, description: "Residential and commercial cleaning" },
  { id: "garage-doors", name: "Garage Doors", icon: Settings, description: "Garage door repair and installation" },
  { id: "hvac", name: "HVAC", icon: Thermometer, description: "Heating, ventilation, and air conditioning" },
  { id: "plumbing", name: "Plumbing", icon: Droplets, description: "Plumbing repair and installation" },
]

const serviceAreas = [
  { id: "city", name: "Single City", description: "Focus on one city" },
  { id: "metro", name: "Metro Area", description: "Cover the entire metropolitan area" },
  { id: "state", name: "State-Wide", description: "Cover the entire state" },
]

const leadVolumes = [
  { id: "low", name: "1-5 leads/day", description: "Perfect for small businesses" },
  { id: "medium", name: "6-20 leads/day", description: "Ideal for growing businesses" },
  { id: "high", name: "20+ leads/day", description: "For established businesses" },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    niche: "",
    serviceArea: "",
    leadVolume: "",
    city: "",
    state: "",
  })

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // TODO: Save onboarding data and redirect to Stripe checkout
      console.log("Onboarding complete:", formData)
      window.location.href = "/dashboard"
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.niche !== ""
      case 2:
        return formData.serviceArea !== "" && formData.city !== "" && formData.state !== ""
      case 3:
        return formData.leadVolume !== ""
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Back to home */}
        <Link href="/" className="inline-flex items-center text-[#605A57] hover:text-[#37322F] transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to GetLead.Store
        </Link>

        <Card className="border-0 shadow-lg rounded-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-[#1A73E8] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-[#37322F]">
              Let&apos;s set up your lead generation
            </CardTitle>
            <CardDescription className="text-[#605A57]">
              Tell us about your business so we can deliver the right leads
            </CardDescription>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber
                          ? "bg-[#1A73E8] text-white"
                          : "bg-[#E0DEDB] text-[#605A57]"
                      }`}
                    >
                      {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div
                        className={`w-12 h-0.5 ${
                          step > stepNumber ? "bg-[#1A73E8]" : "bg-[#E0DEDB]"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Step 1: Select Niche */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-[#37322F] mb-2">What type of service do you provide?</h3>
                  <p className="text-[#605A57]">Select your primary service niche</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {niches.map((niche) => {
                    const Icon = niche.icon
                    return (
                      <button
                        key={niche.id}
                        onClick={() => setFormData({ ...formData, niche: niche.id })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.niche === niche.id
                            ? "border-[#1A73E8] bg-blue-50"
                            : "border-[#E0DEDB] hover:border-[#1A73E8] hover:bg-blue-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-6 w-6 text-[#1A73E8]" />
                          <div className="text-left">
                            <div className="font-medium text-[#37322F]">{niche.name}</div>
                            <div className="text-sm text-[#605A57]">{niche.description}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Service Area */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-[#37322F] mb-2">Where do you want to receive leads?</h3>
                  <p className="text-[#605A57]">Select your service area coverage</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {serviceAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setFormData({ ...formData, serviceArea: area.id })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.serviceArea === area.id
                          ? "border-[#1A73E8] bg-blue-50"
                          : "border-[#E0DEDB] hover:border-[#1A73E8] hover:bg-blue-50"
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-medium text-[#37322F]">{area.name}</div>
                        <div className="text-sm text-[#605A57]">{area.description}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* City and State inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#37322F]">City</label>
                    <input
                      type="text"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E0DEDB] rounded-lg focus:border-[#1A73E8] focus:ring-[#1A73E8] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#37322F]">State</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E0DEDB] rounded-lg focus:border-[#1A73E8] focus:ring-[#1A73E8] focus:outline-none"
                    >
                      <option value="">Select state</option>
                      <option value="CA">California</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      <option value="NY">New York</option>
                      <option value="IL">Illinois</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="OH">Ohio</option>
                      <option value="GA">Georgia</option>
                      <option value="NC">North Carolina</option>
                      <option value="MI">Michigan</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Lead Volume */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-[#37322F] mb-2">How many leads do you need daily?</h3>
                  <p className="text-[#605A57]">Choose your preferred lead volume</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {leadVolumes.map((volume) => (
                    <button
                      key={volume.id}
                      onClick={() => setFormData({ ...formData, leadVolume: volume.id })}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        formData.leadVolume === volume.id
                          ? "border-[#1A73E8] bg-blue-50"
                          : "border-[#E0DEDB] hover:border-[#1A73E8] hover:bg-blue-50"
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold text-[#37322F] text-lg mb-2">{volume.name}</div>
                        <div className="text-sm text-[#605A57]">{volume.description}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#37322F] mb-2">Pricing Summary</h4>
                  <div className="text-sm text-[#605A57] space-y-1">
                    <div>• $200 activation fee (one-time)</div>
                    <div>• $20 per lead (Starter plan)</div>
                    <div>• $10 per lead (Growth plan - 20+ leads/day)</div>
                    <div>• Custom pricing (Pro plan - 50+ leads/day)</div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={handleBack}
                variant="outline"
                className="border-[#E0DEDB] text-[#605A57] hover:bg-[#F7F5F3]"
                disabled={step === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-[#1A73E8] hover:bg-[#1557B0] text-white"
              >
                {step === 3 ? "Complete Setup" : "Next"}
                {step < 3 && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
