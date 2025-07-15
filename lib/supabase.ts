import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseClient = createClientComponentClient()

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          bedrijfsnaam: string
          adres: string
          branche: string
          contactpersoon: string
          functie: string
          email: string
          telefoon: string
          created_at: string
        }
        Insert: {
          id?: string
          bedrijfsnaam: string
          adres: string
          branche: string
          contactpersoon: string
          functie: string
          email: string
          telefoon: string
          created_at?: string
        }
        Update: {
          id?: string
          bedrijfsnaam?: string
          adres?: string
          branche?: string
          contactpersoon?: string
          functie?: string
          email?: string
          telefoon?: string
          created_at?: string
        }
      }
      scrape_logs: {
        Row: {
          id: string
          status: string
          timestamp: string
          message: string
        }
        Insert: {
          id?: string
          status: string
          timestamp?: string
          message: string
        }
        Update: {
          id?: string
          status?: string
          timestamp?: string
          message?: string
        }
      }
    }
  }
}