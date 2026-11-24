import type { CSSProperties, ReactNode } from 'react'
import type { Product, ProductPoint } from '../../shared/config/products'
import { DEMO_HREF } from '../../shared/config/site-config'
import { SMALL_BUSINESS_PERKS } from '../../shared/config/small-business'
import { solutionHref } from '../../shared/config/solutions-catalog'
import { Aurora } from '../../shared/ui/aurora'
import { BrowserFrame } from '../../shared/ui/browser-frame'
import { Icon } from '../../shared/ui/icon'
import { Reveal } from '../../shared/ui/reveal'
import { SiteLink } from '../../shared/ui/site-link'
import { trackPointer } from '../../shared/ui/spotlight'
import { TextLink } from '../../shared/ui/text-link'
import { YoutubeVideo } from '../../shared/ui/youtube-video'
import { AppTour } from './app-tour'
import { DASHBOARD_ADDRESS, DASHBOARD_SHOT } from './product-assets'

type SectionProps = {
  readonly product: Product
  readonly tone: string
}

type HeadProps = {
  readonly eyebrow: string
  readonly title: string
  readonly highlight?: string
  readonly dark?: boolean
}

const SectionHead = ({ eyebrow, title, highlight, dark = false }: HeadProps) => (
  <Reveal className="ms-pd-head">
    <p className={`ms-eyebrow${dark ? '' : ' ms-eyebrow--light'}`}>{eyebrow}</p>
    <h2 className="ms-h2">
      {title}
      {highlight ? (
        <>
          {' '}
          <span className={dark ? 'ms-grad' : 'ms-grad ms-grad--deep'}>{highlight}</span>
        </>
      ) : null}
    </h2>
  </Reveal>
)

const columnsFor = (count: number): number => {
  if (count % 4 === 0) return 4
  if (count % 3 === 0) return 3
  return count === 5 ? 5 : 3
}

const Checks = ({
  items,
  className,
}: {
  readonly items: readonly string[]
  readonly className: string
}) => (
  <ul className={className}>
    {items.map((item) => (
      <li key={item}>
        <span>
          <Icon name="check" size={14} />
        </span>
        {item}
      </li>
    ))}
  </ul>
)

export const FactsSection = ({ product }: { readonly product: Product }) => (
  <section className="ms-pd-facts" id="destaques">
    <div className="ms-wrap">
      <Reveal className="ms-pd-facts__panel">
        <Checks items={product.bullets} className="ms-pd-facts__list" />
        {product.solution ? (
          <TextLink label="Ver na tela de soluções" href={solutionHref(product.solution)} />
        ) : null}
      </Reveal>
    </div>
  </section>
)

const PointCard = ({ point, index }: { readonly point: ProductPoint; readonly index: number }) => (
  <Reveal className="ms-pd-cardw" delay={(index % 4) * 80}>
    <article className="ms-pd-card ms-spot" onPointerMove={trackPointer}>
      <span className="ms-pd-card__i">
        <Icon name={point.icon} size={24} />
      </span>
      <h3>
        {point.solution ? (
          <SiteLink className="ms-pd-card__open" href={solutionHref(point.solution)}>
            {point.title}
          </SiteLink>
        ) : (
          point.title
        )}
      </h3>
      <p>{point.text}</p>
      {point.solution ? (
        <span className="ms-pd-card__more" aria-hidden="true">
          Ver na tela de soluções
          <Icon name="arrow-right" size={16} />
        </span>
      ) : null}
    </article>
  </Reveal>
)

export const FeaturesSection = ({ product, tone }: SectionProps) => (
  <section className={`ms-section ${tone}`} id="recursos">
    <div className="ms-wrap">
      <SectionHead eyebrow={product.name} title={product.featuresTitle} />
      <ul
        className="ms-pd-grid"
        style={{ '--pd-cols': columnsFor(product.features.length) } as CSSProperties}
      >
        {product.features.map((point, index) => (
          <li key={point.title}>
            <PointCard point={point} index={index} />
          </li>
        ))}
      </ul>
    </div>
  </section>
)

const Shell = ({ children }: { readonly children: ReactNode }) => (
  <section className="ms-section ms-dark ms-pd-show" id="detalhes">
    <Aurora />
    <div className="ms-wrap">{children}</div>
  </section>
)

const SmallBusinessShowcase = ({ product }: { readonly product: Product }) => (
  <Shell>
    <SectionHead
      dark
      eyebrow="Em um relance"
      title="O pacote enxuto,"
      highlight="pronto para usar"
    />
    <ul className="ms-pd-perks">
      {SMALL_BUSINESS_PERKS.map((perk, index) => (
        <li key={perk.label}>
          <Reveal className="ms-pd-perk ms-glass" delay={index * 80}>
            <span className="ms-pd-perk__i">
              <Icon name={perk.icon} size={24} />
            </span>
            <strong>{perk.label}</strong>
          </Reveal>
        </li>
      ))}
    </ul>
    <Reveal className="ms-pd-day ms-glass" delay={120}>
      <h3>{product.checklistTitle}</h3>
      <Checks items={product.checklist} className="ms-pd-day__list" />
    </Reveal>
  </Shell>
)

