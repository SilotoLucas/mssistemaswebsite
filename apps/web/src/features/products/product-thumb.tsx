import type { ProductSlug } from '../../shared/config/products'
import { APP_LOGO, SMALL_BUSINESS_LOGO } from './product-assets'

type ProductThumbProps = {
  readonly slug: ProductSlug
  readonly className?: string
}

export const ProductThumb = ({ slug, className = '' }: ProductThumbProps) => {
  if (slug === 'dashboard') {
    return (
      <span className={`ms-pthumb ms-pthumb--dash ${className}`} aria-hidden="true">
        <svg viewBox="0 0 48 48" focusable="false" aria-hidden="true">
          <rect className="ms-pthumb__card" x="7" y="9" width="34" height="30" rx="6" />
          <rect className="ms-pthumb__bar" x="12" y="27" width="5" height="7" rx="1.5" />
          <rect className="ms-pthumb__bar" x="19.5" y="22" width="5" height="12" rx="1.5" />
          <rect className="ms-pthumb__bar" x="27" y="24.5" width="5" height="9.5" rx="1.5" />
          <rect
            className="ms-pthumb__bar is-top"
            x="34.5"
            y="17"
            width="2.5"
            height="17"
            rx="1.25"
          />
          <polyline className="ms-pthumb__line" points="12,22 20,16 28,19 36,12" />
          <circle className="ms-pthumb__dot" cx="36" cy="12" r="2.6" />
        </svg>
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
