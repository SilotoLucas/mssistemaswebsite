import { PRODUCTS, type Product, productHref } from '../../../shared/config/products'
import { DEMO_HREF } from '../../../shared/config/site-config'
import { solutionHref } from '../../../shared/config/solutions-catalog'
import { Aurora } from '../../../shared/ui/aurora'
import { Carousel, type CarouselSlide } from '../../../shared/ui/carousel'
import { Icon } from '../../../shared/ui/icon'
import { Reveal } from '../../../shared/ui/reveal'
import { SiteLink } from '../../../shared/ui/site-link'
import { ProductThumb, ProductVisual } from '../../products'

const PRODUCTS_INTERVAL_MS = 9000
const FEATURES_SHOWN = 4

const FeatureTile = ({ feature }: { readonly feature: Product['features'][number] }) => {
  const body = (
    <>
      <span className="ms-pdh__fi">
        <Icon name={feature.icon} size={18} />
      </span>
      <span className="ms-pdh__ft">{feature.title}</span>
    </>
  )
  return (
    <li>
      {feature.solution ? (
        <SiteLink className="ms-pdh__f is-link" href={solutionHref(feature.solution)}>
          {body}
        </SiteLink>
      ) : (
        <span className="ms-pdh__f">{body}</span>
      )}
    </li>
  )
}

const ProductSlide = ({ product }: { readonly product: Product }) => (
  <div className={`ms-pdh ms-pdh--${product.slug}`}>
    <div className="ms-pdh__stage">
      <span className="ms-pdh__rings" aria-hidden="true" />
      <ProductVisual slug={product.slug} decorative />
    </div>
    <div className="ms-pdh__c">
      <p className="ms-pdh__tag">
        <ProductThumb slug={product.slug} className="ms-pdh__logo" />
        {product.name}
      </p>
      <h3 className="ms-pdh__t">{product.headline}</h3>
      <p className="ms-pdh__p">{product.pitch}</p>
      <ul className="ms-pdh__feats">
        {product.features.slice(0, FEATURES_SHOWN).map((feature) => (
          <FeatureTile feature={feature} key={feature.title} />
        ))}
      </ul>
      <div className="ms-pdh__cta">
        <SiteLink className="ms-btn ms-btn--primary ms-pdh__go" href={productHref(product.slug)}>
          Conhecer o {product.name}
          <Icon name="arrow-right" size={18} />
        </SiteLink>
        <SiteLink className="ms-pdh__demo" href={DEMO_HREF}>
          Solicitar demonstração
        </SiteLink>
      </div>
    </div>
  </div>
)

const ProductTab = ({ product }: { readonly product: Product }) => (
  <span className="ms-pdh__tab">
    <ProductThumb slug={product.slug} className="ms-pdh__tabi" />
    <span className="ms-pdh__tabt">
      <strong>{product.name}</strong>
      <small>{product.audience}</small>
    </span>
  </span>
)

const PRODUCT_SLIDES: readonly CarouselSlide[] = PRODUCTS.map((product) => ({
  key: product.slug,
  label: product.name,
  content: <ProductSlide product={product} />,
}))

const PRODUCT_TABS = PRODUCTS.map((product) => <ProductTab product={product} key={product.slug} />)

export const ProductsSection = () => (
  <section className="ms-por ms-dark" id="solucoes-digitais">
    <Aurora />
    <div className="ms-wrap">
      <Reveal className="ms-por__head">
        <div className="ms-por__ht">
          <p className="ms-eyebrow">Soluções digitais</p>
          <h2>
            Três soluções digitais para a sua empresa <span className="ms-grad">ir mais longe</span>
          </h2>
        </div>
        <p className="ms-por__i">
          O SmallBusiness para começar rápido, o MS App para os seus associados e o MS Dashboard
          para decidir com números. Escolha uma solução para conhecer em detalhes.
        </p>
      </Reveal>
      <Reveal>
        <Carousel
          label="Soluções digitais da MS"
          slides={PRODUCT_SLIDES}
          tabs={PRODUCT_TABS}
          className="ms-pdh__car"
          intervalMs={PRODUCTS_INTERVAL_MS}
          transition="fade"
        />
      </Reveal>
    </div>
  </section>
)
