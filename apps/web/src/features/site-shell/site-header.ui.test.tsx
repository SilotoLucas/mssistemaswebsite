import { describe, expect, test } from 'bun:test'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NAVIGATION, SYSTEM_ACCESS } from '../../shared/config/site-config'
import { renderWithRouter } from '../../test/render-with-router'
import { SiteHeader } from './site-header'

const isHidden = (element: HTMLElement | null) => element?.hasAttribute('hidden') ?? true

describe('cabeçalho', () => {
  test('mostra todos os links de navegação principal', () => {
    renderWithRouter(<SiteHeader />)
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    for (const link of NAVIGATION) {
      expect(within(nav).getByRole('link', { name: link.label }).getAttribute('href')).toBe(
        link.href,
      )
    }
  })

  test('abre e fecha o menu do celular', async () => {
    const user = userEvent.setup()
    renderWithRouter(<SiteHeader />)
    const burger = screen.getByRole('button', { name: 'Abrir menu' })
    expect(burger.getAttribute('aria-expanded')).toBe('false')
    expect(isHidden(document.getElementById('ms-drawer'))).toBe(true)

    await user.click(burger)
    expect(burger.getAttribute('aria-expanded')).toBe('true')
    expect(burger.getAttribute('aria-label')).toBe('Fechar menu')
    expect(isHidden(document.getElementById('ms-drawer'))).toBe(false)

    await user.click(burger)
    expect(burger.getAttribute('aria-expanded')).toBe('false')
    expect(isHidden(document.getElementById('ms-drawer'))).toBe(true)
  })

  test('fecha o menu do celular com Escape e devolve o foco ao botão', async () => {
    const user = userEvent.setup()
    renderWithRouter(<SiteHeader />)
    const burger = screen.getByRole('button', { name: 'Abrir menu' })
    await user.click(burger)
    await user.keyboard('{Escape}')
    expect(isHidden(document.getElementById('ms-drawer'))).toBe(true)
    expect(document.activeElement).toBe(burger)
  })

  test('fecha o menu do celular ao escolher uma página', async () => {
    const user = userEvent.setup()
    renderWithRouter(<SiteHeader />)
    await user.click(screen.getByRole('button', { name: 'Abrir menu' }))
    const drawerNav = screen.getByRole('navigation', { name: 'Principal no celular' })
    await user.click(within(drawerNav).getByRole('link', { name: 'Soluções' }))
    expect(isHidden(document.getElementById('ms-drawer'))).toBe(true)
  })

  test('abre o menu de sistemas com os três acessos e fecha ao clicar fora', async () => {
    const user = userEvent.setup()
    renderWithRouter(<SiteHeader />)
    const trigger = screen.getByRole('button', { name: 'Acessar sistemas' })
    expect(isHidden(document.getElementById('ms-access-menu'))).toBe(true)

    await user.click(trigger)
    const menu = document.getElementById('ms-access-menu')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    for (const system of SYSTEM_ACCESS) {
      expect(
        within(menu as HTMLElement).getByRole('link', { name: new RegExp(system.name) }),
      ).toBeDefined()
    }

    await user.click(document.body)
    expect(isHidden(menu)).toBe(true)
  })

  test('a logo leva à página inicial', () => {
    renderWithRouter(<SiteHeader />)
    const logo = screen.getByRole('link', { name: /página inicial/i })
    expect(logo.getAttribute('href')).toBe('/')
  })
})
