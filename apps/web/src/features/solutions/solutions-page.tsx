import { SOLUTION_COUNT, SOLUTION_GROUPS } from '../../shared/config/solutions-catalog'
import { Carousel, type CarouselSlide } from '../../shared/ui/carousel'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
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
      content="Conheça as 24 soluções da MS Sistemas para planos funerários, funerárias, cemitérios, crematórios e clínicas."
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
    {SOLUTION_GROUPS.map((group) => (
      <section className="ms-sg" id={group.slug} key={group.slug}>
        <div className="ms-wrap">
          <div className="ms-sg__c">
            <span className="ms-sg__i">
              <Icon name={group.icon} size={24} />
            </span>
            <div>
              <h2>{group.name}</h2>
              <p>{group.description}</p>
            </div>
          </div>
          <SolutionRail group={group} />
        </div>
      </section>
    ))}
    <DemoRequestSection />
  </main>
)
