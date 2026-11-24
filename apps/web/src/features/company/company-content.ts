import { SERVED_STATE_COUNT } from '../../shared/config/brazil-states'
import { SOLUTION_COUNT } from '../../shared/config/solutions-catalog'
import type { IconName } from '../../shared/ui/icon'

type IconLabel = { readonly name: string; readonly icon: IconName }

export const COMPANY_PILLARS: readonly IconLabel[] = [
  { name: 'Inovação', icon: 'layers' },
  { name: 'Excelência', icon: 'shield' },
  { name: 'Compromisso com o futuro', icon: 'heart' },
]

export const COMPANY_MILESTONES = [
  {
    mark: '2005',
    title: 'Fundação em Botucatu/SP',
    text: 'A MS nasce com foco na automação de funerárias, cemitérios e crematórios.',
  },
  {
    mark: String(SERVED_STATE_COUNT),
    title: 'Estados atendidos',
    text: 'Clientes do Rio Grande do Sul ao Amazonas.',
  },
  {
    mark: '+300',
    title: 'Cidades em todo o Brasil',
    text: 'Presença nas regiões Sul, Sudeste, Centro-Oeste, Norte e Nordeste.',
  },
  {
    mark: String(SOLUTION_COUNT),
    title: 'Soluções integradas',
    text: 'Da gestão administrativa ao atendimento digital.',
  },
] as const

export const COMPANY_VALUES: readonly IconLabel[] = [
  { name: 'Honestidade', icon: 'shield' },
  { name: 'Competência', icon: 'layers' },
  { name: 'Agilidade', icon: 'clock' },
  { name: 'Comprometimento', icon: 'heart' },
  { name: 'Ética', icon: 'check' },
]

export const TEAM_MEMBERS = [
  'Eduardo',
  'Simone',
  'Marcello',
  'Alessandro',
  'Bill',
  'Mario',
  'Neri',
  'Lucas',
  'Pedro',
  'Paulo',
  'Vinícius',
  'Marco',
  'Kaick',
  'David',
  'Matheus',
] as const

const ADDRESS_QUERY = 'Rua Florindo Silva, 51, Botucatu - SP, 18610-150'

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&z=16&output=embed`

export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`
