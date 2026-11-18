import { describe, expect, test } from 'bun:test'
import { screen, within } from '@testing-library/react'
import { COMPANY_EMAIL } from '../../shared/config/company-info'
import { renderWithRouter } from '../../test/render-with-router'
import { POLICY_SECTIONS } from './privacy-content'
import { PrivacyPage } from './privacy-page'

describe('política de privacidade', () => {
  test('o sumário tem um link para cada seção e todos apontam para um id existente', () => {
    renderWithRouter(<PrivacyPage />, '/politica-de-privacidade')
    const toc = screen.getByRole('navigation', { name: 'Neste documento' })
    const links = within(toc).getAllByRole('link')
    expect(links).toHaveLength(POLICY_SECTIONS.length)
    for (const link of links) {
      const id = link.getAttribute('href')?.split('#')[1] ?? ''
      expect(document.getElementById(id)).not.toBeNull()
    }
  })

  test('traz o canal para exercer direitos', () => {
    renderWithRouter(<PrivacyPage />)
    const mail = screen.getByRole('link', { name: COMPANY_EMAIL })
    expect(mail.getAttribute('href')).toBe(`mailto:${COMPANY_EMAIL}`)
  })

  test('cobre os dados do formulário de demonstração', () => {
    renderWithRouter(<PrivacyPage />)
    for (const dado of ['nome', 'e-mail', 'número de WhatsApp']) {
      expect(screen.getByText(dado)).toBeDefined()
    }
  })

  test('as seções têm ids únicos', () => {
    const ids = POLICY_SECTIONS.map((section) => section.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