const DashboardShowcase = ({ product }: { readonly product: Product }) => (
  <Shell>
    <SectionHead
      dark
      eyebrow="Em detalhes"
      title="Gráficos para"
      highlight="cada área da empresa"
    />
    <Reveal className="ms-pd-browser">
      <BrowserFrame
        src={DASHBOARD_SHOT.src}
        alt={DASHBOARD_SHOT.alt}
        width={DASHBOARD_SHOT.width}
        height={DASHBOARD_SHOT.height}
        address={DASHBOARD_ADDRESS}
        lazy
      />
    </Reveal>
    <Reveal className="ms-pd-areas" delay={120}>
      <h3>{product.checklistTitle}</h3>
      <Checks items={product.checklist} className="ms-pd-areas__list" />
    </Reveal>
  </Shell>
)

const AppShowcase = ({ product }: { readonly product: Product }) => (
  <Shell>
    <SectionHead dark eyebrow="Telas do app" title="Como o associado" highlight="usa o MS App" />
    <AppTour steps={product.steps ?? []} />
    <Reveal className="ms-pd-areas" delay={120}>
      <h3>{product.checklistTitle}</h3>
      <Checks items={product.checklist} className="ms-pd-areas__list" />
    </Reveal>
  </Shell>
)

export const ShowcaseSection = ({ product }: { readonly product: Product }) => {
  if (product.slug === 'app') return <AppShowcase product={product} />
  if (product.slug === 'dashboard') return <DashboardShowcase product={product} />
  return <SmallBusinessShowcase product={product} />
}

export const AudienceSection = ({ product, tone }: SectionProps) => (
  <section className={`ms-section ${tone}`} id="para-quem">
    <div className="ms-wrap">
      <SectionHead eyebrow={product.name} title={product.stepsTitle ?? ''} />
      <ol className="ms-pd-steps">
        {(product.steps ?? []).map((step, index) => (
          <li key={step.title}>
            <Reveal className="ms-pd-step" delay={index * 90}>
              <span className="ms-pd-step__n ms-grad ms-grad--deep" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export const ReasonsSection = ({ product, tone }: SectionProps) => {
  const count = product.reasons.length
  const style = {
    '--pd-md': count % 2 === 0 ? 2 : 1,
    '--pd-lg': count % 3 === 0 ? 3 : 2,
  } as CSSProperties
  return (
    <section className={`ms-section ${tone}`} id="vantagens">
      <div className="ms-wrap">
        <SectionHead eyebrow="Vantagens" title={product.reasonsTitle} />
        <Reveal>
          <ul className="ms-pd-reasons" style={style}>
            {product.reasons.map((reason) => (
              <li key={reason.title}>
                <span className="ms-pd-reason__i">
                  <Icon name={reason.icon} size={22} />
                </span>
                <div>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export const VideoSection = ({ product, tone }: SectionProps) => (
  <section className={`ms-section ${tone}`} id="video">
    <div className="ms-wrap ms-pd-video">
      <SectionHead eyebrow="Vídeo" title={`Veja o ${product.name}`} highlight="funcionando" />
      <Reveal className="ms-pd-video__frame">
        <YoutubeVideo videoId={product.videoId ?? ''} title={`Apresentação do ${product.name}`} />
      </Reveal>
    </div>
  </section>
)

export const ProductClosing = ({ product }: { readonly product: Product }) => (
  <section className="ms-section ms-dark ms-pd-final" id="fechamento">
    <Aurora />
    <div className="ms-wrap ms-pd-final__in">
      <Reveal className="ms-pd-final__c">
        <p className="ms-eyebrow">{product.name}</p>
        <h2 className="ms-h2">
          Quer ver o {product.name} <span className="ms-grad">na sua empresa?</span>
        </h2>
        <p>Peça uma demonstração ou fale agora com um consultor da MS pelo WhatsApp.</p>
        <div className="ms-pd-final__cta">
          <SiteLink className="ms-btn ms-btn--primary ms-btn--lg" href={DEMO_HREF}>
            Solicitar demonstração
          </SiteLink>
          <SiteLink className="ms-btn ms-btn--whatsapp ms-btn--lg" href={product.whatsappHref}>
            <Icon name="message" size={20} />
            Chamar no WhatsApp
          </SiteLink>
        </div>
      </Reveal>
    </div>
  </section>
)
