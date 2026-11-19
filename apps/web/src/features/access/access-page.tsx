import { SYSTEM_ACCESS } from '../../shared/config/site-config'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { Reveal } from '../../shared/ui/reveal'
import { SiteLink } from '../../shared/ui/site-link'
import { DemoRequestSection } from '../demo-request'
import { ACCESS_GUIDES } from './access-content'
import './access.css'

export const AccessPage = () => (
  <main>
    <title>Acessar sistemas | MS Sistemas</title>
    <meta name="description" content="Escolha o acesso certo: MS Suporte ou MS Dashboard." />
    <PageHero
      crumb="Acessar sistemas"
      title="Escolha o acesso certo"
      lead="A MS tem um sistema para cada necessidade. Veja para quem serve cada um e entre com um clique."
      showActions={false}
    />
    <section className="ms-section ms-section--mist" id="acessos">
      <div className="ms-wrap">
        <ul className="ms-ac-grid">
          {ACCESS_GUIDES.map((guide, index) => {
            const system = SYSTEM_ACCESS.find((item) => item.name === guide.name)
            return (
              <li key={guide.name}>
                <Reveal className="ms-ac-card" delay={index * 90}>
                  <span className="ms-ac-card__i">
                    <Icon name={guide.icon} size={28} />
                  </span>
                  <h2>{guide.name}</h2>
                  <p className="ms-ac-card__a">{guide.audience}</p>
                  <ul className="ms-ac-card__u">
                    {guide.uses.map((use) => (
                      <li key={use}>
                        <Icon name="check" size={16} />
                        {use}
                      </li>
                    ))}
                  </ul>
                  {system ? (
                    <SiteLink className="ms-btn ms-btn--primary ms-btn--block" href={system.href}>
                      Entrar no {guide.name}
                    </SiteLink>
                  ) : null}
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
    <DemoRequestSection />
  </main>
)
