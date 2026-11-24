import { type ProductSlug, productHref } from '../../shared/config/products'
import { BrowserFrame } from '../../shared/ui/browser-frame'
import { PhoneFrame } from '../../shared/ui/phone-frame'
import { SiteLink } from '../../shared/ui/site-link'
import { APP_SCREENS, DASHBOARD_ADDRESS, DASHBOARD_SHOT } from './product-assets'
import { ProductThumb } from './product-thumb'
import './products.css'

type StageChip = {
  readonly slug: ProductSlug
  readonly title: string
  readonly text: string
}

const STAGE_CHIPS: readonly StageChip[] = [
  { slug: 'smallbusiness', title: 'SmallBusiness', text: 'Pacote compacto na nuvem' },
  { slug: 'dashboard', title: 'MS Dashboard', text: 'Os números da empresa' },
  { slug: 'app', title: 'MS App', text: 'Para os seus associados' },
]

const home = APP_SCREENS[1]

export const ProductsStage = () => (
  <div className="ms-pst">
    <span className="ms-pst__glow" aria-hidden="true" />
    <div className="ms-pst__pc" aria-hidden="true">
      <BrowserFrame
        src={DASHBOARD_SHOT.src}
        alt=""
        width={DASHBOARD_SHOT.width}
        height={DASHBOARD_SHOT.height}
        address={DASHBOARD_ADDRESS}
      />
    </div>
    <div className="ms-pst__ph" aria-hidden="true">
      <PhoneFrame src={home.src} alt="" width={home.width} height={home.height} />
    </div>
    <nav className="ms-pst__nav" aria-label="Produtos MS">
      {STAGE_CHIPS.map((chip) => (
        <SiteLink
          className={`ms-pchip ms-pst__chip ms-pst__chip--${chip.slug}`}
          href={productHref(chip.slug)}
          key={chip.slug}
        >
          <ProductThumb slug={chip.slug} />
          <span className="ms-pchip__t">
            <strong>{chip.title}</strong>
            <small>{chip.text}</small>
          </span>
        </SiteLink>
      ))}
    </nav>
  </div>
)
