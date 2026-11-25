import type { IconName } from '../../shared/ui/icon'

export type TeamMember = {
  readonly name: string
  readonly bio?: string
}

export type TeamFront = {
  readonly icon: IconName
  readonly kicker: string
  readonly title: string
  readonly text: string
  readonly points: readonly string[]
}

export type TeamStep = {
  readonly icon: IconName
  readonly title: string
  readonly text: string
}

export const TEAM_MEMBERS: readonly TeamMember[] = [
  { name: 'Eduardo' },
  { name: 'Simone' },
  { name: 'Marcello' },
  { name: 'Alessandro' },
  { name: 'Bill' },
  { name: 'Mario' },
  { name: 'Neri' },
  { name: 'Lucas' },
  { name: 'Pedro' },
  { name: 'Paulo' },
  { name: 'Vinícius' },
  { name: 'Marco' },
  { name: 'Kaick' },
  { name: 'David' },
  { name: 'Matheus' },
]

export const memberBio = (member: TeamMember): string =>
  member.bio ??
  `${member.name} faz parte da equipe da MS Sistemas e trabalha todos os dias para que cada cliente tenha um sistema confiável e um atendimento próximo. Em breve, mais sobre a trajetória e a atuação de ${member.name} na MS.`

export const TEAM_FRONTS: readonly TeamFront[] = [
  {
    icon: 'headset',
    kicker: 'Suporte',
    title: 'Uma equipe de suporte qualificada',
    text: 'Quem atende conhece o sistema por dentro e entende a rotina de funerárias, planos, cemitérios e crematórios. Você explica o problema uma vez e recebe a orientação certa.',
    points: [
      'Atendimento pelo WhatsApp, direto com a equipe',
      'Acesso remoto para resolver junto com você',
      'Plantão em fins de semana e feriados',
      'Orientação no uso dos módulos do dia a dia',
    ],
  },
  {
    icon: 'layers',
    kicker: 'Desenvolvimento',
    title: 'Um time que não para de evoluir o sistema',
    text: 'A MS tem equipe de desenvolvimento própria. Ela faz ajustes, aprimora os módulos o tempo todo e mantém o sistema atualizado com o mercado e com as exigências do setor.',
    points: [
      'Ajustes e correções feitos pela própria MS',
      'Melhorias contínuas em todos os módulos',
      'Sistema atualizado com o mercado',
      'Soluções específicas para o que o cliente precisar',
    ],
  },
]

export const TEAM_STEPS: readonly TeamStep[] = [
  {
    icon: 'message',
    title: 'Você fala com o suporte',
    text: 'Dúvida, ajuste ou ideia: tudo começa com uma conversa com quem conhece o sistema.',
  },
  {
    icon: 'headset',
    title: 'O suporte resolve ou encaminha',
    text: 'O que dá para resolver na hora, o suporte resolve. Pedidos de melhoria e soluções específicas seguem para o desenvolvimento.',
  },
  {
    icon: 'layers',
    title: 'O desenvolvimento entrega',
    text: 'A equipe de desenvolvimento estuda o pedido, cria a solução e o sistema evolui junto com a sua empresa.',
  },
]
