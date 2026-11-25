import { describe, expect, test } from 'bun:test'
import { COMPANY_VALUES } from './company-content'

describe('conteúdo da empresa', () => {
  test('mantém os cinco valores publicados', () => {
    expect(COMPANY_VALUES.map((value) => value.name)).toEqual([
      'Honestidade',
      'Competência',
      'Agilidade',
      'Comprometimento',
      'Ética',
    ])
  })
})
