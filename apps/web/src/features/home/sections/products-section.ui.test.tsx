import { describe, expect, test } from 'bun:test'
import { screen } from '@testing-library/react'
import { PRODUCTS, productHref } from '../../../shared/config/products'
import { renderWithRouter } from '../../../test/render-with-router'
import { ProductsSection } from './products-section'

describe('ProductsSection', () => {
  test('mostra os três produtos em cartões que levam à página de cada um', () => {
    renderWithRouter(<ProductsSection />)
    for (const product of PRODUCTS) {
      const link = screen.getByRole('link', { name: new RegExp(`Conhecer o ${product.name}`) })
      expect(link.getAttribute('href')).toBe(productHref(product.slug))
    }
  })

  test('tem o link para ver todos os produtos', () => {
    renderWithRouter(<ProductsSection />)
    expect(screen.getByRole('link', { name: 'Ver todos os produtos' }).getAttribute('href')).toBe(
      '/produtos',
    )
  })

  test('não repete as telas da abertura: não há imagens do app nem do painel', () => {
    const { container } = renderWithRouter(<ProductsSection />)
    expect(container.querySelector('.ms-phone')).toBeNull()
    expect(container.querySelector('.ms-bf')).toBeNull()
  })
})
