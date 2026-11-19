import { describe, expect, test } from 'bun:test'
import { horizontalWheelDelta, isHorizontalGesture } from './gesture'

const wheel = (init: {
  deltaX?: number
  deltaY?: number
  shiftKey?: boolean
  deltaMode?: number
}) => ({
  deltaX: 0,
  deltaY: 0,
  deltaMode: 0,
  shiftKey: false,
  ...init,
})

describe('gestos dos carrosséis', () => {
  test('só conta como gesto lateral o movimento mais horizontal que vertical', () => {
    expect(isHorizontalGesture(-50, 10, 40)).toBe(true)
    expect(isHorizontalGesture(30, 0, 40)).toBe(false)
    expect(isHorizontalGesture(50, 60, 40)).toBe(false)
  })

  test('a roda vertical continua rolando a página', () => {
    expect(horizontalWheelDelta(wheel({ deltaY: 120 }))).toBe(0)
  })

  test('roda em linhas vira pixels', () => {
    expect(horizontalWheelDelta(wheel({ deltaX: 3, deltaMode: 1 }))).toBe(48)
  })

  test('o trackpad lateral e Shift com a roda movem o carrossel', () => {
    expect(horizontalWheelDelta(wheel({ deltaX: 40, deltaY: 4 }))).toBe(40)
    expect(horizontalWheelDelta(wheel({ deltaY: 100, shiftKey: true }))).toBe(100)
  })
})
