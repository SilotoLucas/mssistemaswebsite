import { describe, expect, test } from 'bun:test'
import { SOLUTION_COUNT, SOLUTION_GROUPS } from './solutions-catalog'

describe('catálogo de soluções', () => {
  test('mantém as 24 soluções divulgadas na home', () => {
    expect(SOLUTION_COUNT).toBe(24)
  })

  test('usa endereços únicos para grupos e soluções', () => {
    const slugs = SOLUTION_GROUPS.flatMap((group) => [
      group.slug,
      ...group.solutions.map((solution) => solution.slug),
    ])
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  test('toda solução informa ao menos uma função', () => {
    const empty = SOLUTION_GROUPS.flatMap((group) => group.solutions).filter(
      (solution) => solution.features.length === 0,
    )
    expect(empty).toEqual([])
  })
})
