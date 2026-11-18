import { describe, expect, test } from 'bun:test'
import { screen, within } from '@testing-library/react'
import { SUPPORT_URL } from '../../shared/config/site-config'
import { renderWithRouter } from '../../test/render-with-router'
import { SUPPORT_DOWNLOADS } from './support-content'
import { SupportPage } from './support-page'

describe('página de suporte', () => {
  test('leva ao MS Suporte e mostra os telefones da MS', () => {
    renderWithRouter(<SupportPage />)
    const call = screen.getByRole('link', { name: 'Abrir chamado no MS Suporte' })
    expect(call.getAttribute('href')).toBe(SUPPORT_URL)
    expect(screen.getAllByRole('link', { name: /\(14\) 38\d\d-\d{4}/ }).length).toBeGreaterThan(0)
  })

  test('links de download são https, abrem em nova aba e não usam o site legado', () => {
    renderWithRouter(<SupportPage />)
    const section = document.getElementById('downloads') as HTMLElement
    const external = within(section)
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('http'))
    expect(external).toHaveLength(SUPPORT_DOWNLOADS.filter((item) => item.href).length)
    for (const link of external) {
      expect(link.getAttribute('href')).toStartWith('https://')
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toContain('noopener')
    }
  })

  test('ferramentas sem link público mandam falar com um consultor', () => {
    renderWithRouter(<SupportPage />)
    const section = document.getElementById('downloads') as HTMLElement
    const pending = SUPPORT_DOWNLOADS.filter((item) => item.href === null)
    expect(within(section).getAllByRole('link', { name: /Falar com consultor/ })).toHaveLength(
      pending.length,
    )
  })

  test('não oferece ferramentas descontinuadas', () => {
    renderWithRouter(<SupportPage />)
    expect(screen.queryByText(/skype/i)).toBeNull()
    expect(screen.queryByText(/ultra ?vnc/i)).toBeNull()
  })
})
