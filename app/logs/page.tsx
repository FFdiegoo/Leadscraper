'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Activity, CheckCircle, XCircle, RefreshCw } from 'lucide-react'
import axios from 'axios'

type Log = {
  id: string
  status: string
  timestamp: string
  message: string
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      const response = await axios.get('/api/logs')
      setLogs(response.data)
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Activity className="w-5 h-5 text-orange-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-400 text-gray-900">Success</Badge>
      case 'failed':
        return <Badge className="bg-red-400 text-gray-900">Failed</Badge>
      default:
        return <Badge className="bg-orange-400 text-gray-900">Running</Badge>
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Scraping Logs</h1>
              <p className="text-gray-400">Overzicht van alle scraping activiteiten en resultaten</p>
            </div>
            <Button
              onClick={fetchLogs}
              className="bg-orange-400 hover:bg-orange-500 text-gray-900 font-mono"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Vernieuwen
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Logs laden...</p>
            </div>
          ) : logs.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Geen logs gevonden</p>
                <p className="text-gray-500 text-sm mt-2">
                  Start een scraping sessie om logs te genereren
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {logs.map((log, index) => (
                <Card
                  key={log.id}
                  className="bg-gray-800 border-gray-700 hover:border-orange-400 transition-colors duration-200"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getStatusIcon(log.status)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusBadge(log.status)}
                            <span className="text-sm text-gray-500 font-mono">
                              {new Date(log.timestamp).toLocaleString('nl-NL')}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {log.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}