import { type Product, productHref } from '../../shared/config/products'
import { Icon } from '../../shared/ui/icon'
import { SiteLink } from '../../shared/ui/site-link'
import { ProductVisual } from './product-visual'

type ProductCardProps = {
  readonly product: Product
  readonly headingLevel?: 'h2' | 'h3'
}

export const ProductCard = ({ product, headingLevel = 'h3' }: ProductCardProps) => {
  const Heading = headingLevel
  return (
    <SiteLink className="ms-pd-tile" href={productHref(product.slug)}>
      <span className="ms-pd-tile__v">
        <ProductVisual slug={product.slug} decorative />
      </span>
      <span className="ms-pd-tile__c">
        <Heading className="ms-pd-tile__t">{product.name}</Heading>
        <span className="ms-pd-tile__p">{product.pitch}</span>
        <span className="ms-pd-tile__l">
          Conhecer o {product.name}
          <Icon name="arrow-right" size={18} />
        </span>
      </span>
    </SiteLink>
  )
}
