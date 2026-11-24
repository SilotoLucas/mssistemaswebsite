import type { ComponentType } from 'react'
import appHome from '../../assets/app/app-inicio.webp'
import appReminder from '../../assets/app/app-lembrete.webp'
import appLogin from '../../assets/app/app-login.webp'
import appLogo from '../../assets/app/ms-app-logo.webp'
import dashboardShot from '../../assets/ms-dashboard.webp'
import smallBusinessLogo from '../../assets/smallbusiness-logo.webp'
import type { ProductSlug } from '../../shared/config/products'
import { SMALL_BUSINESS_MODULES } from '../../shared/config/small-business'
import { Icon } from '../../shared/ui/icon'
import { PhoneFrame } from '../../shared/ui/phone-frame'
import './products.css'

type VisualProps = { readonly decorative: boolean }

const alt = (decorative: boolean, text: string): string => (decorative ? '' : text)

export const APP_SCREENS = [
  {
    key: 'login',
    src: appLogin,
    width: 566,
    height: 1260,
    title: 'Acesso pelo CPF',
    alt: 'Tela de acesso do MS App, em que o associado informa o CPF',
  },
  {
    key: 'inicio',
    src: appHome,
    width: 745,
    height: 1441,
    title: 'Tela inicial',
    alt: 'Tela inicial do MS App com as parcelas e os atalhos para plano, dependentes, financeiro e carteirinha. Dados de exemplo.',
  },
  {
    key: 'lembrete',
    src: appReminder,
    width: 746,
    height: 1441,
    title: 'Lembrete de parcela',
    alt: 'Aviso do MS App lembrando que a parcela vence em breve. Dados de exemplo.',
  },
] as const

const SmallBusinessVisual = ({ decorative }: VisualProps) => (
  <div className="ms-pdv ms-pdv--sb">
    <span className="ms-pdv__glow" aria-hidden="true" />
    <img
      className="ms-pdv__logo"
      src={smallBusinessLogo}
      alt={alt(decorative, 'SmallBusiness, sistema de gestão')}
      width={560}
      height={560}
      draggable={false}
    />
    <ul className="ms-pdv__mods" aria-hidden={decorative ? true : undefined}>
      {SMALL_BUSINESS_MODULES.map((item) => (
        <li key={item.label}>
          <span>
            <Icon name={item.icon} size={16} />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  </div>
)

const AppVisual = ({ decorative }: VisualProps) => {
  const [login, home, reminder] = APP_SCREENS
  return (
    <div className="ms-pdv ms-pdv--app">
      <span className="ms-pdv__glow" aria-hidden="true" />
      <div className="ms-pdv__phones">
        <img
          className="ms-pdv__badge"
          src={appLogo}
          alt={alt(decorative, 'Ícone do MS App')}
          width={560}
          height={540}
          draggable={false}
        />
        <PhoneFrame
          className="ms-pdv__ph ms-pdv__ph--l"
          src={login.src}
          alt={alt(decorative, login.alt)}
          width={login.width}
          height={login.height}
        />
        <PhoneFrame
          className="ms-pdv__ph ms-pdv__ph--r"
          src={reminder.src}
          alt={alt(decorative, reminder.alt)}
          width={reminder.width}
          height={reminder.height}
        />
        <PhoneFrame
          className="ms-pdv__ph ms-pdv__ph--c"
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
    <img
      className="ms-pdv__screen"
      src={dashboardShot}
      alt={alt(
        decorative,
        'Tela do MS Dashboard com os gráficos de fluxo previsto e realizado e de inadimplência',
      )}
      width={1350}
      height={608}
      draggable={false}
    />
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
