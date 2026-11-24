import type { IconName } from '../../shared/ui/icon'

export type AccessGuide = {
  readonly name: string
  readonly icon: IconName
  readonly audience: string
  readonly uses: readonly string[]
}

export const ACCESS_GUIDES: readonly AccessGuide[] = [
  {
    name: 'MS Suporte',
    icon: 'headset',
    audience: 'Para quem usa o sistema da MS na empresa.',
    uses: [
      'Abrir e acompanhar solicitações',
      'Tirar dúvidas com a equipe',
      'Consultar atendimentos anteriores',
    ],
  },
  {
    name: 'MS Dashboard',
    icon: 'chart',
    audience: 'Para gestores que acompanham os números da empresa.',
    uses: ['Ver indicadores da operação', 'Acompanhar resultados', 'Apoiar decisões de gestão'],
  },
]
