import { describe, expect, test } from 'bun:test'
import { PRODUCTS, productHref } from '../../../shared/config/products'
import { renderWithRouter } from '../../../test/render-with-router'
import { ProductsSection } from './products-section'

describe('carrossel de produtos da home', () => {
  test('tem um slide para cada produto, e o slide inteiro leva à página do produto', () => {
    renderWithRouter(<ProductsSection />)
    const slides = [...document.querySelectorAll<HTMLElement>('#produtos .ms-car__slide')]
    expect(slides).toHaveLength(PRODUCTS.length)
    slides.forEach((slide, index) => {
      const product = PRODUCTS[index]
      const link = slide.querySelector('a.ms-pdh')
      expect(link?.getAttribute('href')).toBe(productHref(product?.slug ?? 'app'))
      expect(link?.textContent).toContain(product?.headline ?? '')
    })
  })

  test('tem setas e um atalho para todos os produtos', () => {
    renderWithRouter(<ProductsSection />)
    expect(document.querySelector('#produtos [aria-label="Próximo slide"]')).not.toBeNull()
    const all = [...document.querySelectorAll('#produtos a')].find(
      (link) => link.textContent === 'Ver todos os produtos',
    )
    expect(all?.getAttribute('href')).toBe('/produtos')
  })
})
