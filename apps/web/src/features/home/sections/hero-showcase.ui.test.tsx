import { describe, expect, test } from 'bun:test'
import { screen } from '@testing-library/react'
import { PRODUCTS, productHref } from '../../../shared/config/products'
import { renderWithRouter } from '../../../test/render-with-router'
import { HeroShowcase } from './hero-showcase'

describe('HeroShowcase', () => {
  test('é um carrossel com um slide para cada produto', () => {
    renderWithRouter(<HeroShowcase />)
    const slides = document.querySelectorAll('.ms-car__slide')
    expect(slides).toHaveLength(PRODUCTS.length)
    PRODUCTS.forEach((product, index) => {
      expect(slides[index]?.getAttribute('aria-label')).toContain(product.name)
    })
  })

  test('cada slide leva à página do seu produto', () => {
    renderWithRouter(<HeroShowcase />)
    for (const product of PRODUCTS) {
      const link = document.querySelector(`a[href="${productHref(product.slug)}"]`)
      expect(link).not.toBeNull()
    }
  })

  test('mostra primeiro o slide do primeiro produto e tem setas de troca', () => {
    renderWithRouter(<HeroShowcase />)
    expect(document.querySelector('.ms-car__slide.is-on')?.getAttribute('aria-label')).toContain(
      PRODUCTS[0]?.name,
    )
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(2)
  })
})
