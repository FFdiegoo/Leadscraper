'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building, MapPin, User, Mail, Phone, Briefcase } from 'lucide-react'

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

export default function LeadCard({ lead }: { lead: Lead }) {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-orange-400 transition-colors duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white font-mono text-lg group-hover:text-orange-400 transition-colors">
            <Building className="w-5 h-5 inline mr-2" />
            {lead.bedrijfsnaam}
          </CardTitle>
          <Badge variant="secondary" className="bg-orange-400 text-gray-900 font-mono">
            {lead.branche}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center text-gray-300">
          <MapPin className="w-4 h-4 mr-2 text-orange-400" />
          <span className="text-sm">{lead.adres}</span>
        </div>
        
        <div className="flex items-center text-gray-300">
          <User className="w-4 h-4 mr-2 text-orange-400" />
          <span className="text-sm font-medium">{lead.contactpersoon}</span>
          <span className="text-xs text-gray-500 ml-2">({lead.functie})</span>
        </div>
        
        <div className="flex items-center text-gray-300">
          <Mail className="w-4 h-4 mr-2 text-orange-400" />
          <a href={`mailto:${lead.email}`} className="text-sm hover:text-orange-400 transition-colors">
            {lead.email}
          </a>
        </div>
        
        <div className="flex items-center text-gray-300">
          <Phone className="w-4 h-4 mr-2 text-orange-400" />
          <a href={`tel:${lead.telefoon}`} className="text-sm hover:text-orange-400 transition-colors">
            {lead.telefoon}
          </a>
        </div>
        
        <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
          Toegevoegd: {new Date(lead.created_at).toLocaleDateString('nl-NL')}
        </div>
      </CardContent>
    </Card>
  )
}