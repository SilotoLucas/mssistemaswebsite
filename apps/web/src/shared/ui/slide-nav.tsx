import { Icon } from './icon'
import './slide-nav.css'

type SlideNavProps = {
  readonly onMove: (direction: 1 | -1) => void
  readonly previousLabel?: string
  readonly nextLabel?: string
}

export const SlideNav = ({
  onMove,
  previousLabel = 'Slide anterior',
  nextLabel = 'Próximo slide',
}: SlideNavProps) => (
  <div className="ms-snav">
    <button
      className="ms-snav__b ms-snav__b--prev"
      type="button"
      aria-label={previousLabel}
      onClick={() => onMove(-1)}
    >
      <Icon name="chevron-down" size={18} />
    </button>
    <button
      className="ms-snav__b ms-snav__b--next"
      type="button"
      aria-label={nextLabel}
      onClick={() => onMove(1)}
    >
      <Icon name="chevron-down" size={18} />
    </button>
  </div>
)
