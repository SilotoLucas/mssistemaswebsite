import { Icon } from '../../../shared/ui/icon'
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

const FeatureList = ({ items }: { readonly items: readonly string[] }) => (
  <ul className="ms-feats">
    {items.map((item) => (
      <li key={item}>
        <Icon name="check" size={18} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

export const ClientPortalSection = () => (
  <section className="ms-por ms-dark" id="area-do-cliente">
    <div className="ms-wrap">
      <h2>Seu associado com tudo à mão</h2>
      <p className="ms-por__i">
        Com a Área do Cliente e o App do Cliente, sua empresa oferece mais praticidade e menos
        burocracia.
      </p>
      <div className="ms-por__g">
        <div className="ms-por__t ms-por__t--a">
          <h3>Área do Cliente</h3>
          <FeatureList items={AREA_FEATURES} />
        </div>
        <div className="ms-shot ms-shot--p">
          <ClientAreaScreen />
        </div>
        <div className="ms-por__t ms-por__t--b">
          <h3>App do Cliente</h3>
          <FeatureList items={APP_FEATURES} />
        </div>
        <div className="ms-shot ms-shot--a">
          <ClientAppScreen />
        </div>
      </div>
    </div>
  </section>
)
