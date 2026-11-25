import { useState } from 'react'
import { AutoRail } from '../../shared/ui/auto-rail'
import { Icon } from '../../shared/ui/icon'
import { Modal } from '../../shared/ui/modal'
import { trackPointer } from '../../shared/ui/spotlight'
import { memberBio, TEAM_MEMBERS, type TeamMember } from './team-content'

const Avatar = ({ member, size }: { readonly member: TeamMember; readonly size: 'md' | 'lg' }) => (
  <span className={`ms-tm-av ms-tm-av--${size}`} aria-hidden="true">
    {member.name.charAt(0)}
  </span>
)

export const TeamMembers = () => {
  const [selected, setSelected] = useState<TeamMember | null>(null)
  const [open, setOpen] = useState(false)

  const openMember = (member: TeamMember) => {
    setSelected(member)
    setOpen(true)
  }

  return (
    <>
      <AutoRail
        items={TEAM_MEMBERS}
        label="Equipe da MS Sistemas"
        getKey={(member) => member.name}
        className="ms-tm-rail"
        held={open}
        renderItem={(member, copy) => (
          <article className="ms-tm-card ms-spot ms-spot--dark" onPointerMove={trackPointer}>
            <Avatar member={member} size="md" />
            <h3>{member.name}</h3>
            <button
              className="ms-tm-card__btn"
              type="button"
              aria-haspopup="dialog"
              tabIndex={copy ? -1 : undefined}
              onClick={() => openMember(member)}
            >
              Conhecer
              <span className="ms-sr"> {member.name}</span>
              <Icon name="arrow-right" size={16} />
            </button>
          </article>
        )}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={selected?.name ?? 'Equipe'}
        description="Equipe MS Sistemas"
        media={selected ? <Avatar member={selected} size="lg" /> : null}
      >
        <p className="ms-tm-bio">{selected ? memberBio(selected) : ''}</p>
      </Modal>
    </>
  )
}
