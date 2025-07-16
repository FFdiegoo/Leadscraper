'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import AddLeadForm from '@/components/AddLeadForm'
import LeadsList from '@/components/LeadsList'
import { supabaseClient } from '@/lib/supabase'

type Lead = {
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

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabaseClient
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching leads:', error)
        return
      }

      setLeads(data || [])
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleLeadAdded = () => {
    fetchLeads()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 font-mono">Lead Management</h1>
            <p className="text-gray-400">Voeg nieuwe leads toe en beheer je database</p>
          </div>

          <div className="space-y-8">
            <AddLeadForm onLeadAdded={handleLeadAdded} />
            <LeadsList leads={leads} loading={loading} />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}