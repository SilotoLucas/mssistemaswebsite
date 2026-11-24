import appHome from '../../assets/app/app-inicio.webp'
import appReminder from '../../assets/app/app-lembrete.webp'
import appLogin from '../../assets/app/app-login.webp'
import appLogo from '../../assets/app/ms-app-logo.webp'
import dashboardShot from '../../assets/ms-dashboard.webp'
import smallBusinessLogo from '../../assets/smallbusiness-logo.webp'

export const DASHBOARD_ADDRESS = 'indicadores.mssistemas.com.br'

export const DASHBOARD_SHOT = {
  src: dashboardShot,
  width: 1350,
  height: 608,
  alt: 'Tela do MS Dashboard com os gráficos de fluxo previsto e realizado e de inadimplência',
} as const

export const SMALL_BUSINESS_LOGO = {
  src: smallBusinessLogo,
  width: 560,
  height: 560,
  alt: 'SmallBusiness, sistema de gestão',
} as const

export const APP_LOGO = {
  src: appLogo,
  width: 560,
  height: 540,
  alt: 'Ícone do MS App',
} as const

export const APP_SCREENS = [
  {
    key: 'login',
    src: appLogin,
    width: 566,
    height: 1260,
    alt: 'Tela de acesso do MS App, em que o associado informa o CPF',
  },
  {
    key: 'inicio',
    src: appHome,
    width: 745,
    height: 1441,
    alt: 'Tela inicial do MS App com as parcelas e os atalhos para plano, dependentes, financeiro e carteirinha. Dados de exemplo.',
  },
  {
    key: 'lembrete',
    src: appReminder,
    width: 746,
    height: 1441,
    alt: 'Aviso do MS App lembrando que a parcela vence em breve. Dados de exemplo.',
  },
] as const
