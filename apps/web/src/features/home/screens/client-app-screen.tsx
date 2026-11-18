import { BrandLogo } from '../../../shared/ui/brand-logo'
import { ScreenIcon, type ScreenIconName } from './screen-icon'

const SHORTCUTS: readonly { readonly icon: ScreenIconName; readonly label: string }[] = [
  { icon: 'person', label: 'Meu Plano' },
  { icon: 'paw', label: 'Meus Pets' },
  { icon: 'shield', label: 'Meu Jazigo' },
  { icon: 'group', label: 'Dependentes' },
  { icon: 'wallet', label: 'Financeiro' },
  { icon: 'card', label: 'Carteirinha' },
  { icon: 'nav', label: 'Unidades' },
  { icon: 'heart', label: 'Obituário' },
  { icon: 'deal', label: 'Convênios' },
]

export const ClientAppScreen = () => (
  <div
    className="ms-ui ms-ui--app"
    role="img"
    aria-label="Tela inicial do App do Cliente no celular, com parcelas, atalhos do plano e carteirinha digital. Dados de exemplo."
  >
    <div aria-hidden="true">
      <div className="ms-ua__head">
        <i className="ms-ua__notch" />
        <p className="ms-ua__time">15:31</p>
        <div className="ms-ua__tools">
          <ScreenIcon name="calendar" />
          <span>
            <ScreenIcon name="group" />
            <ScreenIcon name="bell" />
          </span>
        </div>
        <p className="ms-ua__hi">Olá, MS CONSULTORIA &amp; SISTEMAS</p>
        <p className="ms-ua__sub">Existem parcelas disponíveis para pagamento!</p>
      </div>
      <div className="ms-ua__pays">
        {['10/25', '11/25'].map((reference) => (
          <div className="ms-ua__pay" key={reference}>
            <b>Pago: 30/09/2025</b>
            <em>Valor R$ 42,50</em>
            <span>Ref: {reference}</span>
          </div>
        ))}
      </div>
      <div className="ms-ua__grid">
        {SHORTCUTS.map((shortcut) => (
          <div className="ms-ua__a" key={shortcut.label}>
            <span>
              <ScreenIcon name={shortcut.icon} />
            </span>
            <b>{shortcut.label}</b>
          </div>
        ))}
      </div>
      <div className="ms-ua__card">
        <div className="ms-ua__ct">
          <span className="ms-ui__chip">
            <BrandLogo width={97} height={48} />
          </span>
        </div>
        <div className="ms-ua__cb">
          <p>
            <small>Titular</small>
            <b>MS CONSULTORIA &amp; SISTEMAS</b>
          </p>
          <div>
            <p>
              <small>Inscrição</small>
              <b>000001</b>
            </p>
            <p>
              <small>Validade</small>
              <b>18/11/2025</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
