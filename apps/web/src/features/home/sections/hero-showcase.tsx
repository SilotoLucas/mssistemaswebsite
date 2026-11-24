import appHome from '../../../assets/app/app-inicio.webp'
import dashboardShot from '../../../assets/ms-dashboard.webp'
import smallBusinessLogo from '../../../assets/smallbusiness-logo.webp'
import { type ProductSlug, productHref } from '../../../shared/config/products'
import { SMALL_BUSINESS_MODULES, SMALL_BUSINESS_PERKS } from '../../../shared/config/small-business'
import { Carousel, type CarouselSlide } from '../../../shared/ui/carousel'
import { Icon, type IconName } from '../../../shared/ui/icon'
import { PhoneFrame } from '../../../shared/ui/phone-frame'
import { SiteLink } from '../../../shared/ui/site-link'

const SHOWCASE_INTERVAL_MS = 11000

type Chip = {
  readonly icon: IconName
  readonly title: string
  readonly caption: string
  readonly className: string
}

type CaptionProps = {
  readonly tag: string
  readonly title: string
  readonly text: string
  readonly product: ProductSlug
}

const APP_CHIPS: readonly Chip[] = [
  {
    icon: 'credit-card',
    title: 'Carteirinha virtual',
    caption: 'MS App',
    className: 'ms-chip--app-a',
  },
  {
    icon: 'receipt',
    title: 'Parcelas e segunda via',
    caption: 'MS App',
    className: 'ms-chip--app-b',
  },
  {
    icon: 'calendar',
    title: 'Lembrete de parcela',
    caption: 'MS App',
    className: 'ms-chip--app-c',
  },
  {
    icon: 'message',
    title: 'Fale com a empresa',
    caption: 'MS App',
    className: 'ms-chip--app-d',
  },
]

const DASHBOARD_CHIPS: readonly Chip[] = [
  {
    icon: 'chart',
    title: 'Fluxo previsto x realizado',
    caption: 'MS Dashboard',
    className: 'ms-chip--dash-a',
  },
  {
    icon: 'alert',
    title: 'Inadimplência',
    caption: 'MS Dashboard',
    className: 'ms-chip--dash-b',
  },
  {
    icon: 'receipt',
    title: 'Vendas no período',
    caption: 'MS Dashboard',
    className: 'ms-chip--dash-c',
  },
  {
    icon: 'wallet',
    title: 'Contas a receber',
    caption: 'MS Dashboard',
    className: 'ms-chip--dash-d',
  },
]

const Chips = ({ chips }: { readonly chips: readonly Chip[] }) => (
  <>
    {chips.map((chip) => (
      <div className={`ms-chip ${chip.className}`} key={chip.title}>
        <span className="ms-chip__i">
          <Icon name={chip.icon} size={20} />
        </span>
        <span className="ms-chip__t">
          <strong>{chip.title}</strong>
          <small>{chip.caption}</small>
        </span>
      </div>
    ))}
  </>
)

const Caption = ({ tag, title, text, product }: CaptionProps) => (
  <div className="ms-hs__cap">
    <p className="ms-hs__tag">{tag}</p>
    <p className="ms-hs__t">{title}</p>
    <p className="ms-hs__p">
      {text}{' '}
      <SiteLink className="ms-hs__link" href={productHref(product)}>
        Conhecer o {tag}
      </SiteLink>
    </p>
  </div>
)

const AppSlide = () => (
  <div className="ms-hs">
    <div className="ms-stage ms-stage--app" aria-hidden="true">
      <span className="ms-stage__glow" />
      <div className="ms-stage__phone">
        <PhoneFrame src={appHome} alt="" width={745} height={1441} />
      </div>
      <Chips chips={APP_CHIPS} />
    </div>
    <Caption
      tag="MS App"
      title="Um app para você oferecer aos seus associados"
      text="Plano, parcelas, carteirinha e contato com a sua empresa no celular de cada associado."
      product="app"
    />
  </div>
)

const DashboardSlide = () => (
  <div className="ms-hs">
    <div className="ms-stage ms-stage--dash" aria-hidden="true">
      <span className="ms-stage__glow" />
      <div className="ms-stage__pc">
        <img
          className="ms-dash-shot"
          src={dashboardShot}
          alt=""
          width={1350}
          height={608}
          draggable={false}
        />
      </div>
      <Chips chips={DASHBOARD_CHIPS} />
    </div>
    <Caption
      tag="MS Dashboard"
      title="Os números da empresa em um só painel"
      text="Recebimentos, financeiro, previsto x realizado e inadimplência em gráficos, direto do sistema."
      product="dashboard"
    />
  </div>
)

const SmallBusinessSlide = () => (
  <div className="ms-hs">
    <div className="ms-stage ms-stage--sb">
      <span className="ms-stage__glow" aria-hidden="true" />
      <div className="ms-sb">
        <img
          className="ms-sb__logo"
          src={smallBusinessLogo}
          alt="SmallBusiness, sistema de gestão"
          width={560}
          height={560}
          draggable={false}
        />
        <div className="ms-sb__side">
          <p className="ms-sb__label">Módulos incluídos</p>
          <ul className="ms-sb__mods">
            {SMALL_BUSINESS_MODULES.map((item) => (
              <li key={item.label}>
                <span className="ms-chip__i">
                  <Icon name={item.icon} size={18} />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <ul className="ms-sb__perks">
          {SMALL_BUSINESS_PERKS.map((item) => (
            <li key={item.label}>
              <Icon name={item.icon} size={16} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Caption
      tag="SmallBusiness"
      title="O sistema da MS em versão compacta"
      text="Plano, funerária, cobrança e caixa em um pacote enxuto, hospedado na nuvem."
      product="smallbusiness"
    />
  </div>
)

const SHOWCASE_SLIDES: readonly CarouselSlide[] = [
  { key: 'app', label: 'MS App', content: <AppSlide /> },
  { key: 'dashboard', label: 'MS Dashboard', content: <DashboardSlide /> },
  { key: 'small-business', label: 'SmallBusiness', content: <SmallBusinessSlide /> },
]

export const HeroShowcase = () => (
  <Carousel
    label="Produtos da MS"
    slides={SHOWCASE_SLIDES}
    className="ms-hero__car"
    intervalMs={SHOWCASE_INTERVAL_MS}
    transition="fade"
  />
)
