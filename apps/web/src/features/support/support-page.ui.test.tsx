import { describe, expect, test } from 'bun:test'
import { screen, within } from '@testing-library/react'
import { SUPPORT_URL, WHATSAPP_HREF } from '../../shared/config/site-config'
import { renderWithRouter } from '../../test/render-with-router'
import { SUPPORT_DOWNLOADS } from './support-content'
import { SupportPage } from './support-page'

describe('página de suporte', () => {
  test('põe o WhatsApp como caminho principal e mantém o chamado como alternativa', () => {
    renderWithRouter(<SupportPage />)
    const whatsapp = screen.getAllByRole('link', { name: 'Chamar no WhatsApp' })
    expect(whatsapp.length).toBeGreaterThanOrEqual(2)
    expect(whatsapp.every((link) => link.getAttribute('href') === WHATSAPP_HREF)).toBe(true)
    const tickets = screen.getAllByRole('link', { name: /Abrir chamado/ })
    expect(tickets.every((link) => link.getAttribute('href') === SUPPORT_URL)).toBe(true)
  })

  test('mostra os telefones fixos como outro canal', () => {
    renderWithRouter(<SupportPage />)
    expect(screen.getAllByRole('link', { name: /\(14\) 38\d\d-\d{4}/ }).length).toBeGreaterThan(0)
  })

  test('não promete tempo de resposta', () => {
    renderWithRouter(<SupportPage />)
    expect(document.body.textContent).not.toMatch(/\d+\s*(min|minutos|horas|segundos)/i)
  })

  test('links de download são https, abrem em nova aba e não usam o site legado', () => {
    renderWithRouter(<SupportPage />)
    const section = document.getElementById('downloads') as HTMLElement
    const external = within(section)
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('http'))
      .filter((link) => !link.getAttribute('href')?.startsWith(WHATSAPP_HREF))
    expect(external).toHaveLength(SUPPORT_DOWNLOADS.filter((item) => item.href).length)
    for (const link of external) {
      expect(link.getAttribute('href')).toStartWith('https://')
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toContain('noopener')
    }
  })

  test('ferramentas sem link público mandam falar com um consultor no WhatsApp', () => {
    renderWithRouter(<SupportPage />)
    const section = document.getElementById('downloads') as HTMLElement
    const pending = SUPPORT_DOWNLOADS.filter((item) => item.href === null)
    const consultants = within(section).getAllByRole('link', { name: /Falar com consultor/ })
    expect(consultants).toHaveLength(pending.length)
    for (const link of consultants) {
      expect(link.getAttribute('href')).toStartWith(`${WHATSAPP_HREF}?text=`)
    }
  })

  test('não oferece ferramentas descontinuadas', () => {
    renderWithRouter(<SupportPage />)
    expect(screen.queryByText(/skype/i)).toBeNull()
    expect(screen.queryByText(/ultra ?vnc/i)).toBeNull()
  })
})
