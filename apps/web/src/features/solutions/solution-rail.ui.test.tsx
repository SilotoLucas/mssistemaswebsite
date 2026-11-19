import { describe, expect, test } from 'bun:test'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../test/render-with-router'
import { SolutionRail } from './solution-rail'
import { SOLUTION_GROUPS } from './solutions-catalog'

const segmentGroup = SOLUTION_GROUPS[0]

const openSolution = async (name: string) => {
  if (!segmentGroup) throw new Error('grupo ausente')
  renderWithRouter(<SolutionRail group={segmentGroup} />)
  const [button] = screen.getAllByRole('button', { name: `Ver funções de ${name}` })
  if (!button) throw new Error(`botão de ${name} ausente`)
  await userEvent.click(button)
  return document.querySelector('dialog') as HTMLDialogElement
}

describe('modal de solução', () => {
  test('o módulo Funerárias oferece o vídeo de apresentação abaixo das funções', async () => {
    const dialog = await openSolution('Funerárias')
    const start = within(dialog).getByRole('button', { name: /Assistir ao vídeo de apresentação/ })
    const list = dialog.querySelector('.ms-sol-modal__list') as HTMLElement
    expect(list.compareDocumentPosition(start) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    await userEvent.click(start)
    expect(within(dialog).getByTitle('Vídeo de apresentação: Funerárias')).toBeTruthy()
  })

  test('fechar o modal tira o vídeo da página', async () => {
    const dialog = await openSolution('Funerárias')
    await userEvent.click(within(dialog).getByRole('button', { name: /Assistir ao vídeo/ }))
    await userEvent.click(within(dialog).getByRole('button', { name: 'Fechar' }))
    expect(dialog.querySelector('iframe')).toBeNull()
  })

  test('solução sem vídeo não mostra o botão', async () => {
    const dialog = await openSolution('Crematórios')
    expect(within(dialog).queryByRole('button', { name: /Assistir ao vídeo/ })).toBeNull()
  })
})
