import { Aurora } from '../../../shared/ui/aurora'
import { Icon } from '../../../shared/ui/icon'
import { Reveal } from '../../../shared/ui/reveal'
import { ClientAppScreen } from '../screens/client-app-screen'
import { ClientAreaScreen } from '../screens/client-area-screen'

const AREA_FEATURES = [
  'Dados cadastrais em dia',
  'Dependentes',
  'Boletos e pagamentos',
  'Clube de descontos',
  'Carteirinha virtual',
  'Atendimento pelo WhatsApp',
] as const

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

export const ClientPortalSection = () => (
  <section className="ms-por ms-dark" id="area-do-cliente">
    <Aurora />
    <div className="ms-wrap">
      <Reveal className="ms-por__head">
        <p className="ms-eyebrow">Área do Cliente e App</p>
        <h2>
          Seu associado com <span className="ms-grad">tudo à mão</span>
        </h2>
        <p className="ms-por__i">
          Com a Área do Cliente e o App do Cliente, sua empresa oferece mais praticidade e menos
          burocracia.
        </p>
      </Reveal>
      <Reveal className="ms-por__stage">
        <div className="ms-por__glow" aria-hidden="true" />
        <div className="ms-shot ms-shot--p">
          <ClientAreaScreen />
        </div>
        <div className="ms-shot ms-shot--a">
          <ClientAppScreen />
        </div>
      </Reveal>
      <div className="ms-por__cards">
        <Reveal>
          <FeatureCard title="Área do Cliente" caption="No computador" items={AREA_FEATURES} />
        </Reveal>
        <Reveal delay={120}>
          <FeatureCard title="App do Cliente" caption="No celular" items={APP_FEATURES} />
        </Reveal>
      </div>
    </div>
  </section>
)
