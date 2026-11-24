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
      expect(
        within(crumb).getByRole('link', { name: 'Soluções digitais' }).getAttribute('href'),
      ).toBe('/solucoes-digitais')
      expect(document.getElementById('recursos')?.textContent).toContain(product.featuresTitle)
      expect(document.getElementById('vantagens')?.textContent).toContain(product.reasonsTitle)
      for (const feature of product.features) {
        expect(screen.getAllByText(feature.title).length).toBeGreaterThan(0)
      }
    })
  }

  test('a página de um produto mostra os outros dois, e não ele mesmo', () => {
    renderRoute('/solucoes-digitais/app')
    const others = document.getElementById('outras-solucoes') as HTMLElement
    const links = within(others)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
    expect(links).toEqual(['/solucoes-digitais/smallbusiness', '/solucoes-digitais/dashboard'])
  })

  test('o MS App mostra uma tela por vez e troca pelo passo escolhido', () => {
    renderRoute('/solucoes-digitais/app')
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
    renderRoute('/solucoes-digitais/dashboard')
    expect(document.querySelector('#detalhes .ms-bf')).not.toBeNull()
  })

  test('só mostra a seção "para quem é" quando o produto tem passos', () => {
    renderRoute('/solucoes-digitais/dashboard')
    expect(document.getElementById('para-quem')).toBeNull()
    renderRoute('/solucoes-digitais/smallbusiness')
    expect(document.getElementById('para-quem')).not.toBeNull()
  })

  test('o SmallBusiness mostra o que vem no pacote', () => {
    renderRoute('/solucoes-digitais/smallbusiness')
    expect(document.querySelectorAll('#detalhes .ms-pd-perk').length).toBeGreaterThan(0)
  })

  test('só o MS Dashboard tem vídeo', () => {
    renderRoute('/solucoes-digitais/dashboard')
    expect(document.getElementById('video')).not.toBeNull()
  })

  test('um produto que não existe volta para a lista de soluções digitais', async () => {
    renderRoute('/solucoes-digitais/nao-existe')
    await waitFor(() => expect(document.title).toBe('Soluções digitais | MS Sistemas'))
  })

  test('a lista de produtos leva a cada página de produto', () => {
    renderRoute('/solucoes-digitais')
    for (const product of PRODUCTS) {
      const links = screen
        .getAllByRole('link', { name: new RegExp(product.name) })
        .map((link) => link.getAttribute('href'))
      expect(links).toContain(productHref(product.slug))
    }
  })
})

describe('endereços antigos de produtos', () => {
  test('/produtos leva para as soluções digitais', async () => {
    renderRoute('/produtos')
    await waitFor(() => expect(document.title).toBe('Soluções digitais | MS Sistemas'))
  })

  test('/produtos/app leva para a página do MS App', async () => {
    renderRoute('/produtos/app')
    await waitFor(() => expect(document.title).toBe('MS App | MS Sistemas'))
  })
})

describe('ligação com a tela de soluções', () => {
  test('os módulos do SmallBusiness são botões que levam à tela de soluções', () => {
    renderRoute('/solucoes-digitais/smallbusiness')
    const cards = document.querySelectorAll<HTMLAnchorElement>('#recursos a.ms-pd-card__open')
    const hrefs = Array.from(cards).map((link) => link.getAttribute('href'))
    expect(hrefs).toEqual([
      '/solucoes#planos-funerarios',
      '/solucoes#funerarias',
      '/solucoes#cobranca-bancaria',
      '/solucoes#caixa-matriz',
    ])
  })

  test('o MS App e o MS Dashboard têm um botão para o módulo na tela de soluções', () => {
    renderRoute('/solucoes-digitais/app')
    expect(document.querySelector('#destaques a[href="/solucoes#app-do-associado"]')).not.toBeNull()
  })
})
