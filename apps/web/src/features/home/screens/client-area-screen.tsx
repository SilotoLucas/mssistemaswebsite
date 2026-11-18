import { BrandLogo } from '../../../shared/ui/brand-logo'
import { ScreenIcon, type ScreenIconName } from './screen-icon'

type FormField = { readonly label: string; readonly value: string; readonly span: number }

const CADASTRE_FIELDS: readonly FormField[] = [
  { label: 'Nome', value: 'Nome do associado', span: 9 },
  { label: 'Data de Nasc.', value: '00/00/0000', span: 3 },
  { label: 'Endereço', value: 'Rua Exemplo, 100', span: 9 },
  { label: 'Bairro', value: 'Centro', span: 3 },
  { label: 'CEP', value: '00000-000', span: 3 },
  { label: 'Cidade', value: 'Cidade', span: 7 },
  { label: 'UF', value: 'UF', span: 2 },
  { label: 'Telefone', value: '(00) 0000-0000', span: 4 },
  { label: 'Telefone Recado', value: '(00) 0000-0000', span: 4 },
  { label: 'Celular', value: '(00) 00000-0000', span: 4 },
  { label: 'E-mail', value: 'associado@exemplo.com.br', span: 12 },
]

const BILLING_FIELDS: readonly FormField[] = [
  { label: 'Endereço', value: 'Rua Exemplo, 100', span: 9 },
  { label: 'Bairro', value: 'Centro', span: 3 },
  { label: 'CEP', value: '00000-000', span: 4 },
  { label: 'Cidade', value: 'Cidade', span: 6 },
  { label: 'UF', value: 'UF', span: 2 },
]

const TABS: readonly { readonly icon: ScreenIconName; readonly label: string }[] = [
  { icon: 'person', label: 'Meus Dados' },
  { icon: 'group', label: 'Meus Dependentes' },
  { icon: 'money', label: 'Meus Pagamentos' },
  { icon: 'basket', label: 'Clube de Desconto' },
]

const PLAN_ROWS = [
  ['Data de cadastro', '10/09/2013'],
  ['Inscrição', '000001'],
  ['Carência', 'Sem Carência'],
] as const

const FieldGrid = ({ fields }: { readonly fields: readonly FormField[] }) => (
  <div className="ms-ui__g">
    {fields.map((field) => (
      <div className="ms-ui__f" style={{ gridColumn: `span ${field.span}` }} key={field.label}>
        <b>{field.label}</b>
        <span>{field.value}</span>
      </div>
    ))}
  </div>
)

const AreaSidebar = () => (
  <div className="ms-ui__side">
    <div className="ms-ui__box">
      <p className="ms-ui__name">Nome do associado</p>
      <p className="ms-ui__c">Plano</p>
      <p className="ms-ui__c">R$ 85,00</p>
      <p className="ms-ui__btn">Carteirinha Virtual</p>
      <p className="ms-ui__l">Meus Planos</p>
      <p className="ms-ui__sel">Plano Familiar</p>
      {PLAN_ROWS.map(([label, value]) => (
        <p className="ms-ui__r" key={label}>
          <b>{label}</b>
          <span>{value}</span>
        </p>
      ))}
      <p className="ms-ui__alt">Alterar dados de Acesso</p>
    </div>
    <p className="ms-ui__wa">
      <ScreenIcon name="chat" />
      <span>WhatsApp</span>
    </p>
    {['Atendimento 24h', 'Administrativo', 'Financeiro'].map((item) => (
      <p className="ms-ui__m" key={item}>
        {item}
      </p>
    ))}
  </div>
)

export const ClientAreaScreen = () => (
  <div
    className="ms-ui ms-ui--pc"
    role="img"
    aria-label="Área do Cliente no computador, com cadastro do associado e acesso a dependentes, pagamentos e clube de desconto. Dados de exemplo."
  >
    <div aria-hidden="true">
      <div className="ms-ui__bar">
        <span className="ms-ui__chip">
          <BrandLogo width={97} height={48} />
        </span>
        <span>Meu Plano</span>
        <span>Sair</span>
      </div>
      <div className="ms-ui__body">
        <AreaSidebar />
        <div className="ms-ui__main">
          <div className="ms-ui__tabs">
            {TABS.map((tab, index) => (
              <p className={`ms-ui__tab${index === 0 ? ' is-on' : ''}`} key={tab.label}>
                <ScreenIcon name={tab.icon} />
                <span>{tab.label}</span>
              </p>
            ))}
          </div>
          <div className="ms-ui__box ms-ui__form">
            <p className="ms-ui__h">Meus Dados de Cadastro</p>
            <FieldGrid fields={CADASTRE_FIELDS} />
            <div className="ms-ui__bill">
              <p className="ms-ui__h">Endereço de Cobrança</p>
              <FieldGrid fields={BILLING_FIELDS} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
