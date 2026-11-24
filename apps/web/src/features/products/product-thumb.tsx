import type { ProductSlug } from '../../shared/config/products'
import { Icon } from '../../shared/ui/icon'
import { APP_LOGO, SMALL_BUSINESS_LOGO } from './product-assets'

type ProductThumbProps = {
  readonly slug: ProductSlug
  readonly className?: string
}

export const ProductThumb = ({ slug, className = '' }: ProductThumbProps) => {
  if (slug === 'dashboard') {
    return (
      <span className={`ms-pthumb ms-pthumb--icon ${className}`} aria-hidden="true">
        <Icon name="chart" size={20} />
      </span>
    )
  }
  const logo = slug === 'app' ? APP_LOGO : SMALL_BUSINESS_LOGO
  return (
    <img
      className={`ms-pthumb ${className}`}
      src={logo.src}
      alt=""
      width={logo.width}
      height={logo.height}
      draggable={false}
    />
  )
}
