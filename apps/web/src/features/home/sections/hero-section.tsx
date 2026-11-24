import { DEMO_HREF } from '../../../shared/config/site-config'
import { Aurora } from '../../../shared/ui/aurora'
import { Icon } from '../../../shared/ui/icon'
import { SiteLink } from '../../../shared/ui/site-link'
import { HeroShowcase } from './hero-showcase'
import { useStageTilt } from './use-stage-tilt'

const TRUST_POINTS = [
  'Suporte especializado no setor',
  'Plantão em fins de semana e feriados',
  'Atendimento pelo WhatsApp',
] as const

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
            <SiteLink className="ms-btn ms-btn--primary ms-btn--lg" href={DEMO_HREF}>
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
        <HeroShowcase />
      </div>
    </section>
  )
}
