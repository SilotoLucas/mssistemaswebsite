import { describe, expect, test } from 'bun:test'
import { screen } from '@testing-library/react'
import { DEMO_HREF, WHATSAPP_HREF } from '../../shared/config/site-config'
import { renderWithRouter } from '../../test/render-with-router'
import { DemoRequestPage } from './demo-request-page'
import { DemoRequestSection } from './demo-request-section'

describe('tela de demonstração', () => {
  test('mostra o formulário completo com a escolha de interesses', () => {
    renderWithRouter(<DemoRequestPage />, DEMO_HREF)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Solicite uma demonstração' }),
    ).toBeDefined()
    expect(screen.getByLabelText('Nome')).toBeDefined()
    expect(screen.getByRole('group', { name: /Quais soluções interessam/ })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Solicitar demonstração' })).toBeDefined()
  })

  test('oferece o WhatsApp para quem prefere falar agora', () => {
    renderWithRouter(<DemoRequestPage />, DEMO_HREF)
    expect(screen.getByRole('link', { name: 'Chamar no WhatsApp' }).getAttribute('href')).toBe(
      WHATSAPP_HREF,
    )
  })
})

describe('atalho de demonstração nas outras telas', () => {
  test('leva para a tela de demonstração em vez de mostrar o formulário', () => {
    renderWithRouter(<DemoRequestSection />)
    const link = screen.getByRole('link', { name: 'Solicitar demonstração' })
    expect(link.getAttribute('href')).toBe(DEMO_HREF)
    expect(document.querySelector('form')).toBeNull()
    expect(screen.queryByLabelText('Nome')).toBeNull()
  })

  test('mantém o WhatsApp como segunda opção', () => {
    renderWithRouter(<DemoRequestSection />)
    expect(screen.getByRole('link', { name: 'Chamar no WhatsApp' }).getAttribute('href')).toBe(
      WHATSAPP_HREF,
    )
  })
})
