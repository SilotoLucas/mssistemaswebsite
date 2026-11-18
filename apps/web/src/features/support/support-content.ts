import type { IconName } from '../../shared/ui/icon'

export type SupportStep = { readonly icon: IconName; readonly title: string; readonly text: string }

export const SUPPORT_STEPS: readonly SupportStep[] = [
  {
    icon: 'clipboard',
    title: 'Abra um chamado',
    text: 'Descreva a situação no MS Suporte. Tudo fica registrado e você acompanha o andamento.',
  },
  {
    icon: 'phone-call',
    title: 'Fale com a equipe',
    text: 'Prefere conversar? Ligue para a MS e um consultor orienta você no uso do sistema.',
  },
  {
    icon: 'monitor',
    title: 'Acesso remoto, se precisar',
    text: 'Quando necessário, o consultor acessa o seu computador de forma remota para resolver na hora.',
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
