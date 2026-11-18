import { describe, expect, test } from 'bun:test'
import { countAt, easeOutCubic } from './count-up-math'

describe('easeOutCubic', () => {
  test('começa em 0 e termina em 1', () => {
    expect(easeOutCubic(0)).toBe(0)
    expect(easeOutCubic(1)).toBe(1)
  })

  test('avança mais rápido no começo', () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5)
  })
})

describe('countAt', () => {
  test('devolve 0 antes de começar', () => {
    expect(countAt(300, 0, 1000)).toBe(0)
    expect(countAt(300, -50, 1000)).toBe(0)
  })

  test('devolve o alvo ao fim e depois dele', () => {
    expect(countAt(300, 1000, 1000)).toBe(300)
    expect(countAt(300, 5000, 1000)).toBe(300)
  })

  test('devolve inteiros durante a contagem', () => {
    expect(Number.isInteger(countAt(18, 333, 1000))).toBe(true)
  })
})
