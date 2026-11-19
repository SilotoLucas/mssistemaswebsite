import { Icon } from '../../shared/ui/icon'

const POINTS = [
  'Um consultor entra em contato com você',
  'Conheça os módulos que fazem sentido para a sua empresa',
  'Atendimento de quem conhece o setor desde 2005',
] as const

export const DemoPoints = ({ className }: { readonly className: string }) => (
  <ul className={className}>
    {POINTS.map((point) => (
      <li key={point}>
        <span>
          <Icon name="check" size={14} />
        </span>
        {point}
      </li>
    ))}
  </ul>
)
