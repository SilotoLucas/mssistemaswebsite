import { DEMO_HREF, whatsappMessageHref } from '../../shared/config/site-config'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { SiteLink } from '../../shared/ui/site-link'
import { DemoRequestSection } from '../demo-request'
import { useVideoTheater } from './use-video-theater'
import { LIVE_ONLY_COUNT, TOTAL_MINUTES, VIDEO_FILTERS, VIDEO_LIBRARY } from './video-library'
import { VideoQueue } from './video-queue'
import { VideoStage } from './video-stage'
import './videos.css'

const COPY_MESSAGES = {
  idle: '',
  copied: 'Link copiado. Agora é só colar na conversa.',
  failed: 'Não foi possível copiar. Use o endereço da barra do navegador.',
} as const

const STATS = [
  { value: VIDEO_LIBRARY.length, label: 'vídeos de apresentação' },
  { value: TOTAL_MINUTES, label: 'minutos de sistema em ação' },
  { value: VIDEO_FILTERS.length - 1, label: 'áreas da operação' },
] as const

const pad = (value: number): string => String(value).padStart(2, '0')

export const VideosPage = () => {
  const theater = useVideoTheater()
  const { current } = theater

  return (
    <main>
      <title>Vídeos | MS Sistemas</title>
      <meta
        name="description"
        content="Assista aos vídeos de apresentação dos sistemas da MS: planos funerários, funerárias, cemitérios, totens, dashboard e mais."
      />
      <PageHero
        crumb="Vídeos"
        title="Os sistemas da MS em ação"
        lead="Vídeos curtos para conhecer cada módulo antes de conversar com um consultor. Escolha um e assista aqui mesmo."
        showActions={false}
        aside={
          <dl className="ms-vd-stats">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <div className={`ms-vd${theater.cinema ? ' is-cinema' : ''}`}>
          <div className="ms-vd__main">
            <VideoStage video={current} playing={theater.playing} onPlay={theater.play} />
            <div className="ms-vd-info">
              <p className="ms-vd-info__meta">
                <span className="ms-vd-info__n">
                  {pad(theater.position)}
                  <span aria-hidden="true"> / </span>
                  <span className="ms-sr"> de </span>
                  {pad(VIDEO_LIBRARY.length)}
                </span>
                <span>{current.groupName}</span>
              </p>
              <h2>{current.name}</h2>
              <p className="ms-vd-info__sum">{current.summary}</p>
              <div className="ms-vd-info__cta">
                <SiteLink
                  className="ms-btn ms-btn--whatsapp ms-btn--sm"
                  href={whatsappMessageHref(
                    `Olá! Assisti ao vídeo de ${current.name} no site da MS e quero saber mais.`,
                  )}
                >
                  <Icon name="message" size={18} />
                  Tirar dúvidas no WhatsApp
                </SiteLink>
                <SiteLink
                  className="ms-btn ms-btn--glass ms-btn--sm"
                  href={`/solucoes#${current.slug}`}
                >
                  Ver o que o sistema faz
                </SiteLink>
              </div>
              <div className="ms-vd-tools">
                <button className="ms-vd-tool" type="button" onClick={theater.next}>
                  <Icon name="skip-forward" size={18} />
                  Próximo vídeo
                </button>
                <button className="ms-vd-tool" type="button" onClick={theater.copyLink}>
                  <Icon name={theater.copy === 'copied' ? 'check' : 'link'} size={18} />
                  Copiar link
                </button>
                <button
                  className="ms-vd-tool ms-vd-tool--cinema"
                  type="button"
                  aria-pressed={theater.cinema}
                  onClick={theater.toggleCinema}
                >
                  <Icon name="maximize" size={18} />
                  Modo cinema
                </button>
                <span className="ms-vd-tools__status" role="status">
                  {COPY_MESSAGES[theater.copy]}
                </span>
              </div>
            </div>
          </div>
          <div className="ms-vd__side">
            <VideoQueue
              queue={theater.queue}
              currentSlug={current.slug}
              playing={theater.playing}
              filter={theater.filter}
              onFilter={theater.setFilter}
              onSelect={(slug) => theater.select(slug, true)}
            />
            <p className="ms-vd-live">
              Outros {LIVE_ONLY_COUNT} módulos são apresentados ao vivo por um consultor.{' '}
              <SiteLink href={DEMO_HREF}>Pedir uma demonstração</SiteLink>
            </p>
          </div>
        </div>
      </PageHero>
      <DemoRequestSection />
    </main>
  )
}
