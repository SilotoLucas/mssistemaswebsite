import { SYSTEM_ACCESS } from '../../shared/config/site-config'

export const SystemLinks = () => (
  <>
    {SYSTEM_ACCESS.map((system) => (
      <a className="ms-sys" href={system.href} key={system.name}>
        <strong>{system.name}</strong>
        <span>{system.description}</span>
      </a>
    ))}
  </>
)
