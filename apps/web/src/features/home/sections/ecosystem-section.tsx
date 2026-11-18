import { Icon, type IconName } from '../../../shared/ui/icon'
import { TextLink } from '../../../shared/ui/text-link'

type ModuleGroup = {
  readonly icon: IconName
  readonly title: string
  readonly modules: readonly string[]
}

const MODULE_GROUPS: readonly ModuleGroup[] = [
  {
    icon: 'dashboard',
    title: 'Gestão',
    modules: ['Financeiro', 'Filiais', 'Frota', 'Equipamentos', 'CRM', 'Dashboard'],
  },
  {
    icon: 'phone',
    title: 'Equipe em campo',
    modules: ['Cobrança Móvel', 'Venda com Tablet', 'P.O.S'],
  },
  {
    icon: 'globe',
    title: 'Canais digitais',
    modules: ['Portal do Associado', 'Venda Web', 'ChatBot', 'SMS', 'Condolência Online'],
  },
  {
    icon: 'monitor',
    title: 'Atendimento presencial',
    modules: ['Totem de Autoatendimento', 'Totem Cemitério', 'QR Code', 'Painel de Velório'],
  },
]

export const EcosystemSection = () => (
  <section className="ms-section">
    <div className="ms-wrap">
      <div className="ms-intro">
        <h2 className="ms-h2">Tudo conectado, do escritório ao campo</h2>
      </div>
      <div className="ms-eco">
        {MODULE_GROUPS.map((group) => (
          <div className="ms-eco__g" key={group.title}>
            <span className="ms-eco__n">
              <Icon name={group.icon} size={22} />
            </span>
            <h3>{group.title}</h3>
            <ul>
              {group.modules.map((module) => (
                <li key={module}>{module}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="ms-eco__more">
        <TextLink label="Ver todas as soluções" href="/solucoes" />
      </div>
    </div>
  </section>
)
