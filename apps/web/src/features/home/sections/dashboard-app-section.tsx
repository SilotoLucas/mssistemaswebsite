import dashboardShot from '../../../assets/ms-dashboard.webp'
import { DASHBOARD_FEATURES } from '../../../shared/config/small-business'
import { Icon } from '../../../shared/ui/icon'
import { Reveal } from '../../../shared/ui/reveal'
import { ClientAppScreen } from '../screens/client-app-screen'

const APP_FEATURES = [
  'Carteirinha digital',
  'Segunda via do boleto',
  'Notificações e avisos',
  'Informações do plano',
  'Fale com a empresa',
] as const

type FeatureCardProps = {
  readonly title: string
  readonly caption: string
  readonly items: readonly string[]
}

const FeatureCard = ({ title, caption, items }: FeatureCardProps) => (
  <div className="ms-por__card ms-glass">
    <p className="ms-por__cap">{caption}</p>
    <h3>{title}</h3>
    <ul className="ms-feats">
      {items.map((item) => (
        <li key={item}>
          <span className="ms-feats__i">
            <Icon name="check" size={14} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  </div>
)

export const DashboardAppSection = () => (
  <section className="ms-por ms-por--alt ms-dark" id="dashboard-e-app">
    <div className="ms-wrap">
      <Reveal className="ms-por__head">
        <p className="ms-eyebrow">MS Dashboard e App do Cliente</p>
        <h2>
          Os números para você, <span className="ms-grad">o app para o seu associado</span>
        </h2>
        <p className="ms-por__i">
          O gestor acompanha a empresa pelo MS Dashboard, e o associado resolve tudo pelo App do
          Cliente que a sua empresa oferece.
        </p>
      </Reveal>
      <Reveal className="ms-por__stage">
        <div className="ms-por__glow" aria-hidden="true" />
        <div className="ms-shot ms-shot--p">
          <img
            className="ms-dbx__shot"
            src={dashboardShot}
            alt="Tela do MS Dashboard com os gráficos de fluxo previsto e realizado e de inadimplência"
            width={1350}
            height={608}
            loading="lazy"
          />
        </div>
        <div className="ms-shot ms-shot--a" aria-hidden="true">
          <ClientAppScreen />
        </div>
      </Reveal>
      <div className="ms-por__cards">
        <Reveal>
          <FeatureCard title="MS Dashboard" caption="Para o gestor" items={DASHBOARD_FEATURES} />
        </Reveal>
        <Reveal delay={120}>
          <FeatureCard title="App do Cliente" caption="Para o seu associado" items={APP_FEATURES} />
        </Reveal>
      </div>
    </div>
  </section>
)
