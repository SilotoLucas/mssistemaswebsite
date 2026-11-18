import { describe, expect, test } from 'bun:test'
import { COMPANY_VALUES, TEAM_MEMBERS } from './company-content'

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

  test('mantém as nove pessoas da equipe sem repetição', () => {
    expect(new Set(TEAM_MEMBERS).size).toBe(9)
  })
})
