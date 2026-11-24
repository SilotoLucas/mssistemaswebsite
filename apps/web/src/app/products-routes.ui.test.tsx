import { describe, expect, test } from 'bun:test'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
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

  test('o MS App mostra uma tela por vez e troca pelo passo escolhido', () => {
    renderRoute('/produtos/app')
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(3)
    expect(tabs[0]?.getAttribute('aria-selected')).toBe('true')
    const panel = screen.getByRole('tabpanel')
    expect(panel.querySelectorAll('.ms-tour__slot.is-on')).toHaveLength(1)
    fireEvent.click(tabs[2] as HTMLElement)
    expect(tabs[2]?.getAttribute('aria-selected')).toBe('true')
    expect(tabs[0]?.getAttribute('aria-selected')).toBe('false')
  })

  test('o MS Dashboard mostra a tela do painel em uma moldura de navegador', () => {
    renderRoute('/produtos/dashboard')
    expect(document.querySelector('#detalhes .ms-bf')).not.toBeNull()
  })

  test('só mostra a seção "para quem é" quando o produto tem passos', () => {
    renderRoute('/produtos/dashboard')
    expect(document.getElementById('para-quem')).toBeNull()
    renderRoute('/produtos/smallbusiness')
    expect(document.getElementById('para-quem')).not.toBeNull()
  })

  test('o SmallBusiness mostra o que vem no pacote', () => {
    renderRoute('/produtos/smallbusiness')
    expect(document.querySelectorAll('#detalhes .ms-pd-perk').length).toBeGreaterThan(0)
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
