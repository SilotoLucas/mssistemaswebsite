import { SERVED_STATE_COUNT } from '../../shared/config/brazil-states'
import { AutoRail } from '../../shared/ui/auto-rail'
import { Carousel, type CarouselSlide } from '../../shared/ui/carousel'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { DemoRequestSection } from '../demo-request'
import {
  COMPANY_MILESTONES,
  COMPANY_PILLARS,
  COMPANY_VALUES,
  TEAM_MEMBERS,
} from './company-content'
import { LocationSection } from './location-section'
import './company.css'

const PILLAR_SLIDES: readonly CarouselSlide[] = COMPANY_PILLARS.map((pillar) => ({
  key: pillar.name,
  label: pillar.name,
  content: (
    <div className="ms-co-pillar">
      <span>
        <Icon name={pillar.icon} size={30} />
      </span>
      <p>O que nos move</p>
      <strong>{pillar.name}</strong>
    </div>
  ),
}))

export const CompanyPage = () => (
  <main>
    <title>Empresa | MS Sistemas</title>
    <meta
      name="description"
      content="Conheça a MS Consultoria & Sistemas: desde 2005 desenvolvendo software de gestão para funerárias, planos, cemitérios e crematórios."
    />
    <PageHero
      crumb="Empresa"
      title="Desde 2005 simplificando a gestão do setor"
      lead={`A MS Consultoria & Sistemas nasceu em Botucatu/SP e atende empresas em ${SERVED_STATE_COUNT} estados, com software de gestão e suporte especializado.`}
      aside={
        <Carousel
          label="O que move a MS"
          slides={PILLAR_SLIDES}
          className="ms-ph__car"
          intervalMs={4000}
        />
      }
    />

    <section className="ms-co ms-co--mist" id="historia">
      <div className="ms-wrap ms-co-story">
        <div className="ms-co-story__c">
          <p className="ms-co-kicker">Nossa história</p>
          <h2>Mais de duas décadas ao lado do setor</h2>
          <p>
            A MS foi fundada em fevereiro de 2005 por Marcos Eduardo, com foco na automação de
            funerárias, cemitérios e crematórios.
          </p>
          <p>
            Hoje, reúne soluções para planos de assistência familiar, gestão administrativa, equipes
            em campo e atendimento digital, sempre com suporte próximo de quem usa o sistema.
          </p>
        </div>
        <ol className="ms-co-line">
          {COMPANY_MILESTONES.map((milestone) => (
            <li key={milestone.mark}>
              <strong>{milestone.mark}</strong>
              <div>
                <h3>{milestone.title}</h3>
                <p>{milestone.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="ms-co ms-co--fog" id="missao">
      <div className="ms-wrap ms-co-purpose">
        <article className="ms-co-purpose__a ms-dark">
          <Icon name="send" size={200} />
          <p className="ms-co-kicker">Para onde vamos todos os dias</p>
          <h2>Missão</h2>
          <p>
            Desenvolver soluções inteligentes para garantir a satisfação das empresas, buscando
            tecnologia constantemente e oferecendo suporte diferenciado e comprometido com o
            resultado e a gestão dos negócios dos parceiros.
          </p>
        </article>
        <article className="ms-co-purpose__b ms-dark">
          <Icon name="globe" size={200} />
          <p className="ms-co-kicker">Onde queremos chegar</p>
          <h2>Visão</h2>
          <p>
            Ser a tranquilidade de que os parceiros necessitam para garantir a integridade das
            informações geradas, por meio do suporte especializado e dos softwares, com o melhor
            custo-benefício do mercado.
          </p>
        </article>
      </div>
    </section>

    <section className="ms-co ms-co--mist" id="valores">
      <div className="ms-wrap">
        <div className="ms-co-head ms-co-head--center">
          <p className="ms-co-kicker">O que nos guia</p>
          <h2>Nossos valores</h2>
        </div>
        <ul className="ms-co-values">
          {COMPANY_VALUES.map((value) => (
            <li key={value.name}>
              <span>
                <Icon name={value.icon} size={26} />
              </span>
              {value.name}
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="ms-co ms-co--navy ms-dark" id="equipe">
      <div className="ms-wrap">
        <div className="ms-co-head">
          <p className="ms-co-kicker">Nossa equipe</p>
          <h2>Quem faz a MS</h2>
        </div>
        <AutoRail
          items={TEAM_MEMBERS}
          label="Equipe da MS Sistemas"
          getKey={(member) => member}
          className="ms-co-team"
          renderItem={(member) => (
            <article className="ms-co-person">
              <span aria-hidden="true">{member.charAt(0)}</span>
              <h3>{member}</h3>
            </article>
          )}
        />
      </div>
    </section>

    <LocationSection />
    <DemoRequestSection />
  </main>
)
