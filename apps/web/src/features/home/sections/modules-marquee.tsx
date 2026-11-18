import { MODULE_GROUPS } from '../home-content'

const MODULE_NAMES = MODULE_GROUPS.flatMap((group) => group.modules)

export const ModulesMarquee = () => (
  <div className="ms-marq ms-dark" aria-hidden="true">
    <div className="ms-marq__mask">
      <div className="ms-marq__track">
        {[0, 1].map((copy) => (
          <ul className="ms-marq__row" key={copy}>
            {MODULE_NAMES.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  </div>
)
