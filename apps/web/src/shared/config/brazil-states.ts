export type StateTile = {
  readonly code: string
  readonly name: string
  readonly column: number
  readonly row: number
  readonly served: boolean
}

export const MAP_COLUMNS = 7
export const MAP_ROWS = 8

export const STATE_TILES: readonly StateTile[] = [
  { code: 'RR', name: 'Roraima', column: 3, row: 1, served: false },
  { code: 'AP', name: 'Amapá', column: 4, row: 1, served: false },
  { code: 'AM', name: 'Amazonas', column: 3, row: 2, served: true },
  { code: 'PA', name: 'Pará', column: 4, row: 2, served: true },
  { code: 'MA', name: 'Maranhão', column: 5, row: 2, served: false },
  { code: 'CE', name: 'Ceará', column: 6, row: 2, served: false },
  { code: 'RN', name: 'Rio Grande do Norte', column: 7, row: 2, served: true },
  { code: 'AC', name: 'Acre', column: 1, row: 3, served: false },
  { code: 'RO', name: 'Rondônia', column: 2, row: 3, served: true },
  { code: 'MT', name: 'Mato Grosso', column: 3, row: 3, served: false },
  { code: 'TO', name: 'Tocantins', column: 4, row: 3, served: false },
  { code: 'PI', name: 'Piauí', column: 5, row: 3, served: true },
  { code: 'PB', name: 'Paraíba', column: 6, row: 3, served: true },
  { code: 'GO', name: 'Goiás', column: 3, row: 4, served: true },
  { code: 'DF', name: 'Distrito Federal', column: 4, row: 4, served: true },
  { code: 'BA', name: 'Bahia', column: 5, row: 4, served: true },
  { code: 'PE', name: 'Pernambuco', column: 6, row: 4, served: true },
  { code: 'AL', name: 'Alagoas', column: 7, row: 4, served: true },
  { code: 'MS', name: 'Mato Grosso do Sul', column: 3, row: 5, served: true },
  { code: 'MG', name: 'Minas Gerais', column: 4, row: 5, served: true },
  { code: 'ES', name: 'Espírito Santo', column: 5, row: 5, served: true },
  { code: 'SE', name: 'Sergipe', column: 6, row: 5, served: true },
  { code: 'PR', name: 'Paraná', column: 3, row: 6, served: true },
  { code: 'SP', name: 'São Paulo', column: 4, row: 6, served: true },
  { code: 'RJ', name: 'Rio de Janeiro', column: 5, row: 6, served: true },
  { code: 'SC', name: 'Santa Catarina', column: 3, row: 7, served: true },
  { code: 'RS', name: 'Rio Grande do Sul', column: 3, row: 8, served: true },
]

export const SERVED_STATE_COUNT = STATE_TILES.filter((tile) => tile.served).length
