import { describe, expect, test } from 'bun:test'
import { fireEvent, screen } from '@testing-library/react'
import { renderRoute } from '../../test/render-route'

describe('página Equipe', () => {
  test('mostra as frentes de suporte e de desenvolvimento', () => {
    renderRoute('/equipe')
    expect(
      screen.getByRole('heading', { name: 'Uma equipe de suporte qualificada' }),
    ).not.toBeNull()
    expect(
      screen.getByRole('heading', { name: 'Um time que não para de evoluir o sistema' }),
    ).not.toBeNull()
  })

  test('clicar em uma pessoa abre o modal com o descritivo dela', () => {
    renderRoute('/equipe')
    fireEvent.click(screen.getAllByRole('button', { name: 'Conhecer Simone' })[0] as HTMLElement)
    const dialog = document.querySelector('dialog') as HTMLDialogElement
    expect(dialog.textContent).toContain('Simone faz parte da equipe da MS Sistemas')
  })

  test('a página Empresa não traz mais a equipe', () => {
    renderRoute('/empresa')
    expect(document.getElementById('equipe')).toBeNull()
    expect(screen.queryByRole('heading', { name: 'Quem faz a MS' })).toBeNull()
  })
})
