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

  test('mantém as quinze pessoas da equipe sem repetição', () => {
    expect(new Set(TEAM_MEMBERS).size).toBe(15)
  })

  test('traz a equipe atual e não traz quem saiu', () => {
    const team: readonly string[] = TEAM_MEMBERS
    for (const name of [
      'Lucas',
      'Pedro',
      'Paulo',
      'Vinícius',
      'Marco',
      'Kaick',
      'David',
      'Matheus',
    ]) {
      expect(team).toContain(name)
    }
    expect(team).not.toContain('Leandro')
    expect(team).not.toContain('André')
  })
})
