import { describe, expect, mock, test } from 'bun:test'
import { fireEvent, render, screen } from '@testing-library/react'
import { AutoRail } from './auto-rail'

const renderRail = (onOpen: () => void) =>
  render(
    <AutoRail
      items={['Eduardo', 'Simone', 'Marcello']}
      label="Equipe"
      getKey={(name) => name}
      renderItem={(name, copy) => (
        <button type="button" tabIndex={copy ? -1 : undefined} onClick={onOpen}>
          {name}
        </button>
      )}
    />,
  )

const pointer = { pointerId: 1, isPrimary: true, clientY: 100 }

describe('faixa automática', () => {
  test('um clique sem arrastar abre o cartão', () => {
    const onOpen = mock(() => undefined)
    renderRail(onOpen)
    const [button] = screen.getAllByRole('button', { name: 'Simone', hidden: true })
    if (!button) throw new Error('cartão ausente')
    fireEvent.pointerDown(button, { ...pointer, clientX: 200 })
    fireEvent.pointerUp(button, { ...pointer, clientX: 202 })
    fireEvent.click(button)
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  test('arrastar os cartões não abre o cartão ao soltar', () => {
    const onOpen = mock(() => undefined)
    renderRail(onOpen)
    const [button] = screen.getAllByRole('button', { name: 'Simone', hidden: true })
    if (!button) throw new Error('cartão ausente')
    fireEvent.pointerDown(button, { ...pointer, clientX: 300 })
    fireEvent.pointerMove(button, { ...pointer, clientX: 260 })
    fireEvent.pointerMove(button, { ...pointer, clientX: 180 })
    fireEvent.pointerUp(button, { ...pointer, clientX: 180 })
    fireEvent.click(button)
    expect(onOpen).not.toHaveBeenCalled()
  })
})
