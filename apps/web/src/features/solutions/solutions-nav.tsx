import { useEffect, useRef } from 'react'
import { SiteLink } from '../../shared/ui/site-link'
import { SOLUTION_GROUPS } from './solutions-catalog'
import { useActiveGroup } from './use-active-group'

const GROUP_SLUGS = SOLUTION_GROUPS.map((group) => group.slug)

export const SolutionsNav = () => {
  const active = useActiveGroup(GROUP_SLUGS)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = listRef.current
    const link = list?.querySelector<HTMLElement>(`[data-group="${active}"]`)
    if (list && link) list.scrollLeft = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2
  }, [active])

  return (
    <nav className="ms-sols-nav" aria-label="Grupos de soluções">
      <div className="ms-wrap">
        <ul ref={listRef}>
          {SOLUTION_GROUPS.map((group) => (
            <li key={group.slug} data-group={group.slug}>
              <SiteLink
                href={`#${group.slug}`}
                aria-current={active === group.slug ? 'true' : undefined}
              >
                {group.name}
                <span>{group.solutions.length}</span>
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
