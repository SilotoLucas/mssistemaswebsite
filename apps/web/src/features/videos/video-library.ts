import cemiterios from '../../assets/videos/cemiterios.webp'
import chatbot from '../../assets/videos/chatbot.webp'
import cobrancaMovel from '../../assets/videos/cobranca-movel.webp'
import dashboard from '../../assets/videos/dashboard.webp'
import frota from '../../assets/videos/frota.webp'
import funerarias from '../../assets/videos/funerarias.webp'
import painelDeVelorio from '../../assets/videos/painel-de-velorio.webp'
import planosFunerarios from '../../assets/videos/planos-funerarios.webp'
import portalDoAssociado from '../../assets/videos/portal-do-associado.webp'
import pos from '../../assets/videos/pos.webp'
import smsMarketing from '../../assets/videos/sms-marketing.webp'
import totemAutoatendimento from '../../assets/videos/totem-autoatendimento.webp'
import totemCemiterio from '../../assets/videos/totem-cemiterio.webp'
import vendaComTablet from '../../assets/videos/venda-com-tablet.webp'
import { SOLUTION_COUNT, SOLUTION_GROUPS } from '../../shared/config/solutions-catalog'
import type { IconName } from '../../shared/ui/icon'

type VideoFacts = { readonly seconds: number; readonly poster: string }

export const VIDEO_FACTS: Readonly<Record<string, VideoFacts>> = {
  PJuVVmKkwOE: { seconds: 233, poster: planosFunerarios },
  ymyX2M4RuA0: { seconds: 91, poster: funerarias },
  I4QQv2BYno4: { seconds: 166, poster: cemiterios },
  zlwDWU0mPjs: { seconds: 184, poster: frota },
  c_0ZaxRds_o: { seconds: 379, poster: dashboard },
  DOhSeDlkZSk: { seconds: 123, poster: cobrancaMovel },
  pvFlrhU67nM: { seconds: 370, poster: vendaComTablet },
  '1cc8B3fjYtA': { seconds: 154, poster: pos },
  UzMKHQ2t2ks: { seconds: 93, poster: portalDoAssociado },
  WfIgO2pPig0: { seconds: 101, poster: chatbot },
  j2K1LwtdbEg: { seconds: 91, poster: smsMarketing },
  _iHxb6AWg_4: { seconds: 157, poster: totemAutoatendimento },
  zNyJOw1fGB8: { seconds: 147, poster: totemCemiterio },
  o1ww6oLPWn4: { seconds: 61, poster: painelDeVelorio },
}

export type LibraryVideo = {
  readonly slug: string
  readonly name: string
  readonly summary: string
  readonly icon: IconName
  readonly videoId: string
  readonly groupSlug: string
  readonly groupName: string
  readonly seconds: number
  readonly poster: string
}

export type VideoFilter = { readonly slug: string; readonly name: string; readonly count: number }

export const VIDEO_LIBRARY: readonly LibraryVideo[] = SOLUTION_GROUPS.flatMap((group) =>
  group.solutions.flatMap((solution) => {
    const facts = solution.videoId ? VIDEO_FACTS[solution.videoId] : undefined
    if (!(solution.videoId && facts)) return []
    return [
      {
        slug: solution.slug,
        name: solution.name,
        summary: solution.summary,
        icon: solution.icon,
        videoId: solution.videoId,
        groupSlug: group.slug,
        groupName: group.name,
        seconds: facts.seconds,
        poster: facts.poster,
      },
    ]
  }),
)

export const ALL_VIDEOS = 'todos'

export const VIDEO_FILTERS: readonly VideoFilter[] = [
  { slug: ALL_VIDEOS, name: 'Todos', count: VIDEO_LIBRARY.length },
  ...SOLUTION_GROUPS.flatMap((group) => {
    const count = VIDEO_LIBRARY.filter((video) => video.groupSlug === group.slug).length
    return count > 0 ? [{ slug: group.slug, name: group.name, count }] : []
  }),
]

export const TOTAL_MINUTES = Math.round(
  VIDEO_LIBRARY.reduce((sum, video) => sum + video.seconds, 0) / 60,
)

export const LIVE_ONLY_COUNT = SOLUTION_COUNT - VIDEO_LIBRARY.length

export const formatDuration = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

export const isoDuration = (seconds: number): string =>
  `PT${Math.floor(seconds / 60)}M${seconds % 60}S`

const plural = (amount: number, singular: string, many: string): string =>
  `${amount} ${amount === 1 ? singular : many}`

export const spokenDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  const parts = [
    minutes > 0 ? plural(minutes, 'minuto', 'minutos') : '',
    rest > 0 ? plural(rest, 'segundo', 'segundos') : '',
  ].filter(Boolean)
  return parts.join(' e ')
}
