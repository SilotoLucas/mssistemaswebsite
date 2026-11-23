import { describe, expect, test } from 'bun:test'
import { MAP_COLUMNS, MAP_ROWS, SERVED_STATE_COUNT, STATE_TILES } from './brazil-states'

const cellOf = (tile: (typeof STATE_TILES)[number]): string => `${tile.column}:${tile.row}`

describe('mapa dos estados', () => {
  test('tem as 27 unidades da federação, sem repetir', () => {
    const codes = STATE_TILES.map((tile) => tile.code)
    expect(codes).toHaveLength(27)
    expect(new Set(codes).size).toBe(27)
  })

  test('nenhum estado sai da grade nem cobre outro', () => {
    const cells = STATE_TILES.map(cellOf)
    expect(new Set(cells).size).toBe(cells.length)
    for (const tile of STATE_TILES) {
      expect(tile.column).toBeLessThanOrEqual(MAP_COLUMNS)
      expect(tile.row).toBeLessThanOrEqual(MAP_ROWS)
    }
  })

  test('o Distrito Federal fica ao lado de Goiás e conta como atendido', () => {
    const df = STATE_TILES.find((tile) => tile.code === 'DF')
    const go = STATE_TILES.find((tile) => tile.code === 'GO')
    expect(df?.served).toBe(true)
    expect(df?.row).toBe(go?.row)
    expect(Math.abs((df?.column ?? 0) - (go?.column ?? 0))).toBe(1)
  })

  test('o total de estados atendidos vem do próprio mapa', () => {
    expect(SERVED_STATE_COUNT).toBe(STATE_TILES.filter((tile) => tile.served).length)
  })
})
