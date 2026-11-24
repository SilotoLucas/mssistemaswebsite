import { PRODUCTS, type Product, productHref } from '../../../shared/config/products'
import { Carousel, type CarouselSlide } from '../../../shared/ui/carousel'
import { SiteLink } from '../../../shared/ui/site-link'
import { ProductVisual } from '../../products'

const SHOWCASE_INTERVAL_MS = 11000

const ShowcaseSlide = ({ product }: { readonly product: Product }) => (
  <div className="ms-hs">
    <div className="ms-hs__stage">
      <ProductVisual slug={product.slug} decorative />
    </div>
    <div className="ms-hs__cap">
      <p className="ms-hs__tag">{product.name}</p>
      <p className="ms-hs__t">{product.headline}</p>
      <p className="ms-hs__p">
        {product.pitch}{' '}
        <SiteLink className="ms-hs__link" href={productHref(product.slug)}>
          Conhecer o {product.name}
        </SiteLink>
      </p>
    </div>
  </div>
)

const SHOWCASE_SLIDES: readonly CarouselSlide[] = PRODUCTS.map((product) => ({
  key: product.slug,
  label: product.name,
  content: <ShowcaseSlide product={product} />,
}))

export const HeroShowcase = () => (
  <Carousel
    label="Soluções digitais da MS"
    slides={SHOWCASE_SLIDES}
    className="ms-hero__car"
    intervalMs={SHOWCASE_INTERVAL_MS}
    transition="fade"
  />
)
