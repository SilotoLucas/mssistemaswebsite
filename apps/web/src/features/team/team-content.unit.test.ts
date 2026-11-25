import { describe, expect, test } from 'bun:test'
import { memberBio, TEAM_FRONTS, TEAM_MEMBERS } from './team-content'

describe('conteúdo da equipe', () => {
  test('mantém as quinze pessoas da equipe sem repetição', () => {
    expect(new Set(TEAM_MEMBERS.map((member) => member.name)).size).toBe(15)
  })

  test('traz a equipe atual e não traz quem saiu', () => {
    const names = TEAM_MEMBERS.map((member) => member.name)
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
      expect(names).toContain(name)
    }
    expect(names).not.toContain('Leandro')
    expect(names).not.toContain('André')
  })

  test('usa o texto próprio da pessoa quando existe e um texto padrão quando não', () => {
    expect(memberBio({ name: 'Ana', bio: 'Texto da Ana.' })).toBe('Texto da Ana.')
    expect(memberBio({ name: 'Ana' })).toContain('Ana faz parte da equipe da MS Sistemas')
  })

  test('apresenta as frentes de suporte e de desenvolvimento', () => {
    expect(TEAM_FRONTS.map((front) => front.kicker)).toEqual(['Suporte', 'Desenvolvimento'])
  })
})
