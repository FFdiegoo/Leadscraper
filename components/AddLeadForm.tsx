'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Loader2 } from 'lucide-react'
import { supabaseClient } from '@/lib/supabase'

type AddLeadFormProps = {
  onLeadAdded: () => void
}

export default function AddLeadForm({ onLeadAdded }: AddLeadFormProps) {
  const [formData, setFormData] = useState({
    bedrijfsnaam: '',
    adres: '',
    branche: '',
    contactpersoon: '',
    functie: '',
    email: '',
    telefoon: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const branches = [
    'IT/Software',
    'Technische Dienstverlening',
    'Productie/Manufacturing',
    'Elektrotechniek',
    'Bouw/Installatietechniek',
    'Automatisering',
    'Overig'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Validatie
    if (!formData.bedrijfsnaam || !formData.email || !formData.contactpersoon) {
      setMessage({ type: 'error', text: 'Bedrijfsnaam, contactpersoon en email zijn verplicht' })
      setLoading(false)
      return
    }

    // Email validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: 'Voer een geldig email adres in' })
      setLoading(false)
      return
    }

    try {
      const { error } = await supabaseClient
        .from('leads')
        .insert([formData])

      if (error) {
        throw error
      }

      setMessage({ type: 'success', text: 'Lead succesvol toegevoegd!' })
      setFormData({
        bedrijfsnaam: '',
        adres: '',
        branche: '',
        contactpersoon: '',
        functie: '',
        email: '',
        telefoon: ''
      })
      onLeadAdded()
    } catch (error) {
      console.error('Error adding lead:', error)
      setMessage({ type: 'error', text: 'Er is een fout opgetreden bij het toevoegen van de lead' })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white font-mono flex items-center">
          <Plus className="w-5 h-5 mr-2 text-orange-400" />
          Nieuwe Lead Toevoegen
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bedrijfsnaam" className="text-gray-300 font-mono">
                Bedrijfsnaam *
              </Label>
              <Input
                id="bedrijfsnaam"
                value={formData.bedrijfsnaam}
                onChange={(e) => handleInputChange('bedrijfsnaam', e.target.value)}
                placeholder="Bijv. TechBedrijf BV"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="adres" className="text-gray-300 font-mono">
                Adres
              </Label>
              <Input
                id="adres"
                value={formData.adres}
                onChange={(e) => handleInputChange('adres', e.target.value)}
                placeholder="Straat 123, Breda"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Label htmlFor="branche" className="text-gray-300 font-mono">
                Branche
              </Label>
              <Select value={formData.branche} onValueChange={(value) => handleInputChange('branche', value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Selecteer branche" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch} className="text-white hover:bg-gray-600">
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="contactpersoon" className="text-gray-300 font-mono">
                Contactpersoon *
              </Label>
              <Input
                id="contactpersoon"
                value={formData.contactpersoon}
                onChange={(e) => handleInputChange('contactpersoon', e.target.value)}
                placeholder="Jan Jansen"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="functie" className="text-gray-300 font-mono">
                Functie
              </Label>
              <Input
                id="functie"
                value={formData.functie}
                onChange={(e) => handleInputChange('functie', e.target.value)}
                placeholder="Directeur, CTO, etc."
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300 font-mono">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="jan@bedrijf.nl"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="telefoon" className="text-gray-300 font-mono">
                Telefoon
              </Label>
              <Input
                id="telefoon"
                value={formData.telefoon}
                onChange={(e) => handleInputChange('telefoon', e.target.value)}
                placeholder="06-12345678"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-400 hover:bg-orange-500 text-gray-900 font-mono"
          >
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Toevoegen...
              </div>
            ) : (
              <div className="flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Lead Toevoegen
              </div>
            )}
          </Button>

          {message && (
            <div className={`p-3 rounded-md text-sm font-mono ${
              message.type === 'success' 
                ? 'bg-green-900 text-green-300 border border-green-700' 
                : 'bg-red-900 text-red-300 border border-red-700'
            }`}>
              {message.text}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}