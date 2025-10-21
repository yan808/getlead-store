"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Plus,
  Settings,
  LogOut,
  BarChart3,
  Building2
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface AdminStats {
  totalUsers: number
  totalOrganizations: number
  totalLeads: number
  totalRevenue: number
}

interface Organization {
  id: string
  name: string
  owner_email: string
  created_at: string
  stripe_customer_id: string | null
}

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalOrganizations: 0,
    totalLeads: 0,
    totalRevenue: 0
  })
  const [organizations, setOrganizations] = useState<Organization[]>([])

  useEffect(() => {
    fetchAdminData()
    checkAdminAuth()
  }, [])

  const checkAdminAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/signin')
      return
    }

    // TODO: Add proper admin role checking
    // For now, allow any authenticated user to access admin
  }

  const fetchAdminData = async () => {
    try {
      // Fetch organizations
      const { data: orgs, error: orgsError } = await supabase
        .from('organizations')
        .select(`
          id,
          name,
          created_at,
          stripe_customer_id,
          owner_id
        `)
        .order('created_at', { ascending: false })

      if (orgsError) {
        console.error('Error fetching organizations:', orgsError)
        return
      }

      // Transform data to match interface
      const transformedOrgs = orgs?.map(org => ({
        id: org.id,
        name: org.name,
        owner_email: `user-${org.owner_id}@example.com`, // Placeholder email
        created_at: org.created_at,
        stripe_customer_id: org.stripe_customer_id
      })) || []

      setOrganizations(transformedOrgs)

      // Fetch leads count
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('id, price')

      if (!leadsError && leads) {
        const totalLeads = leads.length
        const totalRevenue = leads.reduce((sum, lead) => sum + (lead.price || 0), 0)

        setStats({
          totalUsers: orgs?.length || 0,
          totalOrganizations: orgs?.length || 0,
          totalLeads,
          totalRevenue
        })
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createTestLead = async () => {
    try {
      const response = await fetch('/api/leads/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        await fetchAdminData() // Refresh data
      }
    } catch (error) {
      console.error('Error creating test lead:', error)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-[#1A73E8] rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <p className="text-[#605A57]">Loading admin dashboard...</p>
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
              <h1 className="text-xl font-bold text-[#37322F]">GetLead.Store Admin</h1>
              <p className="text-sm text-[#605A57]">Platform Management</p>
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

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-[#E0DEDB] min-h-screen p-6">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "overview"
                  ? "bg-[#1A73E8] text-white"
                  : "text-[#605A57] hover:bg-[#F7F5F3]"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Overview</span>
            </button>
            
            <button
              onClick={() => setActiveTab("organizations")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "organizations"
                  ? "bg-[#1A73E8] text-white"
                  : "text-[#605A57] hover:bg-[#F7F5F3]"
              }`}
            >
              <Building2 className="h-5 w-5" />
              <span>Organizations</span>
            </button>
            
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === "leads"
                  ? "bg-[#1A73E8] text-white"
                  : "text-[#605A57] hover:bg-[#F7F5F3]"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>All Leads</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#605A57]">Total Users</p>
                    <p className="text-2xl font-bold text-[#37322F]">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-[#1A73E8]" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#605A57]">Organizations</p>
                    <p className="text-2xl font-bold text-[#37322F]">{stats.totalOrganizations}</p>
                  </div>
                  <Building2 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#605A57]">Total Leads</p>
                    <p className="text-2xl font-bold text-[#37322F]">{stats.totalLeads}</p>
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

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-[#37322F]">Platform Overview</CardTitle>
                  <CardDescription className="text-[#605A57]">
                    Manage your GetLead.Store platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#37322F]">Quick Actions</h3>
                      <div className="space-y-2">
                        <Button 
                          onClick={createTestLead}
                          className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Test Lead
                        </Button>
                        <Button variant="outline" className="w-full border-[#E0DEDB] text-[#605A57]">
                          View All Leads
                        </Button>
                        <Button variant="outline" className="w-full border-[#E0DEDB] text-[#605A57]">
                          Export Data
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#37322F]">System Status</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-[#37322F]">Database</span>
                          <span className="text-green-600 font-medium">Online</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-[#37322F]">API</span>
                          <span className="text-green-600 font-medium">Healthy</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-[#37322F]">Notifications</span>
                          <span className="text-green-600 font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Organizations Tab */}
          {activeTab === "organizations" && (
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#37322F]">Organizations</CardTitle>
                <CardDescription className="text-[#605A57]">
                  Manage all organizations on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E0DEDB]">
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#37322F]">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#37322F]">Owner Email</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#37322F]">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-[#37322F]">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {organizations.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-[#605A57]">
                            No organizations found
                          </td>
                        </tr>
                      ) : (
                        organizations.map((org) => (
                          <tr key={org.id} className="border-b border-[#E0DEDB] hover:bg-[#F7F5F3]">
                            <td className="py-3 px-4">
                              <div className="font-medium text-[#37322F]">{org.name}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-[#605A57]">{org.owner_email}</div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                org.stripe_customer_id 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {org.stripe_customer_id ? "Activated" : "Pending"}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-[#605A57] text-sm">
                                {new Date(org.created_at).toLocaleDateString()}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Leads Tab */}
          {activeTab === "leads" && (
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-[#37322F]">All Leads</CardTitle>
                <CardDescription className="text-[#605A57]">
                  View and manage all leads across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-[#F7F5F3] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-[#605A57] mx-auto mb-4" />
                    <p className="text-[#605A57]">All leads view coming soon</p>
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
