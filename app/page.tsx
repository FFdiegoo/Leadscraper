'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Zap, Users, Target } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { signIn, user } = useAuth()
  const router = useRouter()

  if (user) {
    router.push('/dashboard')
    return null
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await signIn(email)
      setMessage('Check je email voor de magic link!')
    } catch (error) {
      setMessage('Er is een fout opgetreden. Probeer opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-400 mb-2">LeadScraper Breda</h1>
          <p className="text-gray-400">Automatische lead generatie voor technische MKB-bedrijven</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white font-mono text-center">Inloggen</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-300">Email adres</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.com"
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-400 hover:bg-orange-500 text-gray-900 font-mono"
              >
                {loading ? 'Versturen...' : 'Verstuur Magic Link'}
              </Button>
            </form>
            
            {message && (
              <p className="mt-4 text-center text-sm text-green-400">{message}</p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
            <Target className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <h3 className="text-white font-mono mb-1">Gerichte Leads</h3>
            <p className="text-gray-400 text-sm">Technische MKB-bedrijven rond Breda</p>
          </div>
          
          <div className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
            <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <h3 className="text-white font-mono mb-1">Automatisch</h3>
            <p className="text-gray-400 text-sm">Geautomatiseerde data verzameling</p>
          </div>
        </div>
      </div>
    </div>
  )
}