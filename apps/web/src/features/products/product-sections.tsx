import type { CSSProperties } from 'react'
import type { Product, ProductPoint } from '../../shared/config/products'
import { DEMO_HREF } from '../../shared/config/site-config'
import { Aurora } from '../../shared/ui/aurora'
import { Icon } from '../../shared/ui/icon'
import { PhoneFrame } from '../../shared/ui/phone-frame'
import { Reveal } from '../../shared/ui/reveal'
import { SiteLink } from '../../shared/ui/site-link'
import { YoutubeVideo } from '../../shared/ui/youtube-video'
import { APP_SCREENS, ProductVisual } from './product-visual'

type SectionProps = {
  readonly product: Product
  readonly tone: string
}

type HeadProps = {
  readonly eyebrow: string
  readonly title: string
  readonly highlight?: string
}

const SectionHead = ({ eyebrow, title, highlight }: HeadProps) => (
  <Reveal className="ms-pd-head">
    <p className="ms-eyebrow ms-eyebrow--light">{eyebrow}</p>
    <h2 className="ms-h2">
      {title}
      {highlight ? (
        <>
          {' '}
          <span className="ms-grad ms-grad--deep">{highlight}</span>
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

const PointCards = ({ points }: { readonly points: readonly ProductPoint[] }) => (
  <ul className="ms-pd-grid" style={{ '--pd-cols': columnsFor(points.length) } as CSSProperties}>
    {points.map((point, index) => (
      <li key={point.title}>
        <Reveal className="ms-pd-card" delay={(index % 4) * 80}>
          <span className="ms-pd-card__i">
            <Icon name={point.icon} size={24} />
          </span>
          <h3>{point.title}</h3>
          <p>{point.text}</p>
        </Reveal>
      </li>
    ))}
  </ul>
)

export const FeaturesSection = ({ product, tone }: SectionProps) => (
  <section className={`ms-section ${tone}`} id="recursos">
    <div className="ms-wrap">
      <SectionHead eyebrow={product.name} title={product.featuresTitle} />
      <PointCards points={product.features} />
    </div>
  </section>
)

const Checklist = ({ product }: { readonly product: Product }) => (
  <Reveal className="ms-pd-check" delay={120}>
    <h3>{product.checklistTitle}</h3>
    <ul>
      {product.checklist.map((item) => (
        <li key={item}>
          <span>
            <Icon name="check" size={14} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  </Reveal>
)

const AppScreens = () => (
  <ul className="ms-pd-screens">
    {APP_SCREENS.map((screen, index) => (
      <li key={screen.key}>
        <Reveal className="ms-pd-screen" delay={index * 100}>
          <PhoneFrame
            src={screen.src}
            alt={screen.alt}
            width={screen.width}
            height={screen.height}
            lazy
          />
          <p>{screen.title}</p>
        </Reveal>
      </li>
    ))}
  </ul>
)

export const DetailsSection = ({ product, tone }: SectionProps) => (
  <section className={`ms-section ${tone}`} id="detalhes">
    <div className="ms-wrap">
      {product.slug === 'app' ? (
        <>
          <SectionHead
            eyebrow="Telas do app"
            title="Feito para o"
            highlight="celular do associado"
          />
          <AppScreens />
          <div className="ms-pd-solo">
            <Checklist product={product} />
          </div>
        </>
      ) : (
        <div className="ms-pd-split">
          <Reveal className="ms-pd-split__v">
            <ProductVisual slug={product.slug} />
          </Reveal>
          <div className="ms-pd-split__c">
            <SectionHead
              eyebrow="Em detalhes"
              title={product.slug === 'dashboard' ? 'Gráficos para' : 'Tudo o que a rotina'}
              highlight={product.slug === 'dashboard' ? 'cada área da empresa' : 'pede'}
            />
            <Checklist product={product} />
          </div>
        </div>
      )}
    </div>
  </section>
)

export const StepsSection = ({ product, tone }: SectionProps) => (
  <section className={`ms-section ${tone}`} id="como-funciona">
    <div className="ms-wrap">
      <SectionHead eyebrow={product.name} title={product.stepsTitle ?? ''} />
      <ol className="ms-pd-steps">
        {(product.steps ?? []).map((step, index) => (
          <li key={step.title}>
            <Reveal className="ms-pd-step" delay={index * 90}>
              <span className="ms-pd-step__n" aria-hidden="true">
                {index + 1}
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

export const ReasonsSection = ({ product, tone }: SectionProps) => (
  <section className={`ms-section ${tone}`} id="vantagens">
    <div className="ms-wrap">
      <SectionHead eyebrow="Vantagens" title={product.reasonsTitle} />
      <PointCards points={product.reasons} />
    </div>
  </section>
)

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
