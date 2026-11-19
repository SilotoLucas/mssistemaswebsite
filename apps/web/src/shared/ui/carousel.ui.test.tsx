import { describe, expect, test } from 'bun:test'
import { fireEvent, render, screen } from '@testing-library/react'
import { Carousel } from './carousel'

const slides = ['Inovação', 'Excelência', 'Compromisso'].map((name) => ({
  key: name,
  label: name,
  content: <p>{name}</p>,
}))

const visible = () =>
  screen
    .getAllByRole('article', { hidden: true })
    .filter((slide) => slide.getAttribute('aria-hidden') !== 'true')
    .map((slide) => slide.textContent)

const swipe = (element: HTMLElement, fromX: number, toX: number, y = 100) => {
  fireEvent.pointerDown(element, { pointerId: 1, isPrimary: true, clientX: fromX, clientY: y })
  fireEvent.pointerUp(element, { pointerId: 1, isPrimary: true, clientX: toX, clientY: y })
}

describe('carrossel de slides', () => {
  test('arrastar para a esquerda mostra o próximo slide', () => {
    render(<Carousel label="Pilares" slides={slides} />)
    swipe(screen.getByLabelText('Pilares'), 300, 200)
    expect(visible()).toEqual(['Excelência'])
  })

  test('arrastar para a direita volta ao slide anterior, passando do primeiro ao último', () => {
    render(<Carousel label="Pilares" slides={slides} />)
    swipe(screen.getByLabelText('Pilares'), 200, 300)
    expect(visible()).toEqual(['Compromisso'])
  })

  test('um toque curto ou um movimento vertical não trocam o slide', () => {
    render(<Carousel label="Pilares" slides={slides} />)
    const root = screen.getByLabelText('Pilares')
    swipe(root, 200, 215)
    fireEvent.pointerDown(root, { pointerId: 1, isPrimary: true, clientX: 200, clientY: 100 })
    fireEvent.pointerUp(root, { pointerId: 1, isPrimary: true, clientX: 150, clientY: 300 })
    expect(visible()).toEqual(['Inovação'])
  })
})
