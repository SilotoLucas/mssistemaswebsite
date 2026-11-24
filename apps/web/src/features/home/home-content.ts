import type { IconName } from '../../shared/ui/icon'

export type Segment = {
  readonly icon: IconName
  readonly title: string
  readonly text: string
  readonly href: string
  readonly topics: readonly string[]
}

type ModuleLink = {
  readonly label: string
  readonly slug: string
}

export type ModuleGroup = {
  readonly icon: IconName
  readonly title: string
  readonly modules: readonly ModuleLink[]
}

export const solutionHref = (slug: string): string => `/solucoes#${slug}`

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
    modules: [
      { label: 'Financeiro', slug: 'controle-financeiro' },
      { label: 'Caixa', slug: 'caixa-matriz' },
      { label: 'Caixa PIX', slug: 'caixa-pix' },
      { label: 'Cobrança Bancária', slug: 'cobranca-bancaria' },
      { label: 'Filiais', slug: 'filiais-online' },
      { label: 'Frota', slug: 'frota' },
      { label: 'Compras', slug: 'compras' },
      { label: 'Patrimônio', slug: 'patrimonio' },
      { label: 'CRM', slug: 'crm' },
      { label: 'Dashboard', slug: 'dashboard' },
    ],
  },
  {
    icon: 'phone',
    title: 'Equipe em campo',
    modules: [
      { label: 'Cobrança Móvel', slug: 'cobranca-movel' },
      { label: 'Venda com Tablet', slug: 'venda-com-tablet' },
      { label: 'Pré-Cadastro', slug: 'pre-cadastro' },
      { label: 'P.O.S', slug: 'pos' },
      { label: 'Gestor de Frotas', slug: 'app-frota' },
    ],
  },
  {
    icon: 'globe',
    title: 'Canais digitais',
    modules: [
      { label: 'Portal do Associado', slug: 'portal-do-associado' },
      { label: 'App do Associado', slug: 'app-do-associado' },
      { label: 'Venda Web', slug: 'venda-web' },
      { label: 'ChatBot', slug: 'chatbot' },
      { label: 'WhatsApp Marketing', slug: 'whatsapp-marketing' },
      { label: 'SMS', slug: 'sms-marketing' },
    ],
  },
  {
    icon: 'monitor',
    title: 'Atendimento presencial',
    modules: [
      { label: 'Totem de Autoatendimento', slug: 'totem-autoatendimento' },
      { label: 'Totem Cemitério', slug: 'totem-cemiterio' },
      { label: 'QR Code', slug: 'qr-code-cemiterio' },
      { label: 'Painel de Velório', slug: 'painel-de-velorio' },
      { label: 'Condolência Online', slug: 'condolencia-online' },
    ],
  },
]
