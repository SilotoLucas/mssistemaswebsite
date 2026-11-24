import { describe, expect, test } from 'bun:test'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../test/render-with-router'
import { SiteLink } from './site-link'

describe('links do site', () => {
  test('um link para outro site abre em nova aba, sem dar acesso à página', () => {
    renderWithRouter(<SiteLink href="https://www.instagram.com/mssistemas5">Instagram</SiteLink>)
    const link = screen.getByRole('link', { name: 'Instagram' })
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  })

  test('páginas do próprio site, telefone e e-mail continuam na mesma aba', () => {
    renderWithRouter(
      <>
        <SiteLink href="/suporte">Suporte</SiteLink>
        <SiteLink href="tel:1438157777">Telefone</SiteLink>
        <SiteLink href="mailto:contato@exemplo.com.br">E-mail</SiteLink>
      </>,
    )
    for (const name of ['Suporte', 'Telefone', 'E-mail']) {
      expect(screen.getByRole('link', { name }).getAttribute('target')).toBeNull()
    }
  })
})
