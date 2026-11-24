import { PRODUCTS, type Product, productHref } from '../../../shared/config/products'
import { Aurora } from '../../../shared/ui/aurora'
import { Carousel, type CarouselSlide } from '../../../shared/ui/carousel'
import { Icon } from '../../../shared/ui/icon'
import { Reveal } from '../../../shared/ui/reveal'
import { SiteLink } from '../../../shared/ui/site-link'
import { ProductVisual } from '../../products'

const PRODUCTS_INTERVAL_MS = 9000

const ProductSlide = ({ product }: { readonly product: Product }) => (
  <div className="ms-pdh ms-glass">
    <div className="ms-pdh__v">
      <ProductVisual slug={product.slug} decorative />
    </div>
    <div className="ms-pdh__c">
      <p className="ms-pdh__tag">{product.audience}</p>
      <h3 className="ms-pdh__t">{product.headline}</h3>
      <p className="ms-pdh__p">{product.pitch}</p>
      <ul className="ms-pdh__list">
        {product.bullets.map((bullet) => (
          <li key={bullet}>
            <Icon name="check" size={14} />
            {bullet}
          </li>
        ))}
      </ul>
      <SiteLink className="ms-btn ms-btn--primary ms-pdh__go" href={productHref(product.slug)}>
        Conhecer o {product.name}
        <Icon name="arrow-right" size={18} />
      </SiteLink>
    </div>
  </div>
)

const PRODUCT_SLIDES: readonly CarouselSlide[] = PRODUCTS.map((product) => ({
  key: product.slug,
  label: product.name,
  content: <ProductSlide product={product} />,
}))

export const ProductsSection = () => (
  <section className="ms-por ms-dark" id="solucoes-digitais">
    <Aurora />
    <div className="ms-wrap">
      <Reveal className="ms-por__head">
        <p className="ms-eyebrow">Soluções digitais</p>
        <h2>
          Três soluções digitais para a sua empresa <span className="ms-grad">ir mais longe</span>
        </h2>
        <p className="ms-por__i">
          O SmallBusiness para começar rápido, o MS App para os seus associados e o MS Dashboard
          para decidir com números. Escolha uma solução para conhecer em detalhes.
        </p>
      </Reveal>
      <Reveal>
        <Carousel
          label="Soluções digitais da MS"
          slides={PRODUCT_SLIDES}
          className="ms-pdh__car"
          intervalMs={PRODUCTS_INTERVAL_MS}
          transition="fade"
        />
      </Reveal>
    </div>
  </section>
)
