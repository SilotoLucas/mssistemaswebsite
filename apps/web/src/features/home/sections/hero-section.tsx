import type { ReactNode } from 'react'
import { Carousel, type CarouselSlide } from '../../../shared/ui/carousel'
import { Icon } from '../../../shared/ui/icon'
import { SiteLink } from '../../../shared/ui/site-link'
import { TextLink } from '../../../shared/ui/text-link'
import { WhatsappButton } from '../../../shared/ui/whatsapp-button'
import { ClientAppScreen } from '../screens/client-app-screen'
import { ClientAreaScreen } from '../screens/client-area-screen'
import './hero-section.css'

const WHATSAPP_POINTS = [
  'Sua mensagem chega direto à nossa equipe',
  'Quem atende conhece a rotina do setor',
  'Plantão em fins de semana e feriados',
] as const

const HeroSlide = ({
  tone,
  copy,
  visual,
}: {
  readonly tone: 'white' | 'mist' | 'fog'
  readonly copy: ReactNode
  readonly visual: ReactNode
}) => (
  <div className={`ms-hs ms-hs--${tone}`}>
    <div className="ms-wrap ms-hero__grid">
      <div className="ms-hero__copy">{copy}</div>
      {visual}
    </div>
  </div>
)

const HERO_SLIDES: readonly CarouselSlide[] = [
  {
    key: 'gestao',
    label: 'Gestão completa',
    content: (
      <HeroSlide
        tone="white"
        copy={
          <>
            <h1>Gestão completa para funerárias, planos, cemitérios e crematórios</h1>
            <p className="ms-lead">
              Do contrato à cobrança, do atendimento ao pós-venda: tudo integrado em um só sistema,
              com suporte especializado de quem conhece o setor desde 2005.
            </p>
            <div className="ms-hero__cta">
              <SiteLink className="ms-btn ms-btn--primary" href="#demonstracao">
                Solicitar demonstração
              </SiteLink>
              <SiteLink className="ms-btn ms-btn--secondary" href="/solucoes">
                Conhecer as soluções
              </SiteLink>
            </div>
          </>
        }
        visual={
          <aside className="ms-wacard" aria-label="Atendimento pelo WhatsApp">
            <span className="ms-wa-i">
              <Icon name="message" />
            </span>
            <p className="ms-wacard__t">Atendimento rápido pelo WhatsApp</p>
            <p>Fale direto com a equipe da MS, que conhece a rotina do seu setor.</p>
            <WhatsappButton block />
          </aside>
        }
      />
    ),
  },
  {
    key: 'whatsapp',
    label: 'Atendimento pelo WhatsApp',
    content: (
      <HeroSlide
        tone="mist"
        copy={
          <>
            <h2>Atendimento rápido pelo WhatsApp</h2>
            <p className="ms-lead">
              O setor não para, e o nosso atendimento também não. Fale com uma equipe especializada
              e resolva com rapidez.
            </p>
            <div className="ms-hero__cta">
              <WhatsappButton />
            </div>
          </>
        }
        visual={
          <ul className="ms-hs__points">
            {WHATSAPP_POINTS.map((point) => (
              <li key={point}>
                <Icon name="check" size={20} />
                {point}
              </li>
            ))}
          </ul>
        }
      />
    ),
  },
  {
    key: 'area-do-cliente',
    label: 'Área do Cliente',
    content: (
      <HeroSlide
        tone="fog"
        copy={
          <>
            <h2>Área do Cliente</h2>
            <p className="ms-lead">
              Dados, dependentes, boletos e carteirinha virtual em um só lugar para o seu associado.
            </p>
            <TextLink label="Conhecer a Área do Cliente" href="#area-do-cliente" />
          </>
        }
        visual={
          <div className="ms-shot">
            <ClientAreaScreen />
          </div>
        }
      />
    ),
  },
  {
    key: 'app-do-cliente',
    label: 'App do Cliente',
    content: (
      <HeroSlide
        tone="mist"
        copy={
          <>
            <h2>App do Cliente</h2>
            <p className="ms-lead">
              Carteirinha digital, segunda via do boleto e avisos na palma da mão do seu associado.
            </p>
            <TextLink label="Conhecer o App do Cliente" href="#area-do-cliente" />
          </>
        }
        visual={
          <div className="ms-shot ms-hs__phone">
            <ClientAppScreen />
          </div>
        }
      />
    ),
  },
]

export const HeroSection = () => (
  <div className="ms-hero ms-hero--car">
    <Carousel label="Destaques da MS Sistemas" slides={HERO_SLIDES} barClassName="ms-wrap" />
  </div>
)
