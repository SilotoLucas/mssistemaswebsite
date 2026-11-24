import { formatWhatsapp } from '@ms/domain'
import { COMPANY_WHATSAPP_NUMBER } from './company-info'

export type NavigationLink = { readonly label: string; readonly href: string }

export type SystemAccess = {
  readonly name: string
  readonly description: string
  readonly href: string
}

export const HIDDEN_PAGES: readonly string[] = ['/clientes', '/contato']

export const isPagePublished = (path: string): boolean => !HIDDEN_PAGES.includes(path)

export const DEMO_HREF = '/demonstracao'

const ALL_PAGES: readonly NavigationLink[] = [
  { label: 'Início', href: '/' },
  { label: 'Soluções', href: '/solucoes' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Vídeos do sistema', href: '/videos' },
  { label: 'Suporte', href: '/suporte' },
  { label: 'Clientes', href: '/clientes' },
  { label: 'Empresa', href: '/empresa' },
  { label: 'Contato', href: '/contato' },
]

export const NAVIGATION: readonly NavigationLink[] = ALL_PAGES.filter((link) =>
  isPagePublished(link.href),
)

export const SYSTEM_ACCESS: readonly SystemAccess[] = [
  {
    name: 'MS Suporte',
    description: 'Chamados e atendimento',
    href: 'https://suporte.mssistemas.com.br',
  },
  {
    name: 'MS Dashboard',
    description: 'Indicadores da sua empresa',
    href: 'https://indicadores.mssistemas.com.br',
  },
]

export const SUPPORT_URL = 'https://suporte.mssistemas.com.br'

const whatsappNumber: string = import.meta.env.VITE_WHATSAPP_NUMBER || COMPANY_WHATSAPP_NUMBER

export const WHATSAPP_HREF = `https://wa.me/55${whatsappNumber}`

export const WHATSAPP_LABEL = formatWhatsapp(whatsappNumber)

export const whatsappMessageHref = (message: string): string =>
  `${WHATSAPP_HREF}?text=${encodeURIComponent(message)}`
