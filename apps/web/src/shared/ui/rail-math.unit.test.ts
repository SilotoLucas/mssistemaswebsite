import { describe, expect, test } from 'bun:test'
import { easeOutCubic, nearestStep, shortestDelta, snapAfterDrag, wrapOffset } from './rail-math'

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

  test('ao soltar o arraste, encaixa no cartão mais próximo', () => {
    expect(snapAfterDrag(400, 0, 368, 160)).toBe(368)
    expect(snapAfterDrag(560, 0, 368, 160)).toBe(736)
  })

  test('um gesto rápido avança no sentido do movimento, no máximo um cartão', () => {
    expect(snapAfterDrag(368, -1.5, 368, 160)).toBe(736)
    expect(snapAfterDrag(368, 1.5, 368, 160)).toBe(0)
    expect(snapAfterDrag(368, -50, 368, 160)).toBe(736)
  })
})
