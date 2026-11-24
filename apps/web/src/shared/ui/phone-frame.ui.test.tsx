import { describe, expect, test } from 'bun:test'
import { render } from '@testing-library/react'
import { PhoneFrame } from './phone-frame'

describe('PhoneFrame', () => {
  test('mostra a tela inteira, sem recorte, com o tamanho original da imagem', () => {
    const { container } = render(
      <PhoneFrame src="/tela.webp" alt="Tela" width={745} height={1441} />,
    )
    const image = container.querySelector('img')
    expect(image?.getAttribute('width')).toBe('745')
    expect(image?.getAttribute('height')).toBe('1441')
    expect(container.querySelector('.ms-phone__body img')).not.toBeNull()
  })

  test('calcula a proporção da moldura a partir da imagem', () => {
    const { container } = render(
      <PhoneFrame src="/tela.webp" alt="Tela" width={500} height={1000} />,
    )
    const frame = container.querySelector<HTMLElement>('.ms-phone')
    expect(frame?.style.getPropertyValue('--ar')).toBe(`1 / ${0.96 * 2 + 0.13}`)
  })
})
