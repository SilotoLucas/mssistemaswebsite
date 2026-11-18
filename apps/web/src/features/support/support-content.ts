import type { IconName } from '../../shared/ui/icon'

export type SupportPoint = {
  readonly icon: IconName
  readonly title: string
  readonly text: string
}

export const SUPPORT_STRENGTHS: readonly SupportPoint[] = [
  {
    icon: 'message',
    title: 'Atendimento rápido pelo WhatsApp',
    text: 'Sua mensagem chega direto à equipe de consultores, sem formulário e sem burocracia.',
  },
  {
    icon: 'headset',
    title: 'Consultores que conhecem o setor',
    text: 'Quem atende entende a rotina de funerárias, planos, cemitérios e crematórios.',
  },
  {
    icon: 'clock',
    title: 'Plantão em fins de semana e feriados',
    text: 'O setor não para, e o atendimento também não.',
  },
  {
    icon: 'monitor',
    title: 'Acesso remoto na hora',
    text: 'Quando preciso, o consultor entra no seu computador e resolve com você.',
  },
]

export const SUPPORT_FLOW: readonly SupportPoint[] = [
  {
    icon: 'message',
    title: 'Chame no WhatsApp',
    text: 'Conte o que aconteceu. Pode mandar texto, foto ou print da tela.',
  },
  {
    icon: 'headset',
    title: 'Um consultor assume',
    text: 'Quem responde conhece o seu sistema e já começa a resolver na própria conversa.',
  },
  {
    icon: 'monitor',
    title: 'Resolvido, com acesso remoto se precisar',
    text: 'Se a solução pedir, o consultor acessa o computador e faz junto com você.',
  },
]

export type SupportDownload = {
  readonly name: string
  readonly description: string
  readonly href: string | null
}

export const SUPPORT_DOWNLOADS: readonly SupportDownload[] = [
  {
    name: 'TeamViewer',
    description: 'Acesso remoto para atendimento da equipe de suporte.',
    href: 'https://www.teamviewer.com/pt-br/download/',
  },
  {
    name: 'AnyDesk',
    description: 'Alternativa de acesso remoto, leve e rápida de instalar.',
    href: 'https://anydesk.com/pt/downloads',
  },
  {
    name: '.NET Framework',
    description: 'Componente da Microsoft exigido por alguns módulos do sistema.',
    href: 'https://dotnet.microsoft.com/pt-br/download/dotnet-framework',
  },
  {
    name: 'MS Suporte',
    description: 'Aplicativo de atendimento. Peça o instalador a um consultor.',
    href: null,
  },
  {
    name: 'MS Conexão RDP',
    description: 'Conexão remota aos sistemas. Peça o instalador a um consultor.',
    href: null,
  },
]
