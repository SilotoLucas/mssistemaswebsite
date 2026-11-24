import { SYSTEM_ACCESS } from '../../shared/config/site-config'
import { SiteLink } from '../../shared/ui/site-link'

export const SystemLinks = () => (
  <>
    {SYSTEM_ACCESS.map((system) => (
      <SiteLink className="ms-sys" href={system.href} key={system.name}>
        <strong>{system.name}</strong>
        <span>{system.description}</span>
      </SiteLink>
    ))}
  </>
)
