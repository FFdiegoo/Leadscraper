'use client'

import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Database, Settings, Activity, LogOut, Users } from 'lucide-react'

export default function Navigation() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (!user) return null

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-orange-400 font-bold text-xl font-mono">
              LeadScraper Breda
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-300 hover:text-orange-400 hover:bg-gray-800">
                <Database className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            
            <Link href="/leads">
              <Button variant="ghost" className="text-gray-300 hover:text-orange-400 hover:bg-gray-800">
                <Users className="w-4 h-4 mr-2" />
                Leads
              </Button>
            </Link>
            
            <Link href="/instellingen">
              <Button variant="ghost" className="text-gray-300 hover:text-orange-400 hover:bg-gray-800">
                <Settings className="w-4 h-4 mr-2" />
                Instellingen
              </Button>
            </Link>
            
            <Link href="/logs">
              <Button variant="ghost" className="text-gray-300 hover:text-orange-400 hover:bg-gray-800">
                <Activity className="w-4 h-4 mr-2" />
                Logs
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-gray-300 hover:text-red-400 hover:bg-gray-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Uitloggen
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}