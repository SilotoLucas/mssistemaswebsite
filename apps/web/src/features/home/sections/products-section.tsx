import { PRODUCTS, PRODUCTS_HREF, type Product, productHref } from '../../../shared/config/products'
import { Aurora } from '../../../shared/ui/aurora'
import { Carousel, type CarouselSlide } from '../../../shared/ui/carousel'
import { Icon } from '../../../shared/ui/icon'
import { Reveal } from '../../../shared/ui/reveal'
import { SiteLink } from '../../../shared/ui/site-link'
import { ProductVisual } from '../../products'

const PRODUCTS_INTERVAL_MS = 9000

const ProductSlide = ({ product }: { readonly product: Product }) => (
  <SiteLink className="ms-pdh ms-glass" href={productHref(product.slug)}>
    <span className="ms-pdh__v">
      <ProductVisual slug={product.slug} decorative />
    </span>
    <span className="ms-pdh__c">
      <span className="ms-pdh__tag">{product.audience}</span>
      <span className="ms-pdh__t">{product.headline}</span>
      <span className="ms-pdh__p">{product.pitch}</span>
      <span className="ms-pdh__list">
        {product.bullets.map((bullet) => (
          <span key={bullet}>
            <Icon name="check" size={14} />
            {bullet}
          </span>
        ))}
      </span>
      <span className="ms-btn ms-btn--primary ms-pdh__go">
        Conhecer o {product.name}
        <Icon name="arrow-right" size={18} />
      </span>
    </span>
  </SiteLink>
)

const PRODUCT_SLIDES: readonly CarouselSlide[] = PRODUCTS.map((product) => ({
  key: product.slug,
  label: product.name,
  content: <ProductSlide product={product} />,
}))

export const ProductsSection = () => (
  <section className="ms-por ms-dark" id="produtos">
    <Aurora />
    <div className="ms-wrap">
      <Reveal className="ms-por__head">
        <p className="ms-eyebrow">Produtos MS</p>
        <h2>
          Três produtos para a sua empresa <span className="ms-grad">ir mais longe</span>
        </h2>
        <p className="ms-por__i">
          O SmallBusiness para começar rápido, o MS App para os seus associados e o MS Dashboard
          para decidir com números. Clique em um produto para conhecer em detalhes.
        </p>
      </Reveal>
      <Reveal>
        <Carousel
          label="Produtos da MS"
          slides={PRODUCT_SLIDES}
          className="ms-pdh__car"
          intervalMs={PRODUCTS_INTERVAL_MS}
          transition="fade"
        />
      </Reveal>
      <div className="ms-pdh__all">
        <SiteLink className="ms-btn ms-btn--glass" href={PRODUCTS_HREF}>
          Ver todos os produtos
        </SiteLink>
      </div>
    </div>
  </section>
)
