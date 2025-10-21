import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'API is working',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Not set',
    timestamp: new Date().toISOString()
  })
}
