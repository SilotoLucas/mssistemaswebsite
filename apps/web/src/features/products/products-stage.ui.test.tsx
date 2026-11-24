import { describe, expect, test } from 'bun:test'
import { screen } from '@testing-library/react'
import { PRODUCTS, productHref } from '../../shared/config/products'
import { renderWithRouter } from '../../test/render-with-router'
import { ProductsStage } from './products-stage'

describe('ProductsStage', () => {
  test('mostra um atalho para cada produto, sem slides', () => {
    renderWithRouter(<ProductsStage />)
    for (const product of PRODUCTS) {
      const link = screen.getByRole('link', { name: new RegExp(product.name) })
      expect(link.getAttribute('href')).toBe(productHref(product.slug))
    }
    expect(screen.queryByRole('group', { name: /slide/i })).toBeNull()
  })

  test('mostra o painel e o celular com imagens de tamanho fixo', () => {
    const { container } = renderWithRouter(<ProductsStage />)
    const images = Array.from(container.querySelectorAll('img[width][height]'))
    expect(images.length).toBeGreaterThanOrEqual(2)
  })
})
