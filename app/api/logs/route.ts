import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('scrape_logs')
      .select('*')
      .order('timestamp', { ascending: false })

    if (error) {
      console.error('Error fetching logs:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in logs API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}