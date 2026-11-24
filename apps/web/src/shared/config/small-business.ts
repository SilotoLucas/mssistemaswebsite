import type { IconName } from '../ui/icon'
import { whatsappMessageHref } from './site-config'
import { SOLUTION_GROUPS } from './solutions-catalog'

export type SmallBusinessItem = { readonly icon: IconName; readonly label: string }

export const SMALL_BUSINESS_MAX_MACHINES = 5

export const SMALL_BUSINESS_MODULES: readonly SmallBusinessItem[] = [
  { icon: 'shield', label: 'Plano' },
  { icon: 'clipboard', label: 'Funerária' },
  { icon: 'receipt', label: 'Cobrança' },
  { icon: 'wallet', label: 'Caixa' },
]

export const SMALL_BUSINESS_PERKS: readonly SmallBusinessItem[] = [
  { icon: 'globe', label: 'Hospedado na nuvem' },
  { icon: 'monitor', label: `Até ${SMALL_BUSINESS_MAX_MACHINES} máquinas` },
  { icon: 'clock', label: 'Começo rápido' },
  { icon: 'chart', label: 'Ótimo custo-benefício' },
]

export const SMALL_BUSINESS_HIGHLIGHTS: readonly string[] = [
  'Gestão de clientes e contratos',
  'Contas a pagar, contas a receber e relatórios',
  'Boletos e PIX integrados ao banco',
  'Acesso pelo navegador, sem instalar programas',
  'Dados em data center, com backup e monitoramento contínuos',
  'Novos módulos conforme a empresa cresce',
]

export const SMALL_BUSINESS_HREF = whatsappMessageHref('Olá! Quero conhecer o SmallBusiness.')

export const DASHBOARD_FEATURES: readonly string[] =
  SOLUTION_GROUPS.flatMap((group) => group.solutions).find(
    (solution) => solution.slug === 'dashboard',
  )?.features ?? []
