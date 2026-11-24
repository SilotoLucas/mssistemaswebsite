import type { ComponentType } from 'react'
import type { ProductSlug } from '../../shared/config/products'
import { SMALL_BUSINESS_MODULES } from '../../shared/config/small-business'
import { BrowserFrame } from '../../shared/ui/browser-frame'
import { Icon } from '../../shared/ui/icon'
import { PhoneFrame } from '../../shared/ui/phone-frame'
import {
  APP_SCREENS,
  DASHBOARD_ADDRESS,
  DASHBOARD_SHOT,
  SMALL_BUSINESS_LOGO,
} from './product-assets'
import './products.css'

type VisualProps = { readonly decorative: boolean }

const alt = (decorative: boolean, text: string): string => (decorative ? '' : text)

const SmallBusinessVisual = ({ decorative }: VisualProps) => (
  <div className="ms-pdv ms-pdv--sb">
    <span className="ms-pdv__glow" aria-hidden="true" />
    <img
      className="ms-pdv__logo"
      src={SMALL_BUSINESS_LOGO.src}
      alt={alt(decorative, SMALL_BUSINESS_LOGO.alt)}
      width={SMALL_BUSINESS_LOGO.width}
      height={SMALL_BUSINESS_LOGO.height}
      draggable={false}
    />
    <ul className="ms-pdv__mods" aria-hidden={decorative ? true : undefined}>
      {SMALL_BUSINESS_MODULES.map((item) => (
        <li className="ms-pchip" key={item.label}>
          <span className="ms-pchip__ico">
            <Icon name={item.icon} size={16} />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  </div>
)

const AppVisual = ({ decorative }: VisualProps) => {
  const [login, home] = APP_SCREENS
  return (
    <div className="ms-pdv ms-pdv--app">
      <span className="ms-pdv__glow" aria-hidden="true" />
      <div className="ms-pdv__duo">
        <PhoneFrame
          className="ms-pdv__ph ms-pdv__ph--back"
          src={login.src}
          alt={alt(decorative, login.alt)}
          width={login.width}
          height={login.height}
        />
        <PhoneFrame
          className="ms-pdv__ph ms-pdv__ph--front"
          src={home.src}
          alt={alt(decorative, home.alt)}
          width={home.width}
          height={home.height}
        />
      </div>
    </div>
  )
}

const DashboardVisual = ({ decorative }: VisualProps) => (
  <div className="ms-pdv ms-pdv--dash">
    <span className="ms-pdv__glow" aria-hidden="true" />
    <BrowserFrame
      src={DASHBOARD_SHOT.src}
      alt={alt(decorative, DASHBOARD_SHOT.alt)}
      width={DASHBOARD_SHOT.width}
      height={DASHBOARD_SHOT.height}
      address={DASHBOARD_ADDRESS}
    />
    <span className="ms-pchip ms-pdv__chip ms-pdv__chip--a" aria-hidden="true">
      <span className="ms-pchip__ico">
        <Icon name="chart" size={16} />
      </span>
      Previsto x realizado
    </span>
    <span className="ms-pchip ms-pdv__chip ms-pdv__chip--b" aria-hidden="true">
      <span className="ms-pchip__ico">
        <Icon name="alert" size={16} />
      </span>
      Inadimplência
    </span>
  </div>
)

const VISUALS: Record<ProductSlug, ComponentType<VisualProps>> = {
  smallbusiness: SmallBusinessVisual,
  app: AppVisual,
  dashboard: DashboardVisual,
}

type ProductVisualProps = {
  readonly slug: ProductSlug
  readonly decorative?: boolean
}

export const ProductVisual = ({ slug, decorative = false }: ProductVisualProps) => {
  const Visual = VISUALS[slug]
  return <Visual decorative={decorative} />
}
