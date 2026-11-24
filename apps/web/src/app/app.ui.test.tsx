import { describe, expect, test } from 'bun:test'
import { screen, waitFor } from '@testing-library/react'
import { HIDDEN_PAGES, NAVIGATION } from '../shared/config/site-config'
import { WhatsappFab } from '../shared/ui/whatsapp-fab'
import { renderRoute } from '../test/render-route'
import { renderWithRouter } from '../test/render-with-router'

const ALL_ROUTES = [
  ['/', 'MS Sistemas'],
  ['/solucoes', 'Soluções | MS Sistemas'],
  ['/smallbusiness', 'SmallBusiness | MS Sistemas'],
  ['/app', 'MS App | MS Sistemas'],
  ['/dashboard', 'MS Dashboard | MS Sistemas'],
  ['/videos', 'Vídeos | MS Sistemas'],
  ['/clientes', 'Clientes | MS Sistemas'],
  ['/suporte', 'Suporte | MS Sistemas'],
  ['/empresa', 'Empresa | MS Sistemas'],
  ['/contato', 'Contato | MS Sistemas'],
  ['/demonstracao', 'Solicitar demonstração | MS Sistemas'],
  ['/acessar-sistemas', 'Acessar sistemas | MS Sistemas'],
  ['/politica-de-privacidade', 'Política de Privacidade | MS Sistemas'],
] as const

const ROUTES = ALL_ROUTES.filter(([path]) => !HIDDEN_PAGES.includes(path))

describe('rotas', () => {
  for (const [path, title] of ROUTES) {
    test(`${path} tem um único h1 e o título da página`, async () => {
      renderRoute(path)
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
      if (path !== '/') await waitFor(() => expect(document.title).toBe(title))
    })
  }

  test('todo link da navegação principal leva a uma página existente', () => {
    for (const link of NAVIGATION) {
      const path = link.href.split('#')[0] ?? ''
      const { unmount } = renderRoute(path)
      expect(screen.queryByText('Página não encontrada')).toBeNull()
      unmount()
    }
  })

  test('o botão flutuante do WhatsApp aparece nas telas e some nas telas de formulário', () => {
    const home = renderRoute('/')
    expect(screen.getByRole('link', { name: 'Fale conosco pelo WhatsApp' })).toBeDefined()
    home.unmount()
    for (const path of ['/contato', '/demonstracao']) {
      const fab = renderWithRouter(<WhatsappFab />, path)
      expect(screen.queryByRole('link', { name: 'Fale conosco pelo WhatsApp' })).toBeNull()
      fab.unmount()
    }
  })

  test('endereço desconhecido mostra a página não encontrada', () => {
    renderRoute('/nao-existe')
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined()
    expect(screen.getByText(/não encontr/i)).toBeDefined()
  })

  test('cada página tem rodapé com o link da política de privacidade', () => {
    for (const [path] of ROUTES) {
      const { unmount } = renderRoute(path)
      const links = screen.getAllByRole('link', { name: 'Política de Privacidade' })
      expect(links.every((link) => link.getAttribute('href') === '/politica-de-privacidade')).toBe(
        true,
      )
      unmount()
    }
  })
})

describe('telas ocultas', () => {
  for (const path of HIDDEN_PAGES) {
    test(`${path} volta para a página inicial e sai do menu`, async () => {
      const home = renderRoute('/')
      const homeTitle = screen.getByRole('heading', { level: 1 }).textContent
      home.unmount()
      renderRoute(path)
      await waitFor(() =>
        expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(homeTitle),
      )
      expect(NAVIGATION.some((link) => link.href === path)).toBe(false)
      const hiddenLinks = [...document.querySelectorAll('a')].filter((link) =>
        link.getAttribute('href')?.startsWith(path),
      )
      expect(hiddenLinks).toHaveLength(0)
    })
  }
})
