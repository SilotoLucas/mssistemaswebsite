import { useMemo, useState } from 'react'
import { CountUp } from '../../shared/ui/count-up'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { Reveal } from '../../shared/ui/reveal'
import { DemoRequestSection } from '../demo-request'
import { countCities, REGION_LABELS, type RegionFilter, searchClients } from './client-search'
import { CLIENT_STATES } from './clients-data'
import './clients.css'

const REGIONS = Object.keys(REGION_LABELS) as RegionFilter[]
const TOTAL_CITIES = countCities(searchClients('', 'todas'))

const Summary = ({ cities, states }: { readonly cities: number; readonly states: number }) => (
  <p className="ms-cl-summary" role="status">
    {cities === 0
      ? 'Nenhuma cidade encontrada.'
      : `${cities} ${cities === 1 ? 'cidade' : 'cidades'} em ${states} ${states === 1 ? 'estado' : 'estados'}`}
  </p>
)

export const ClientsPage = () => {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState<RegionFilter>('todas')
  const results = useMemo(() => searchClients(query, region), [query, region])
  const clear = () => {
    setQuery('')
    setRegion('todas')
  }

  return (
    <main>
      <title>Clientes | MS Sistemas</title>
      <meta
        name="description"
        content="Veja as cidades e os estados onde empresas do setor funerário já usam os sistemas da MS Consultoria & Sistemas."
      />
      <PageHero
        crumb="Clientes"
        title="Empresas de todo o Brasil trabalham com a MS"
        lead="Consulte as cidades atendidas, por estado ou por região. Procure a sua e veja quem já está perto de você."
        aside={
          <div className="ms-cl-stats">
            <p>
              <strong>
                <CountUp target={CLIENT_STATES.length} />
              </strong>
              <span>estados</span>
            </p>
            <p>
              <strong>
                <CountUp target={TOTAL_CITIES} />
              </strong>
              <span>cidades</span>
            </p>
          </div>
        }
      />
      <section className="ms-section ms-section--mist ms-cl" id="cidades">
        <div className="ms-wrap">
          <div className="ms-cl-tools">
            <div className="ms-cl-search">
              <label htmlFor="client-search">Buscar cidade ou estado</label>
              <div className="ms-cl-search__box">
                <Icon name="pin" size={20} />
                <input
                  className="ms-input"
                  id="client-search"
                  type="search"
                  autoComplete="off"
                  placeholder="Ex.: Botucatu ou Bahia"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>
            <fieldset className="ms-cl-regions">
              <legend className="ms-sr">Filtrar por região</legend>
              {REGIONS.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={region === item}
                  onClick={() => setRegion(item)}
                >
                  {REGION_LABELS[item]}
                </button>
              ))}
            </fieldset>
          </div>
          <Summary cities={countCities(results)} states={results.length} />
          {results.length === 0 ? (
            <div className="ms-cl-empty">
              <p>Não encontramos essa cidade na lista atual de clientes.</p>
              <button className="ms-btn ms-btn--secondary" type="button" onClick={clear}>
                Limpar busca
              </button>
            </div>
          ) : (
            <ul className="ms-cl-grid">
              {results.map(({ state, cities }) => (
                <li key={state.code}>
                  <Reveal className="ms-cl-card">
                    <header>
                      <span className="ms-cl-card__code">{state.code}</span>
                      <h2>{state.name}</h2>
                      <span className="ms-cl-card__n">{cities.length}</span>
                    </header>
                    <ul className="ms-cl-cities">
                      {cities.map((city) => (
                        <li key={city}>{city}</li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
          <p className="ms-cl-note">
            A relação reúne as cidades informadas pela MS e é revisada de tempos em tempos. Não
            encontrou a sua? Fale com a gente.
          </p>
        </div>
      </section>
      <DemoRequestSection />
    </main>
  )
}
