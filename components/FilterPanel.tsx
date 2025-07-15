'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Filter, X } from 'lucide-react'

type FilterPanelProps = {
  onFilterChange: (filters: { branche: string; locatie: string }) => void
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [branche, setBranche] = useState('')
  const [locatie, setLocatie] = useState('')

  const handleFilterChange = () => {
    onFilterChange({ branche, locatie })
  }

  const clearFilters = () => {
    setBranche('')
    setLocatie('')
    onFilterChange({ branche: '', locatie: '' })
  }

  const branches = [
    'IT/Software',
    'Technische Dienstverlening',
    'Productie/Manufacturing',
    'Elektrotechniek',
    'Bouw/Installatietechniek',
    'Automatisering',
    'Overig'
  ]

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white font-mono flex items-center">
          <Filter className="w-5 h-5 mr-2 text-orange-400" />
          Filters
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="branche" className="text-gray-300 font-mono">Branche</Label>
          <Select value={branche} onValueChange={setBranche}>
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
          <Label htmlFor="locatie" className="text-gray-300 font-mono">Locatie</Label>
          <Input
            id="locatie"
            value={locatie}
            onChange={(e) => setLocatie(e.target.value)}
            placeholder="Bijv. Breda, Tilburg..."
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={handleFilterChange}
            className="bg-orange-400 hover:bg-orange-500 text-gray-900 font-mono flex-1"
          >
            Toepassen
          </Button>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}