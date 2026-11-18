import { Aurora } from '../../../shared/ui/aurora'
import { Icon, type IconName } from '../../../shared/ui/icon'
import { SiteLink } from '../../../shared/ui/site-link'
import { ClientAppScreen } from '../screens/client-app-screen'
import { ClientAreaScreen } from '../screens/client-area-screen'
import { useStageTilt } from './use-stage-tilt'

type Chip = {
  readonly icon: IconName
  readonly title: string
  readonly caption: string
  readonly className: string
}

const TRUST_POINTS = [
  'Suporte especializado no setor',
  'Plantão em fins de semana e feriados',
  'Atendimento pelo WhatsApp',
] as const

const CHIPS: readonly Chip[] = [
  {
    icon: 'credit-card',
    title: 'Carteirinha digital',
    caption: 'App do Cliente',
    className: 'ms-chip--a',
  },
  {
    icon: 'receipt',
    title: 'Segunda via do boleto',
    caption: 'Área do Cliente',
    className: 'ms-chip--b',
  },
  {
    icon: 'message',
    title: 'Atendimento rápido',
    caption: 'Pelo WhatsApp',
    className: 'ms-chip--c',
  },
]

export const HeroSection = () => {
  const heroRef = useStageTilt<HTMLElement>()

  return (
    <section className="ms-hero ms-dark" ref={heroRef}>
      <Aurora />
      <div className="ms-wrap ms-hero__grid">
        <div className="ms-hero__copy">
          <p className="ms-eyebrow ms-hero__tag">
            <span className="ms-pulse" aria-hidden="true" />
            Software de gestão desde 2005
          </p>
          <h1>
            Gestão completa para{' '}
            <span className="ms-grad">funerárias, planos, cemitérios e crematórios</span>
          </h1>
          <p className="ms-lead">
            Do contrato à cobrança, do atendimento ao pós-venda: tudo integrado em um só sistema,
            com suporte especializado de quem conhece o setor.
          </p>
          <div className="ms-hero__cta">
            <SiteLink className="ms-btn ms-btn--primary ms-btn--lg" href="#demonstracao">
              Solicitar demonstração
              <Icon name="arrow-right" size={20} />
            </SiteLink>
            <SiteLink className="ms-btn ms-btn--glass ms-btn--lg" href="/solucoes">
              Conhecer as soluções
            </SiteLink>
          </div>
          <ul className="ms-hero__trust">
            {TRUST_POINTS.map((point) => (
              <li key={point}>
                <Icon name="check" size={16} />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="ms-stage" aria-hidden="true">
          <span className="ms-stage__glow" />
          <div className="ms-stage__pc">
            <div className="ms-shot">
              <ClientAreaScreen />
            </div>
          </div>
          <div className="ms-stage__phone">
            <div className="ms-shot">
              <ClientAppScreen />
            </div>
          </div>
          {CHIPS.map((chip) => (
            <div className={`ms-chip ${chip.className}`} key={chip.title}>
              <span className="ms-chip__i">
                <Icon name={chip.icon} size={20} />
              </span>
              <span className="ms-chip__t">
                <strong>{chip.title}</strong>
                <small>{chip.caption}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
