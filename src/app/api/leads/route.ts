import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { notifyNewLead } from '@/lib/notifications'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get leads for the user's organization
    const { data: leads, error } = await supabase
      .from('leads')
      .select(`
        *,
        organizations!inner(*)
      `)
      .eq('organizations.owner_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ leads })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, description, address, city, state } = body

    // Get user's organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('id')
      .eq('owner_id', user.id)
      .single()

    if (orgError || !org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
    }

    // Create new lead
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        name,
        phone,
        description,
        address,
        city,
        state,
        organization_id: org.id,
        status: 'new',
        price: 20, // Default price
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Send notifications for new lead
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (currentUser) {
        await notifyNewLead(
          currentUser.email || '',
          '', // Phone number would come from user profile
          {
            name,
            phone,
            description,
            address
          }
        )
      }
    } catch (notificationError) {
      console.error('Notification error:', notificationError)
      // Don't fail the lead creation if notifications fail
    }

    return NextResponse.json({ lead })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
