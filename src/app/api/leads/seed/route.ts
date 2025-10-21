import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const mockLeads = [
  {
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    description: "Locked out of house, need emergency locksmith",
    address: "123 Main St, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    status: "new",
    price: 150
  },
  {
    name: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    description: "Garage door won't open, motor making noise",
    address: "456 Oak Ave, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    status: "assigned",
    price: 200
  },
  {
    name: "Mike Davis",
    phone: "+1 (555) 456-7890",
    description: "Need new locks installed on front door",
    address: "789 Pine St, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    status: "completed",
    price: 180
  },
  {
    name: "Lisa Wilson",
    phone: "+1 (555) 321-9876",
    description: "Car keys locked inside vehicle",
    address: "321 Elm St, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    status: "new",
    price: 120
  },
  {
    name: "Robert Brown",
    phone: "+1 (555) 654-3210",
    description: "Safe won't open, forgot combination",
    address: "654 Maple Ave, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    status: "assigned",
    price: 250
  }
]

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('id')
      .eq('owner_id', user.id)
      .single()

    if (orgError || !org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
    }

    // Create mock leads
    const leadsWithOrgId = mockLeads.map(lead => ({
      ...lead,
      organization_id: org.id
    }))

    const { data: leads, error } = await supabase
      .from('leads')
      .insert(leadsWithOrgId)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Test leads created successfully',
      leads,
      count: leads.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
