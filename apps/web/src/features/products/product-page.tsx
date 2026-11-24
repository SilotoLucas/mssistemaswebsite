import type { ReactNode } from 'react'
import { Navigate, useParams } from 'react-router'
import { findProduct, PRODUCTS, PRODUCTS_HREF, type Product } from '../../shared/config/products'
import { DEMO_HREF, DIGITAL_SOLUTIONS } from '../../shared/config/site-config'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { Reveal } from '../../shared/ui/reveal'
import { SiteLink } from '../../shared/ui/site-link'
import { ProductCard } from './product-card'
import {
  AudienceSection,
  FactsSection,
  FeaturesSection,
  ProductClosing,
  ReasonsSection,
  ShowcaseSection,
  VideoSection,
} from './product-sections'
import { ProductVisual } from './product-visual'

type LightSection = (product: Product, tone: string) => ReactNode

const TONES = ['', 'ms-section--mist'] as const

const OtherProducts = ({ product, tone }: { readonly product: Product; readonly tone: string }) => (
  <section className={`ms-section ${tone}`} id="outras-solucoes">
    <div className="ms-wrap">
      <Reveal className="ms-pd-head">
        <p className="ms-eyebrow ms-eyebrow--light">{DIGITAL_SOLUTIONS.label}</p>
        <h2 className="ms-h2">
          Conheça também <span className="ms-grad ms-grad--deep">as outras soluções</span>
        </h2>
      </Reveal>
      <ul className="ms-pd-others">
        {PRODUCTS.filter((other) => other.slug !== product.slug).map((other, index) => (
          <li key={other.slug}>
            <Reveal delay={index * 100}>
              <ProductCard product={other} />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

const lightSections = (product: Product): readonly LightSection[] => [
  (item, tone) => <FeaturesSection product={item} tone={tone} key="recursos" />,
  ...(product.slug === 'app' || !product.steps
    ? []
    : [
        (item: Product, tone: string) => (
          <AudienceSection product={item} tone={tone} key="para-quem" />
        ),
      ]),
]

const closingSections = (product: Product): readonly LightSection[] => [
  (item, tone) => <ReasonsSection product={item} tone={tone} key="vantagens" />,
  ...(product.videoId
    ? [(item: Product, tone: string) => <VideoSection product={item} tone={tone} key="video" />]
    : []),
  (item, tone) => <OtherProducts product={item} tone={tone} key="outros" />,
]

const ProductBody = ({ product }: { readonly product: Product }) => {
  const [features, ...afterShowcase] = lightSections(product)
  const ordered: readonly (LightSection | 'showcase')[] = [
    ...(features ? [features] : []),
    'showcase',
    ...afterShowcase,
    ...closingSections(product),
  ]
  let lightIndex = 0
  return ordered.map((section) => {
    if (section === 'showcase') return <ShowcaseSection product={product} key="detalhes" />
    const tone = TONES[lightIndex % 2] ?? ''
    lightIndex += 1
    return section(product, tone)
  })
}

const ProductContent = ({ product }: { readonly product: Product }) => (
  <main>
    <title>{`${product.name} | MS Sistemas`}</title>
    <meta name="description" content={`${product.name}: ${product.pitch}`} />
    <PageHero
      parent={{ label: DIGITAL_SOLUTIONS.label, href: PRODUCTS_HREF }}
      crumb={product.name}
      title={product.headline}
      lead={product.lead}
      actions={
        <>
          <SiteLink className="ms-btn ms-btn--primary ms-btn--lg" href={DEMO_HREF}>
            Solicitar demonstração
          </SiteLink>
          <SiteLink className="ms-btn ms-btn--whatsapp ms-btn--lg" href={product.whatsappHref}>
            <Icon name="message" size={20} />
            Chamar no WhatsApp
          </SiteLink>
        </>
      }
      aside={
        <div className="ms-pd-hero">
          <ProductVisual slug={product.slug} />
        </div>
      }
    />
    <FactsSection product={product} />
    <ProductBody product={product} />
    <ProductClosing product={product} />
  </main>
)

export const ProductPage = () => {
  const { slug } = useParams()
  const product = findProduct(slug)
  if (!product) return <Navigate to={PRODUCTS_HREF} replace />
  return <ProductContent product={product} key={product.slug} />
}
