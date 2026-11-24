import { describe, expect, test } from 'bun:test'
import { screen, waitFor, within } from '@testing-library/react'
import { PRODUCTS, productHref } from '../shared/config/products'
import { renderRoute } from '../test/render-route'

describe('páginas de produto', () => {
  for (const product of PRODUCTS) {
    test(`${product.name} tem a trilha, o título e as seções do produto`, () => {
      renderRoute(productHref(product.slug))
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(product.headline)
      const crumb = screen.getByRole('navigation', { name: 'Você está em' })
      expect(within(crumb).getByRole('link', { name: 'Produtos' }).getAttribute('href')).toBe(
        '/produtos',
      )
      expect(document.getElementById('recursos')?.textContent).toContain(product.featuresTitle)
      expect(document.getElementById('vantagens')?.textContent).toContain(product.reasonsTitle)
      for (const feature of product.features) {
        expect(screen.getAllByText(feature.title).length).toBeGreaterThan(0)
      }
    })
  }

  test('a página de um produto mostra os outros dois, e não ele mesmo', () => {
    renderRoute('/produtos/app')
    const others = document.getElementById('outros-produtos') as HTMLElement
    const links = within(others)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
    expect(links).toEqual(['/produtos/smallbusiness', '/produtos/dashboard'])
  })

  test('o MS App mostra as três telas do app', () => {
    renderRoute('/produtos/app')
    const details = document.getElementById('detalhes') as HTMLElement
    expect(details.querySelectorAll('.ms-pd-screens .ms-phone')).toHaveLength(3)
  })

  test('só o MS Dashboard tem vídeo', () => {
    renderRoute('/produtos/dashboard')
    expect(document.getElementById('video')).not.toBeNull()
  })

  test('um produto que não existe volta para a lista de produtos', async () => {
    renderRoute('/produtos/nao-existe')
    await waitFor(() => expect(document.title).toBe('Produtos | MS Sistemas'))
  })

  test('a lista de produtos leva a cada página de produto', () => {
    renderRoute('/produtos')
    for (const product of PRODUCTS) {
      const links = screen
        .getAllByRole('link', { name: new RegExp(product.name) })
        .map((link) => link.getAttribute('href'))
      expect(links).toContain(productHref(product.slug))
    }
  })
})
