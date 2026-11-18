import { describe, expect, test } from 'bun:test'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../test/render-with-router'
import { ClientsPage } from './clients-page'

const grid = () => document.querySelector('.ms-cl-grid') as HTMLElement

describe('página de clientes', () => {
  test('lista todos os estados no início', () => {
    renderWithRouter(<ClientsPage />)
    expect(within(grid()).getAllByRole('heading', { level: 2 })).toHaveLength(18)
  })

  test('a busca filtra as cidades e atualiza o resumo', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ClientsPage />)
    await user.type(screen.getByLabelText('Buscar cidade ou estado'), 'botucatu')
    expect(within(grid()).getAllByRole('heading', { level: 2 })).toHaveLength(1)
    expect(screen.getByText('São Paulo')).toBeDefined()
    expect(screen.getByRole('status').textContent).toBe('1 cidade em 1 estado')
  })

  test('mostra mensagem e limpa a busca quando nada é encontrado', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ClientsPage />)
    await user.type(screen.getByLabelText('Buscar cidade ou estado'), 'xyzxyz')
    expect(screen.getByText(/Não encontramos essa cidade/)).toBeDefined()
    await user.click(screen.getByRole('button', { name: 'Limpar busca' }))
    expect(within(grid()).getAllByRole('heading', { level: 2 })).toHaveLength(18)
  })

  test('o filtro de região marca o botão ativo e reduz os estados', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ClientsPage />)
    const button = screen.getByRole('button', { name: 'Centro-Oeste' })
    expect(button.getAttribute('aria-pressed')).toBe('false')
    await user.click(button)
    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(within(grid()).getAllByRole('heading', { level: 2 }).length).toBeLessThan(18)
  })
})
