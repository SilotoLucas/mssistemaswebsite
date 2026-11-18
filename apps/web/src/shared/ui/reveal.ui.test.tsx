import { afterEach, describe, expect, test } from 'bun:test'
import { act, render, screen, waitFor } from '@testing-library/react'
import { CountUp } from './count-up'
import { Reveal } from './reveal'

type ObserverCallback = (entries: { isIntersecting: boolean }[]) => void

const original = globalThis.IntersectionObserver

const installObserver = () => {
  const state: { callback: ObserverCallback | null; disconnected: boolean } = {
    callback: null,
    disconnected: false,
  }
  class FakeObserver {
    constructor(callback: ObserverCallback) {
      state.callback = callback
    }
    observe() {}
    disconnect() {
      state.disconnected = true
    }
  }
  globalThis.IntersectionObserver = FakeObserver as unknown as typeof IntersectionObserver
  return state
}

afterEach(() => {
  globalThis.IntersectionObserver = original
})

describe('Reveal', () => {
  test('mostra o conteúdo na hora quando o navegador não tem IntersectionObserver', () => {
    globalThis.IntersectionObserver = undefined as unknown as typeof IntersectionObserver
    render(<Reveal>Conteúdo</Reveal>)
    expect(screen.getByText('Conteúdo').classList.contains('is-in')).toBe(true)
  })

  test('só marca como visto quando entra na tela e para de observar', async () => {
    const state = installObserver()
    render(<Reveal className="extra">Conteúdo</Reveal>)
    const node = screen.getByText('Conteúdo')
    expect(node.classList.contains('is-in')).toBe(false)
    expect(node.classList.contains('extra')).toBe(true)

    act(() => state.callback?.([{ isIntersecting: false }]))
    expect(node.classList.contains('is-in')).toBe(false)

    act(() => state.callback?.([{ isIntersecting: true }]))
    await waitFor(() => expect(node.classList.contains('is-in')).toBe(true))
    expect(state.disconnected).toBe(true)
  })

  test('aplica o atraso de entrada', () => {
    globalThis.IntersectionObserver = undefined as unknown as typeof IntersectionObserver
    render(<Reveal delay={120}>Conteúdo</Reveal>)
    expect(screen.getByText('Conteúdo').style.transitionDelay).toBe('120ms')
  })
})

describe('CountUp', () => {
  test('expõe o valor final para leitores de tela desde o início', () => {
    installObserver()
    render(<CountUp target={300} prefix="+" />)
    expect(screen.getByText('+300', { selector: '.ms-sr' })).toBeDefined()
  })

  test('chega ao valor final depois de entrar na tela', async () => {
    globalThis.IntersectionObserver = undefined as unknown as typeof IntersectionObserver
    const { container } = render(<CountUp target={18} durationMs={40} />)
    await waitFor(() =>
      expect(container.querySelector('[aria-hidden="true"]')?.textContent).toBe('18'),
    )
  })
})
