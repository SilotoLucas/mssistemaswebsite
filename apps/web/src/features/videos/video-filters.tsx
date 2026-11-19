import { Icon } from '../../shared/ui/icon'
import { useFilterCarousel } from './use-filter-carousel'
import { VIDEO_FILTERS } from './video-library'

type VideoFiltersProps = {
  readonly filter: string
  readonly onFilter: (slug: string) => void
}

export const VideoFilters = ({ filter, onFilter }: VideoFiltersProps) => {
  const { trackRef, edges, page } = useFilterCarousel(filter)

  return (
    <fieldset
      className={`ms-vd-filters${edges.start ? ' has-start' : ''}${edges.end ? ' has-end' : ''}`}
    >
      <legend className="ms-sr">Filtrar vídeos por área</legend>
      <button
        className="ms-vd-filters__arrow ms-vd-filters__arrow--prev"
        type="button"
        aria-label="Ver filtros anteriores"
        hidden={!edges.start}
        onClick={() => page(-1)}
      >
        <Icon name="chevron-down" size={18} />
      </button>
      <div className="ms-vd-filters__track" ref={trackRef}>
        {VIDEO_FILTERS.map((option) => (
          <button
            className="ms-vd-chip"
            type="button"
            aria-pressed={filter === option.slug}
            onClick={() => onFilter(option.slug)}
            data-key={option.slug}
            key={option.slug}
          >
            {option.name}
            <span className="ms-vd-chip__n">{option.count}</span>
          </button>
        ))}
      </div>
      <button
        className="ms-vd-filters__arrow ms-vd-filters__arrow--next"
        type="button"
        aria-label="Ver mais filtros"
        hidden={!edges.end}
        onClick={() => page(1)}
      >
        <Icon name="chevron-down" size={18} />
      </button>
    </fieldset>
  )
}
