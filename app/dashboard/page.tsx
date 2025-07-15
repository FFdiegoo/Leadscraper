'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import LeadCard from '@/components/LeadCard'
import FilterPanel from '@/components/FilterPanel'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Users, Building, TrendingUp } from 'lucide-react'
import axios from 'axios'

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

export default function Dashboard() {
  const { user } = useAuth()
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [scraping, setScraping] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const response = await axios.get('/api/leads')
      setLeads(response.data)
      setFilteredLeads(response.data)
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filters: { branche: string; locatie: string }) => {
    let filtered = leads

    if (filters.branche) {
      filtered = filtered.filter(lead => lead.branche === filters.branche)
    }

    if (filters.locatie) {
      filtered = filtered.filter(lead => 
        lead.adres.toLowerCase().includes(filters.locatie.toLowerCase())
      )
    }

    setFilteredLeads(filtered)
  }

  const handleStartScrape = async () => {
    setScraping(true)
    try {
      await axios.post('/api/scrape/start')
      setTimeout(() => {
        fetchLeads()
        setScraping(false)
      }, 3000)
    } catch (error) {
      console.error('Error starting scrape:', error)
      setScraping(false)
    }
  }

  const stats = {
    totalLeads: leads.length,
    newThisWeek: leads.filter(lead => {
      const leadDate = new Date(lead.created_at)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return leadDate > weekAgo
    }).length,
    uniqueBranches: [...new Set(leads.map(lead => lead.branche))].length
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Overzicht van gescrapete technische MKB-bedrijven</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-mono">Total Leads</p>
                    <p className="text-2xl font-bold text-white">{stats.totalLeads}</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-mono">Deze Week</p>
                    <p className="text-2xl font-bold text-white">{stats.newThisWeek}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-mono">Branches</p>
                    <p className="text-2xl font-bold text-white">{stats.uniqueBranches}</p>
                  </div>
                  <Building className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Panel */}
            <div className="lg:col-span-1">
              <FilterPanel onFilterChange={handleFilterChange} />
              
              <Card className="bg-gray-800 border-gray-700 mt-6">
                <CardHeader>
                  <CardTitle className="text-white font-mono">Scraping</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleStartScrape}
                    disabled={scraping}
                    className="w-full bg-orange-400 hover:bg-orange-500 text-gray-900 font-mono"
                  >
                    {scraping ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                        Scraping...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Play className="w-4 h-4 mr-2" />
                        Start Nieuwe Scrape
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Leads Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
                  <p className="text-gray-400">Leads laden...</p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-12 text-center">
                    <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Geen leads gevonden</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Start een nieuwe scrape om leads te verzamelen
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {filteredLeads.map((lead, index) => (
                    <div
                      key={lead.id}
                      className="animate-fadeIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <LeadCard lead={lead} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}