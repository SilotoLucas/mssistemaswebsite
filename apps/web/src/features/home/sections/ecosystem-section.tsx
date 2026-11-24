import { solutionHref } from '../../../shared/config/solutions-catalog'
import { Icon } from '../../../shared/ui/icon'
import { Reveal } from '../../../shared/ui/reveal'
import { SiteLink } from '../../../shared/ui/site-link'
import { trackPointer } from '../../../shared/ui/spotlight'
import { TextLink } from '../../../shared/ui/text-link'
import { MODULE_GROUPS } from '../home-content'

export const EcosystemSection = () => (
  <section className="ms-section ms-section--mist ms-eco-sec">
    <div className="ms-wrap ms-eco">
      <Reveal className="ms-eco__head">
        <p className="ms-eyebrow ms-eyebrow--light">Ecossistema</p>
        <h2 className="ms-h2">
          Tudo conectado, <span className="ms-grad ms-grad--deep">do escritório ao campo</span>
        </h2>
        <p>Cada módulo usa as mesmas informações, sem digitar o mesmo dado duas vezes.</p>
        <TextLink label="Ver todas as soluções" href="/solucoes" />
      </Reveal>
      <div className="ms-eco__grid">
        {MODULE_GROUPS.map((group, index) => (
          <Reveal delay={index * 90} key={group.title}>
            <article className="ms-eco__g ms-spot" onPointerMove={trackPointer}>
              <span className="ms-eco__n">
                <Icon name={group.icon} size={24} />
              </span>
              <h3>
                <SiteLink className="ms-eco__open" href={solutionHref(group.slug)}>
                  {group.title}
                  <Icon name="arrow-right" size={20} />
                </SiteLink>
              </h3>
              <ul>
                {group.modules.map((module) => (
                  <li key={module.slug}>
                    <SiteLink className="ms-eco__chip" href={solutionHref(module.slug)}>
                      {module.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)
