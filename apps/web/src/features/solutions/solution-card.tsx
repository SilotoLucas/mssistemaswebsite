import type { Solution } from '../../shared/config/solutions-catalog'
import { Icon } from '../../shared/ui/icon'

type SolutionCardProps = {
  readonly solution: Solution
  readonly copy: boolean
  readonly onOpen: () => void
}

export const SolutionCard = ({ solution, copy, onOpen }: SolutionCardProps) => (
  <article className="ms-sol">
    <span className="ms-sol__tile">
      <Icon name={solution.icon} size={24} />
    </span>
    <h3>{solution.name}</h3>
    <p>{solution.summary}</p>
    <button
      className="ms-sol__btn"
      type="button"
      aria-haspopup="dialog"
      tabIndex={copy ? -1 : undefined}
      onClick={onOpen}
    >
      Ver funções
      <span className="ms-sr"> de {solution.name}</span>
      <Icon name="arrow-right" size={18} />
    </button>
  </article>
)
