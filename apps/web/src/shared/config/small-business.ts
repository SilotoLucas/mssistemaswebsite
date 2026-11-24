import type { IconName } from '../ui/icon'
import { whatsappMessageHref } from './site-config'

export type SmallBusinessItem = { readonly icon: IconName; readonly label: string }

type SmallBusinessModule = SmallBusinessItem & { readonly solution: string }

export const SMALL_BUSINESS_MAX_MACHINES = 5

export const SMALL_BUSINESS_MODULES: readonly SmallBusinessModule[] = [
  { icon: 'shield', label: 'Plano', solution: 'planos-funerarios' },
  { icon: 'clipboard', label: 'Funerária', solution: 'funerarias' },
  { icon: 'receipt', label: 'Cobrança', solution: 'cobranca-bancaria' },
  { icon: 'wallet', label: 'Caixa', solution: 'caixa-matriz' },
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
