import { SiteLink } from '../../../shared/ui/site-link'
import { MODULE_GROUPS, solutionHref } from '../home-content'

const MODULES = MODULE_GROUPS.flatMap((group) => group.modules)

export const ModulesMarquee = () => (
  <nav className="ms-marq ms-dark" aria-label="Módulos do sistema">
    <div className="ms-marq__mask">
      <div className="ms-marq__track">
        {[0, 1].map((copy) => (
          <ul className="ms-marq__row" aria-hidden={copy === 1 ? true : undefined} key={copy}>
            {MODULES.map((module) => (
              <li key={module.slug}>
                <SiteLink
                  className="ms-marq__chip"
                  href={solutionHref(module.slug)}
                  tabIndex={copy === 1 ? -1 : undefined}
                >
                  {module.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  </nav>
)
