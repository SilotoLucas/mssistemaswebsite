import { describe, expect, test } from 'bun:test'
import { screen } from '@testing-library/react'
import { SYSTEM_ACCESS } from '../../shared/config/site-config'
import { renderWithRouter } from '../../test/render-with-router'
import { AccessPage } from './access-page'

describe('página acessar sistemas', () => {
  test('cada sistema tem um botão que leva ao endereço configurado', () => {
    renderWithRouter(<AccessPage />)
    for (const system of SYSTEM_ACCESS) {
      const link = screen.getByRole('link', { name: `Entrar no ${system.name}` })
      expect(link.getAttribute('href')).toBe(system.href)
    }
  })

  test('explica para quem serve cada acesso', () => {
    renderWithRouter(<AccessPage />)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(SYSTEM_ACCESS.length + 1)
  })
})
