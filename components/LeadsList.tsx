'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building, MapPin, User, Mail, Phone, Briefcase, Users } from 'lucide-react'

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

type LeadsListProps = {
  leads: Lead[]
  loading: boolean
}

export default function LeadsList({ leads, loading }: LeadsListProps) {
  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-400 font-mono">Leads laden...</p>
        </CardContent>
      </Card>
    )
  }

  if (leads.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-12 text-center">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 font-mono">Nog geen leads toegevoegd</p>
          <p className="text-gray-500 text-sm mt-2">
            Voeg je eerste lead toe met het formulier hierboven
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white font-mono">
          Alle Leads ({leads.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {leads.map((lead, index) => (
          <Card
            key={lead.id}
            className="bg-gray-800 border-gray-700 hover:border-orange-400 transition-colors duration-200 group animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white font-mono text-lg group-hover:text-orange-400 transition-colors">
                  <Building className="w-5 h-5 inline mr-2" />
                  {lead.bedrijfsnaam}
                </CardTitle>
                {lead.branche && (
                  <Badge variant="secondary" className="bg-orange-400 text-gray-900 font-mono">
                    {lead.branche}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {lead.adres && (
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-orange-400 flex-shrink-0" />
                  <span className="text-sm">{lead.adres}</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-300">
                <User className="w-4 h-4 mr-2 text-orange-400 flex-shrink-0" />
                <span className="text-sm font-medium">{lead.contactpersoon}</span>
                {lead.functie && (
                  <span className="text-xs text-gray-500 ml-2">({lead.functie})</span>
                )}
              </div>
              
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-orange-400 flex-shrink-0" />
                <a 
                  href={`mailto:${lead.email}`} 
                  className="text-sm hover:text-orange-400 transition-colors truncate"
                >
                  {lead.email}
                </a>
              </div>
              
              {lead.telefoon && (
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-2 text-orange-400 flex-shrink-0" />
                  <a 
                    href={`tel:${lead.telefoon}`} 
                    className="text-sm hover:text-orange-400 transition-colors"
                  >
                    {lead.telefoon}
                  </a>
                </div>
              )}
              
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-700 font-mono">
                Toegevoegd: {new Date(lead.created_at).toLocaleDateString('nl-NL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}