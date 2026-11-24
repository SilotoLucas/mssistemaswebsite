import { SOLUTION_COUNT, SOLUTION_GROUPS } from '../../shared/config/solutions-catalog'
import { Carousel, type CarouselSlide } from '../../shared/ui/carousel'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { Reveal } from '../../shared/ui/reveal'
import { TextLink } from '../../shared/ui/text-link'
import { DemoRequestSection } from '../demo-request'
import { SolutionRail } from './solution-rail'
import { SolutionsNav } from './solutions-nav'
import './solutions.css'

const PREVIEW_SIZE = 4

const GROUP_SLIDES: readonly CarouselSlide[] = SOLUTION_GROUPS.map((group) => ({
  key: group.slug,
  label: group.name,
  content: (
    <div className="ms-sols-slide">
      <span className="ms-sols-slide__i">
        <Icon name={group.icon} size={26} />
      </span>
      <p className="ms-sols-slide__n">{group.solutions.length} soluções</p>
      <p className="ms-sols-slide__t">{group.name}</p>
      <p>{group.description}</p>
      <ul>
        {group.solutions.slice(0, PREVIEW_SIZE).map((solution) => (
          <li key={solution.slug}>{solution.name}</li>
        ))}
      </ul>
      <TextLink label="Ver soluções" href={`#${group.slug}`} hiddenContext={`de ${group.name}`} />
    </div>
  ),
}))

export const SolutionsPage = () => (
  <main>
    <title>Soluções | MS Sistemas</title>
    <meta
      name="description"
      content={`Conheça as ${SOLUTION_COUNT} soluções da MS Sistemas para planos funerários, funerárias, cemitérios, crematórios e clínicas.`}
    />
    <PageHero
      crumb="Soluções"
      title="Soluções para toda a sua operação"
      lead={`São ${SOLUTION_COUNT} soluções integradas, do contrato ao atendimento digital. Escolha os módulos que fazem sentido para a sua empresa.`}
      aside={
        <Carousel
          label="Grupos de soluções"
          slides={GROUP_SLIDES}
          className="ms-ph__car"
          intervalMs={5000}
        />
      }
    />
    <SolutionsNav />
    {SOLUTION_GROUPS.map((group, index) => (
      <section
        className={`ms-sg ms-sg--${group.slug}${index % 2 === 1 ? ' ms-sg--dark ms-dark' : ''}`}
        id={group.slug}
        key={group.slug}
      >
        <span className="ms-sg__mark" aria-hidden="true">
          <Icon name={group.icon} size={360} />
        </span>
        <div className="ms-wrap">
          <Reveal className="ms-sg__head">
            <span className="ms-sg__i">
              <Icon name={group.icon} size={28} />
            </span>
            <div className="ms-sg__tx">
              <p className="ms-sg__k">
                <span>{String(index + 1).padStart(2, '0')}</span>
                {group.solutions.length} soluções
              </p>
              <h2>{group.name}</h2>
              <p className="ms-sg__d">{group.description}</p>
            </div>
          </Reveal>
          <SolutionRail group={group} />
        </div>
      </section>
    ))}
    <DemoRequestSection />
  </main>
)
