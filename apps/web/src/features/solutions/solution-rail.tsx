import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { AutoRail } from '../../shared/ui/auto-rail'
import { Icon } from '../../shared/ui/icon'
import { Modal } from '../../shared/ui/modal'
import { SolutionCard } from './solution-card'
import type { SolutionGroup } from './solutions-catalog'

export const SolutionRail = ({ group }: { readonly group: SolutionGroup }) => {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const selected = group.solutions.find((solution) => solution.slug === selectedSlug)
  const linkedIndex = group.solutions.findIndex((solution) => `#${solution.slug}` === hash)

  const openSolution = useCallback((slug: string) => {
    setSelectedSlug(slug)
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    if (linkedIndex >= 0) navigate({ hash: '' }, { replace: true })
  }, [linkedIndex, navigate])

  useEffect(() => {
    const solution = group.solutions[linkedIndex]
    if (solution) openSolution(solution.slug)
  }, [linkedIndex, group.solutions, openSolution])

  return (
    <>
      <AutoRail
        items={group.solutions}
        label={`Soluções de ${group.name}`}
        getKey={(solution) => solution.slug}
        getId={(solution) => solution.slug}
        held={open}
        focusIndex={linkedIndex >= 0 ? linkedIndex : null}
        renderItem={(solution, copy) => (
          <SolutionCard
            solution={solution}
            copy={copy}
            onOpen={() => openSolution(solution.slug)}
          />
        )}
      />
      <Modal
        open={open}
        onClose={close}
        title={selected?.name ?? group.name}
        description={selected?.summary ?? group.description}
        media={
          selected ? (
            <span className="ms-sol__tile">
              <Icon name={selected.icon} size={24} />
            </span>
          ) : null
        }
      >
        <ul className="ms-sol-modal__list">
          {selected?.features.map((feature) => (
            <li key={feature}>
              <Icon name="check" size={18} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  )
}
