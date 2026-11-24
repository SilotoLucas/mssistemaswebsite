import type { ReactNode } from 'react'
import { Navigate, useParams } from 'react-router'
import { findProduct, PRODUCTS, PRODUCTS_HREF, type Product } from '../../shared/config/products'
import { DEMO_HREF } from '../../shared/config/site-config'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { Reveal } from '../../shared/ui/reveal'
import { SiteLink } from '../../shared/ui/site-link'
import { ProductCard } from './product-card'
import {
  DetailsSection,
  FeaturesSection,
  ProductClosing,
  ReasonsSection,
  StepsSection,
  VideoSection,
} from './product-sections'
import { ProductVisual } from './product-visual'

type SectionRender = (product: Product, tone: string) => ReactNode

const TONES = ['', 'ms-section--mist'] as const

const OtherProducts = ({ product, tone }: { readonly product: Product; readonly tone: string }) => (
  <section className={`ms-section ${tone}`} id="outros-produtos">
    <div className="ms-wrap">
      <Reveal className="ms-pd-head">
        <p className="ms-eyebrow ms-eyebrow--light">Produtos MS</p>
        <h2 className="ms-h2">
          Conheça também <span className="ms-grad ms-grad--deep">os outros produtos</span>
        </h2>
      </Reveal>
      <ul className="ms-pd-tiles">
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

const sectionsFor = (product: Product): readonly SectionRender[] => [
  (item, tone) => <FeaturesSection product={item} tone={tone} key="recursos" />,
  (item, tone) => <DetailsSection product={item} tone={tone} key="detalhes" />,
  ...(product.steps
    ? [(item: Product, tone: string) => <StepsSection product={item} tone={tone} key="passos" />]
    : []),
  (item, tone) => <ReasonsSection product={item} tone={tone} key="vantagens" />,
  ...(product.videoId
    ? [(item: Product, tone: string) => <VideoSection product={item} tone={tone} key="video" />]
    : []),
  (item, tone) => <OtherProducts product={item} tone={tone} key="outros" />,
]

const ProductContent = ({ product }: { readonly product: Product }) => (
  <main>
    <title>{`${product.name} | MS Sistemas`}</title>
    <meta name="description" content={`${product.name}: ${product.pitch}`} />
    <PageHero
      parent={{ label: 'Produtos', href: PRODUCTS_HREF }}
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
    {sectionsFor(product).map((render, index) => render(product, TONES[index % 2] ?? ''))}
    <ProductClosing product={product} />
  </main>
)

export const ProductPage = () => {
  const { slug } = useParams()
  const product = findProduct(slug)
  if (!product) return <Navigate to={PRODUCTS_HREF} replace />
  return <ProductContent product={product} key={product.slug} />
}
