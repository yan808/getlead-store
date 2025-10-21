"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Users, TrendingUp, DollarSign } from "lucide-react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and then redirect to dashboard
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-[#1A73E8] rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <p className="text-[#605A57]">Processing your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-0 shadow-lg rounded-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-[#37322F]">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-xl text-[#605A57]">
              Welcome to GetLead.Store! Your account has been activated.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#37322F] mb-2">
                What&apos;s Next?
              </h3>
              <ul className="space-y-2 text-[#605A57]">
                <li>✅ Your account is now active</li>
                <li>✅ You can start receiving leads immediately</li>
                <li>✅ Access your dashboard to manage leads</li>
                <li>✅ Set up your team and preferences</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-[#E0DEDB]">
                <Users className="h-8 w-8 text-[#1A73E8] mx-auto mb-2" />
                <h4 className="font-semibold text-[#37322F]">Manage Leads</h4>
                <p className="text-sm text-[#605A57]">View and manage your incoming leads</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg border border-[#E0DEDB]">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-[#37322F]">Analytics</h4>
                <p className="text-sm text-[#605A57]">Track your lead performance</p>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg border border-[#E0DEDB]">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-[#37322F]">Billing</h4>
                <p className="text-sm text-[#605A57]">Manage your subscription</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white px-8 py-3">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              
              <Link href="/dashboard?tab=leads">
                <Button variant="outline" className="border-[#E0DEDB] text-[#605A57] px-8 py-3">
                  View Leads
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
