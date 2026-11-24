import { describe, expect, test } from 'bun:test'
import { screen } from '@testing-library/react'
import { PRODUCTS, productHref } from '../../../shared/config/products'
import { renderWithRouter } from '../../../test/render-with-router'
import { ProductsSection } from './products-section'

describe('ProductsSection', () => {
  test('é um carrossel com um slide para cada produto, que leva à página dele', () => {
    renderWithRouter(<ProductsSection />)
    const slides = document.querySelectorAll('.ms-car__slide')
    expect(slides).toHaveLength(PRODUCTS.length)
    PRODUCTS.forEach((product, index) => {
      expect(slides[index]?.querySelector('a')?.getAttribute('href')).toBe(
        productHref(product.slug),
      )
    })
  })

  test('tem o link para ver todos os produtos', () => {
    renderWithRouter(<ProductsSection />)
    expect(screen.getByRole('link', { name: 'Ver todos os produtos' }).getAttribute('href')).toBe(
      '/produtos',
    )
  })
})
