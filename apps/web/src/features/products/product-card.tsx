import { type Product, productHref } from '../../shared/config/products'
import { Icon } from '../../shared/ui/icon'
import { SiteLink } from '../../shared/ui/site-link'
import { ProductThumb } from './product-thumb'

export const ProductCard = ({ product }: { readonly product: Product }) => (
  <SiteLink className="ms-pd-other" href={productHref(product.slug)}>
    <ProductThumb slug={product.slug} className="ms-pd-other__v" />
    <span className="ms-pd-other__c">
      <span className="ms-pd-other__a">{product.audience}</span>
      <h3 className="ms-pd-other__t">{product.name}</h3>
      <span className="ms-pd-other__p">{product.pitch}</span>
    </span>
    <Icon name="arrow-right" size={20} />
  </SiteLink>
)
