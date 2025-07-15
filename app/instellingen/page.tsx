'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Key, Shield, Save, Eye, EyeOff } from 'lucide-react'

export default function Settings() {
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({})
  const [apiKeys, setApiKeys] = useState({
    linkedin: '',
    snov: '',
    apollo: '',
    hunter: ''
  })

  const toggleShowKey = (keyName: string) => {
    setShowKeys(prev => ({ ...prev, [keyName]: !prev[keyName] }))
  }

  const handleSaveKeys = () => {
    // Here you would save the API keys to your database
    console.log('Saving API keys:', apiKeys)
    // For now, just show a success message
    alert('API keys opgeslagen!')
  }

  const apiKeyConfigs = [
    {
      name: 'linkedin',
      label: 'LinkedIn API Key',
      description: 'Voor het scrapen van LinkedIn profielen en bedrijfsgegevens',
      placeholder: 'Voer je LinkedIn API key in...'
    },
    {
      name: 'snov',
      label: 'Snov.io API Key',
      description: 'Voor email verificatie en lead enrichment',
      placeholder: 'Voer je Snov.io API key in...'
    },
    {
      name: 'apollo',
      label: 'Apollo.io API Key',
      description: 'Voor uitgebreide bedrijfsdata en contactgegevens',
      placeholder: 'Voer je Apollo.io API key in...'
    },
    {
      name: 'hunter',
      label: 'Hunter.io API Key',
      description: 'Voor het vinden van email adressen',
      placeholder: 'Voer je Hunter.io API key in...'
    }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Instellingen</h1>
            <p className="text-gray-400">Configureer je API keys en scraping instellingen</p>
          </div>

          <Tabs defaultValue="api-keys" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="api-keys" className="data-[state=active]:bg-orange-400 data-[state=active]:text-gray-900">
                <Key className="w-4 h-4 mr-2" />
                API Keys
              </TabsTrigger>
              <TabsTrigger value="scraping" className="data-[state=active]:bg-orange-400 data-[state=active]:text-gray-900">
                <Shield className="w-4 h-4 mr-2" />
                Scraping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api-keys" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-mono">API Configuratie</CardTitle>
                  <p className="text-gray-400">Configureer je externe API keys voor data verzameling</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {apiKeyConfigs.map((config) => (
                    <div key={config.name} className="space-y-2">
                      <Label htmlFor={config.name} className="text-gray-300 font-mono">
                        {config.label}
                      </Label>
                      <p className="text-sm text-gray-500">{config.description}</p>
                      <div className="relative">
                        <Input
                          id={config.name}
                          type={showKeys[config.name] ? 'text' : 'password'}
                          value={apiKeys[config.name as keyof typeof apiKeys]}
                          onChange={(e) => setApiKeys(prev => ({ ...prev, [config.name]: e.target.value }))}
                          placeholder={config.placeholder}
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleShowKey(config.name)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showKeys[config.name] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    onClick={handleSaveKeys}
                    className="bg-orange-400 hover:bg-orange-500 text-gray-900 font-mono"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Opslaan
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scraping" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-mono">Scraping Instellingen</CardTitle>
                  <p className="text-gray-400">Configureer de scraping parameters</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="search-radius" className="text-gray-300 font-mono">
                      Zoekradius (km)
                    </Label>
                    <Input
                      id="search-radius"
                      type="number"
                      defaultValue="25"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <p className="text-sm text-gray-500">Radius rondom Breda voor het zoeken naar bedrijven</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-results" className="text-gray-300 font-mono">
                      Max resultaten per run
                    </Label>
                    <Input
                      id="max-results"
                      type="number"
                      defaultValue="100"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <p className="text-sm text-gray-500">Maximum aantal leads per scraping sessie</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delay" className="text-gray-300 font-mono">
                      Delay tussen requests (ms)
                    </Label>
                    <Input
                      id="delay"
                      type="number"
                      defaultValue="1000"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <p className="text-sm text-gray-500">Vertraging tussen API calls om rate limiting te voorkomen</p>
                  </div>

                  <Button className="bg-orange-400 hover:bg-orange-500 text-gray-900 font-mono">
                    <Save className="w-4 h-4 mr-2" />
                    Instellingen Opslaan
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  )
}