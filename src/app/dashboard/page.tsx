"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Plus,
  Filter,
  Download,
  Settings,
  LogOut
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Lead {
  id: number
  name: string
  phone: string
  description: string
  address: string
  status: string
  price: number
  created_at: string
  city?: string
  state?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState("leads")
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    completedLeads: 0,
    totalRevenue: 0
  })
  const [isActivated, setIsActivated] = useState(false)

  useEffect(() => {
    fetchLeads()
    checkAuth()
    checkActivationStatus()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/signin')
    }
  }

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads')
      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads || [])
        
        // Calculate stats
        const totalLeads = data.leads?.length || 0
        const newLeads = data.leads?.filter((lead: Lead) => lead.status === 'new').length || 0
        const completedLeads = data.leads?.filter((lead: Lead) => lead.status === 'completed').length || 0
        const totalRevenue = data.leads?.reduce((sum: number, lead: Lead) => sum + lead.price, 0) || 0
        
        setStats({
          totalLeads,
          newLeads,
          completedLeads,
          totalRevenue
        })
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const checkActivationStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: org } = await supabase
          .from('organizations')
          .select('stripe_customer_id')
          .eq('owner_id', user.id)
          .single()
        
        setIsActivated(!!org?.stripe_customer_id)
      }
    } catch (error) {
      console.error('Error checking activation status:', error)
    }
  }

  const createTestLeads = async () => {
    try {
      const response = await fetch('/api/leads/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        await fetchLeads() // Refresh the leads
      }
    } catch (error) {
      console.error('Error creating test leads:', error)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-green-100 text-green-800"
      case "assigned":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-[#1A73E8] rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <p className="text-[#605A57]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Header */}
      <header className="bg-white border-b border-[#E0DEDB] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-[#1A73E8] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#37322F]">GetLead.Store</h1>
              <p className="text-sm text-[#605A57]">Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-[#E0DEDB] text-[#605A57]">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-[#E0DEDB] text-[#605A57]"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Mobile Navigation */}
        <div className="lg:hidden bg-white border-b border-[#E0DEDB] px-4 py-3">
          <div className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("leads")}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "leads"
                  ? "bg-[#1A73E8] text-white"
                  : "text-[#605A57] hover:bg-[#F7F5F3]"
              }`}
            >
              Leads
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "analytics"
                  ? "bg-[#1A73E8] text-white"
                  : "text-[#605A57] hover:bg-[#F7F5F3]"
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "team"
                  ? "bg-[#1A73E8] text-white"
                  : "text-[#605A57] hover:bg-[#F7F5F3]"
              }`}
            >
              Team
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "billing"
                  ? "bg-[#1A73E8] text-white"
                  : "text-[#605A57] hover:bg-[#F7F5F3]"
              }`}
            >
              Billing
            </button>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-[#E0DEDB] min-h-screen p-6">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "leads"
                  ? "bg-[#1A73E8] text-white"
                  : "text-[#605A57] hover:bg-[#F7F5F3]"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Leads</span>
            </button>
            
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "analytics"
                  ? "bg-[#1A73E8] text-white"
                  : "text-[#605A57] hover:bg-[#F7F5F3]"
              }`}
            >
              <TrendingUp className="h-5 w-5" />
              <span>Analytics</span>
            </button>
            
            <button
              onClick={() => setActiveTab("team")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "team"
                  ? "bg-[#1A73E8] text-white"
                  : "text-[#605A57] hover:bg-[#F7F5F3]"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Team</span>
            </button>
            
            <button
              onClick={() => setActiveTab("billing")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "billing"
                  ? "bg-[#1A73E8] text-white"
                  : "text-[#605A57] hover:bg-[#F7F5F3]"
              }`}
            >
              <DollarSign className="h-5 w-5" />
              <span>Billing</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Activation Banner */}
          {!isActivated && (
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#1A73E8] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">!</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#37322F]">Account Not Activated</h3>
                    <p className="text-[#605A57]">Complete your payment to start receiving leads</p>
                  </div>
                </div>
                <Link href="/pricing">
                  <Button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white">
                    Activate Now
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#605A57]">Total Leads</p>
                    <p className="text-2xl font-bold text-[#37322F]">{stats.totalLeads}</p>
                  </div>
                  <Users className="h-8 w-8 text-[#1A73E8]" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#605A57]">New Leads</p>
                    <p className="text-2xl font-bold text-[#37322F]">{stats.newLeads}</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#605A57]">Completed</p>
                    <p className="text-2xl font-bold text-[#37322F]">{stats.completedLeads}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#605A57]">Revenue</p>
                    <p className="text-2xl font-bold text-[#37322F]">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leads Table */}
          {activeTab === "leads" && (
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#37322F]">Recent Leads</CardTitle>
                    <CardDescription className="text-[#605A57]">
                      Manage your incoming leads
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-[#E0DEDB] text-[#605A57]">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#E0DEDB] text-[#605A57]">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-[#1A73E8] hover:bg-[#1557B0] text-white"
                      onClick={createTestLeads}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Test Leads
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E0DEDB]">
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#37322F]">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#37322F]">Phone</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#37322F]">Description</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#37322F]">Address</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#37322F]">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#37322F]">Price</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#37322F]">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-[#605A57]">
                            No leads yet. Click &quot;Add Test Leads&quot; to get started.
                          </td>
                        </tr>
                      ) : (
                        leads.map((lead) => (
                          <tr key={lead.id} className="border-b border-[#E0DEDB] hover:bg-[#F7F5F3]">
                            <td className="py-3 px-4">
                              <div className="font-medium text-[#37322F]">{lead.name}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center text-[#605A57]">
                                <Phone className="h-4 w-4 mr-2" />
                                {lead.phone}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-[#605A57] text-sm max-w-xs truncate">
                                {lead.description}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center text-[#605A57] text-sm">
                                <MapPin className="h-4 w-4 mr-2" />
                                {lead.address}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-medium text-[#37322F]">${lead.price}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-[#605A57] text-sm">
                                {formatDate(lead.created_at)}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                  {leads.length === 0 ? (
                    <div className="text-center py-8 text-[#605A57]">
                      No leads yet. Click &quot;Add Test Leads&quot; to get started.
                    </div>
                  ) : (
                    leads.map((lead) => (
                      <Card key={lead.id} className="border border-[#E0DEDB] rounded-lg">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-medium text-[#37322F]">{lead.name}</h3>
                              <p className="text-sm text-[#605A57]">{lead.phone}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                              {lead.status}
                            </span>
                          </div>
                          
                          <p className="text-sm text-[#605A57] mb-3 line-clamp-2">
                            {lead.description}
                          </p>
                          
                          <div className="flex items-center text-sm text-[#605A57] mb-3">
                            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{lead.address}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-[#37322F]">${lead.price}</div>
                            <div className="text-sm text-[#605A57]">
                              {formatDate(lead.created_at)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#37322F]">Analytics</CardTitle>
                <CardDescription className="text-[#605A57]">
                  Track your lead performance and revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-[#F7F5F3] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-[#605A57] mx-auto mb-4" />
                    <p className="text-[#605A57]">Analytics charts will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#37322F]">Team Management</CardTitle>
                <CardDescription className="text-[#605A57]">
                  Manage your team members and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-[#F7F5F3] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-[#605A57] mx-auto mb-4" />
                    <p className="text-[#605A57]">Team management features coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#37322F]">Billing & Payments</CardTitle>
                <CardDescription className="text-[#605A57]">
                  Manage your subscription and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-[#F7F5F3] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <DollarSign className="h-12 w-12 text-[#605A57] mx-auto mb-4" />
                    <p className="text-[#605A57]">Billing features coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
