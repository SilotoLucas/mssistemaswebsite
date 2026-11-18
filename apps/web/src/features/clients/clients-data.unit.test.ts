import { describe, expect, test } from 'bun:test'
import { STATE_TILES } from '../../shared/config/brazil-states'
import { normalizeText } from './client-search'
import { CLIENT_STATES } from './clients-data'

describe('dados de clientes', () => {
  test('cobre 18 estados, sem repetir', () => {
    const codes = CLIENT_STATES.map((state) => state.code)
    expect(codes).toHaveLength(18)
    expect(new Set(codes).size).toBe(18)
  })

  test('os estados atendidos coincidem com o mapa da home', () => {
    const served = STATE_TILES.filter((tile) => tile.served)
      .map((tile) => tile.code)
      .sort()
    expect(CLIENT_STATES.map((state) => state.code).sort()).toEqual(served)
  })

  test('não repete cidade dentro do mesmo estado e mantém ordem alfabética', () => {
    for (const state of CLIENT_STATES) {
      const keys = state.cities.map(normalizeText)
      expect(new Set(keys).size).toBe(keys.length)
      expect(keys).toEqual([...keys].sort())
    }
  })

  test('não traz bairros e cidades já descartadas na curadoria', () => {
    const all = CLIENT_STATES.flatMap((state) => state.cities)
    for (const rejected of ['Augusto Franco', 'Bugio', 'Jurinu']) {
      expect(all).not.toContain(rejected)
    }
    const goias = CLIENT_STATES.find((state) => state.code === 'GO')
    expect(goias?.cities).not.toContain('Sobradinho')
  })

  test('nenhuma cidade ficou vazia ou com espaço sobrando', () => {
    for (const city of CLIENT_STATES.flatMap((state) => state.cities)) {
      expect(city).toBe(city.trim())
      expect(city.length).toBeGreaterThan(2)
    }
  })
})
