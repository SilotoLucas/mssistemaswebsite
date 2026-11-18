import { describe, expect, test } from 'bun:test'
import { countCities, normalizeText, searchClients } from './client-search'
import { CLIENT_STATES } from './clients-data'

describe('normalizeText', () => {
  test('remove acentos, caixa e espaços nas pontas', () => {
    expect(normalizeText('  São José do Rio Preto ')).toBe('sao jose do rio preto')
  })
})

describe('searchClients', () => {
  test('sem busca e sem filtro devolve todos os estados com todas as cidades', () => {
    const results = searchClients('', 'todas')
    expect(results).toHaveLength(CLIENT_STATES.length)
    expect(countCities(results)).toBe(
      CLIENT_STATES.reduce((total, state) => total + state.cities.length, 0),
    )
  })

  test('encontra cidade ignorando acento e caixa', () => {
    const results = searchClients('botucatu', 'todas')
    expect(results).toHaveLength(1)
    expect(results[0]?.state.code).toBe('SP')
    expect(results[0]?.cities).toEqual(['Botucatu'])
  })

  test('busca por parte do nome', () => {
    const cities = searchClients('sao jo', 'todas').flatMap((result) => result.cities)
    expect(cities).toContain('São José do Rio Preto')
    expect(cities.every((city) => normalizeText(city).includes('sao jo'))).toBe(true)
  })

  test('buscar pelo nome do estado devolve todas as cidades dele', () => {
    const results = searchClients('sergipe', 'todas')
    expect(results).toHaveLength(1)
    expect(results[0]?.stateMatched).toBe(true)
    expect(results[0]?.cities).toEqual(CLIENT_STATES.find((s) => s.code === 'SE')?.cities)
  })

  test('buscar pela sigla exata devolve o estado', () => {
    const results = searchClients('ba', 'todas')
    expect(results.some((result) => result.state.code === 'BA' && result.stateMatched)).toBe(true)
  })

  test('filtra por região', () => {
    const results = searchClients('', 'centro-oeste')
    expect(results.length).toBeGreaterThan(0)
    expect(results.every((result) => result.state.region === 'centro-oeste')).toBe(true)
  })

  test('combina busca e região', () => {
    expect(searchClients('botucatu', 'norte-nordeste')).toHaveLength(0)
  })

  test('busca sem resultado devolve lista vazia', () => {
    expect(searchClients('xyzxyz', 'todas')).toEqual([])
  })
})
