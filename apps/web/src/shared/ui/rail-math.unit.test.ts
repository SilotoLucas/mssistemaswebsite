import { describe, expect, test } from 'bun:test'
import { easeOutCubic, nearestStep, shortestDelta, wrapOffset } from './rail-math'

describe('trilho contínuo', () => {
  test('mantém o deslocamento dentro de um conjunto de cartões', () => {
    expect(wrapOffset(1100, 1000)).toBe(100)
    expect(wrapOffset(-100, 1000)).toBe(900)
  })

  test('encontra o cartão mais próximo', () => {
    expect(nearestStep(510, 368)).toBe(368)
    expect(nearestStep(600, 368)).toBe(736)
  })

  test('escolhe o menor caminho, inclusive passando pela emenda', () => {
    expect(shortestDelta(100, 300, 1000)).toBe(200)
    expect(shortestDelta(900, 100, 1000)).toBe(200)
    expect(shortestDelta(100, 900, 1000)).toBe(-200)
  })

  test('começa e termina a animação nos extremos', () => {
    expect(easeOutCubic(0)).toBe(0)
    expect(easeOutCubic(1)).toBe(1)
  })
})
