import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { Reveal } from '../../shared/ui/reveal'
import { trackPointer } from '../../shared/ui/spotlight'
import { DemoRequestSection } from '../demo-request'
import { TEAM_FRONTS, TEAM_MEMBERS, TEAM_STEPS } from './team-content'
import { TeamMembers } from './team-members'
import './team.css'

const TeamHeroPanel = () => (
  <div className="ms-tm-hero ms-glass">
    <p className="ms-tm-hero__k">Quem faz a MS</p>
    <p className="ms-tm-hero__n">
      <strong>{TEAM_MEMBERS.length}</strong> pessoas na equipe da MS
    </p>
    <ul className="ms-tm-hero__faces" aria-hidden="true">
      {TEAM_MEMBERS.map((member) => (
        <li key={member.name}>{member.name.charAt(0)}</li>
      ))}
    </ul>
    <ul className="ms-tm-hero__fronts">
      {TEAM_FRONTS.map((front) => (
        <li key={front.kicker}>
          <span>
            <Icon name={front.icon} size={18} />
          </span>
          {front.kicker}
        </li>
      ))}
    </ul>
  </div>
)

export const TeamPage = () => (
  <main>
    <title>Equipe | MS Sistemas</title>
    <meta
      name="description"
      content="Conheça a equipe da MS Sistemas: suporte qualificado e desenvolvimento próprio, sempre evoluindo o sistema para funerárias, planos, cemitérios e crematórios."
    />
    <PageHero
      crumb="Equipe"
      title="As pessoas por trás do sistema"
      lead="Suporte qualificado e desenvolvimento próprio, trabalhando juntos para que o sistema acompanhe a rotina da sua empresa e evolua com ela."
      aside={<TeamHeroPanel />}
    />

    <section className="ms-section ms-tm-fronts-sec" id="frentes">
      <div className="ms-wrap">
        <Reveal className="ms-intro">
          <p className="ms-eyebrow ms-eyebrow--light">Como a equipe trabalha</p>
          <h2 className="ms-h2">
            Duas frentes, <span className="ms-grad ms-grad--deep">um só objetivo</span>
          </h2>
          <p>Quem atende e quem desenvolve estão lado a lado, dentro da MS.</p>
        </Reveal>
        <div className="ms-tm-fronts">
          {TEAM_FRONTS.map((front, index) => (
            <Reveal className="ms-tm-front-w" delay={index * 120} key={front.kicker}>
              <article className="ms-tm-front ms-spot" onPointerMove={trackPointer}>
                <span className="ms-tm-front__i">
                  <Icon name={front.icon} size={28} />
                </span>
                <p className="ms-tm-front__k">{front.kicker}</p>
                <h3>{front.title}</h3>
                <p>{front.text}</p>
                <ul>
                  {front.points.map((point) => (
                    <li key={point}>
                      <Icon name="check" size={16} />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="ms-section ms-tm-team-sec ms-dark" id="pessoas">
      <div className="ms-wrap">
        <Reveal className="ms-intro">
          <p className="ms-eyebrow">Nossa equipe</p>
          <h2 className="ms-h2">
            Quem faz <span className="ms-grad">a MS</span>
          </h2>
          <p>Clique em uma pessoa para conhecer um pouco mais sobre ela.</p>
        </Reveal>
        <TeamMembers />
      </div>
    </section>

    <section className="ms-section ms-section--mist" id="caminho">
      <div className="ms-wrap">
        <Reveal className="ms-intro ms-intro--center">
          <p className="ms-eyebrow ms-eyebrow--light">Do pedido à solução</p>
          <h2 className="ms-h2">
            O sistema evolui <span className="ms-grad ms-grad--deep">junto com você</span>
          </h2>
          <p>
            Precisa de algo específico para a sua empresa? A equipe de desenvolvimento estuda o
            pedido e trabalha na solução.
          </p>
        </Reveal>
        <ol className="ms-tm-steps">
          {TEAM_STEPS.map((step, index) => (
            <Reveal className="ms-tm-step-w" delay={index * 100} key={step.title}>
              <li className="ms-tm-step">
                <span className="ms-tm-step__n">{String(index + 1).padStart(2, '0')}</span>
                <span className="ms-tm-step__i">
                  <Icon name={step.icon} size={22} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    <DemoRequestSection />
  </main>
)
