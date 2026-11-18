import { CLIENT_STATES, type ClientRegion, type ClientState } from './clients-data'

export type RegionFilter = ClientRegion | 'todas'

export type StateResult = {
  readonly state: ClientState
  readonly cities: readonly string[]
  readonly stateMatched: boolean
}

export const normalizeText = (text: string): string =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

const matchesRegion = (state: ClientState, region: RegionFilter): boolean =>
  region === 'todas' || state.region === region

export const searchClients = (
  query: string,
  region: RegionFilter,
  states: readonly ClientState[] = CLIENT_STATES,
): readonly StateResult[] => {
  const term = normalizeText(query)
  const results: StateResult[] = []
  for (const state of states) {
    if (!matchesRegion(state, region)) continue
    if (!term) {
      results.push({ state, cities: state.cities, stateMatched: false })
      continue
    }
    const stateMatched =
      normalizeText(state.name).includes(term) || normalizeText(state.code) === term
    const cities = stateMatched
      ? state.cities
      : state.cities.filter((city) => normalizeText(city).includes(term))
    if (cities.length > 0) results.push({ state, cities, stateMatched })
  }
  return results
}

export const countCities = (results: readonly StateResult[]): number =>
  results.reduce((total, result) => total + result.cities.length, 0)

export const REGION_LABELS: Record<RegionFilter, string> = {
  todas: 'Todas as regiões',
  'sul-sudeste': 'Sul e Sudeste',
  'centro-oeste': 'Centro-Oeste',
  'norte-nordeste': 'Norte e Nordeste',
}
