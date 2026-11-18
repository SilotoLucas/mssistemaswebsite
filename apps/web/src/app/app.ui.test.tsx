import { describe, expect, test } from 'bun:test'
import { screen, waitFor } from '@testing-library/react'
import { NAVIGATION } from '../shared/config/site-config'
import { renderRoute } from '../test/render-route'

const ROUTES = [
  ['/', 'MS Sistemas'],
  ['/solucoes', 'Soluções | MS Sistemas'],
  ['/clientes', 'Clientes | MS Sistemas'],
  ['/suporte', 'Suporte | MS Sistemas'],
  ['/empresa', 'Empresa | MS Sistemas'],
  ['/contato', 'Contato | MS Sistemas'],
  ['/acessar-sistemas', 'Acessar sistemas | MS Sistemas'],
  ['/politica-de-privacidade', 'Política de Privacidade | MS Sistemas'],
] as const

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

  test('o botão flutuante do WhatsApp aparece nas telas e some no formulário de contato', () => {
    const home = renderRoute('/')
    expect(screen.getByRole('link', { name: 'Falar com um consultor no WhatsApp' })).toBeDefined()
    home.unmount()
    renderRoute('/contato')
    expect(screen.queryByRole('link', { name: 'Falar com um consultor no WhatsApp' })).toBeNull()
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
