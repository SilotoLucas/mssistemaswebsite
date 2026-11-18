import type { IconName } from '../../shared/ui/icon'

export type Segment = {
  readonly icon: IconName
  readonly title: string
  readonly text: string
  readonly href: string
  readonly topics: readonly string[]
}

export type ModuleGroup = {
  readonly icon: IconName
  readonly title: string
  readonly modules: readonly string[]
}

export const SEGMENTS: readonly Segment[] = [
  {
    icon: 'shield',
    title: 'Planos Funerários',
    text: 'Contratos, cobrança, carteirinhas, convênios e comissões em um só lugar.',
    href: '/solucoes#planos-funerarios',
    topics: ['Contratos', 'Cobrança', 'Carteirinhas', 'Convênios', 'Comissões'],
  },
  {
    icon: 'clipboard',
    title: 'Funerárias',
    text: 'Documentação do óbito, ordens de serviço, nota fiscal e estoque.',
    href: '/solucoes#funerarias',
    topics: ['Óbito', 'Ordens de serviço', 'Nota fiscal', 'Estoque'],
  },
  {
    icon: 'pin',
    title: 'Cemitérios',
    text: 'Jazigos, sepultamentos, exumações, contratos e cobranças.',
    href: '/solucoes#cemiterios',
    topics: ['Jazigos', 'Sepultamentos', 'Exumações', 'Contratos'],
  },
  {
    icon: 'calendar',
    title: 'Crematórios',
    text: 'Cremações, agendamento de salas, documentação e vendas.',
    href: '/solucoes#crematorios',
    topics: ['Cremações', 'Agendamento', 'Documentação', 'Vendas'],
  },
]

export const MODULE_GROUPS: readonly ModuleGroup[] = [
  {
    icon: 'dashboard',
    title: 'Gestão',
    modules: ['Financeiro', 'Filiais', 'Frota', 'Equipamentos', 'CRM', 'Dashboard'],
  },
  {
    icon: 'phone',
    title: 'Equipe em campo',
    modules: ['Cobrança Móvel', 'Venda com Tablet', 'P.O.S'],
  },
  {
    icon: 'globe',
    title: 'Canais digitais',
    modules: ['Portal do Associado', 'Venda Web', 'ChatBot', 'SMS', 'Condolência Online'],
  },
  {
    icon: 'monitor',
    title: 'Atendimento presencial',
    modules: ['Totem de Autoatendimento', 'Totem Cemitério', 'QR Code', 'Painel de Velório'],
  },
]
