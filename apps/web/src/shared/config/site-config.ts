export type NavigationLink = { readonly label: string; readonly href: string }

export type SystemAccess = {
  readonly name: string
  readonly description: string
  readonly href: string
}

export const NAVIGATION: readonly NavigationLink[] = [
  { label: 'Soluções', href: '/solucoes' },
  { label: 'Clientes', href: '/clientes' },
  { label: 'Suporte', href: '/suporte' },
  { label: 'Empresa', href: '/empresa' },
  { label: 'Contato', href: '/contato' },
]

export const SYSTEM_ACCESS: readonly SystemAccess[] = [
  {
    name: 'MS Suporte',
    description: 'Chamados e atendimento',
    href: 'https://suporte.mssistemas.com.br',
  },
  {
    name: 'Portal do Associado',
    description: 'Serviços do plano contratado',
    href: 'https://apps.mssistemas.com.br/areacliente',
  },
  {
    name: 'MS Dashboard',
    description: 'Indicadores da sua empresa',
    href: 'https://indicadores.mssistemas.com.br',
  },
]

export const SUPPORT_URL = 'https://suporte.mssistemas.com.br'

const whatsappNumber: string = import.meta.env.VITE_WHATSAPP_NUMBER ?? ''

export const HAS_WHATSAPP = Boolean(whatsappNumber)

export const WHATSAPP_HREF = whatsappNumber ? `https://wa.me/55${whatsappNumber}` : '/#atendimento'

export const WHATSAPP_LABEL = whatsappNumber || '[Número do WhatsApp]'
