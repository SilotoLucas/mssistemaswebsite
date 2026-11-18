import { type ReactNode, useEffect } from 'react'
import './auto-rail.css'
import { useAutoRail } from './use-auto-rail'

type AutoRailProps<Item> = {
  readonly items: readonly Item[]
  readonly label: string
  readonly getKey: (item: Item) => string
  readonly renderItem: (item: Item, copy: boolean) => ReactNode
  readonly getId?: (item: Item) => string
  readonly held?: boolean
  readonly focusIndex?: number | null
  readonly className?: string
}

const COPY_SETS = [0, 1, 2] as const
const REAL_SET = 1

export const AutoRail = <Item,>({
  items,
  label,
  getKey,
  renderItem,
  getId,
  held = false,
  focusIndex = null,
  className = '',
}: AutoRailProps<Item>) => {
  const { viewportRef, trackRef, progressRef, showCard } = useAutoRail(items.length, held)

  useEffect(() => {
    if (focusIndex !== null) showCard(focusIndex)
  }, [focusIndex, showCard])

  return (
    <div className={`ms-rail ${className}`}>
      <div className="ms-rail__view" ref={viewportRef}>
        <ul className="ms-rail__track" aria-label={label} ref={trackRef}>
          {COPY_SETS.flatMap((set) =>
            items.map((item) => (
              <li
                id={set === REAL_SET ? getId?.(item) : undefined}
                aria-hidden={set === REAL_SET ? undefined : true}
                key={`${set}-${getKey(item)}`}
              >
                {renderItem(item, set !== REAL_SET)}
              </li>
            )),
          )}
        </ul>
      </div>
      <span className="ms-rail__line" aria-hidden="true">
        <span ref={progressRef} />
      </span>
    </div>
  )
}
