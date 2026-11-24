import { describe, expect, test } from 'bun:test'
import { PRODUCTS, productHref } from '../../../shared/config/products'
import { renderWithRouter } from '../../../test/render-with-router'
import { ProductsSection } from './products-section'

describe('ProductsSection', () => {
  test('é um carrossel com um slide para cada solução, que leva à rota dela', () => {
    renderWithRouter(<ProductsSection />)
    const slides = document.querySelectorAll('.ms-car__slide')
    expect(slides).toHaveLength(PRODUCTS.length)
    PRODUCTS.forEach((product, index) => {
      expect(slides[index]?.querySelector('.ms-pdh__go')?.getAttribute('href')).toBe(
        productHref(product.slug),
      )
    })
  })
})
