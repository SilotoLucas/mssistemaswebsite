import { describe, expect, test } from 'bun:test'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../test/render-with-router'
import { DemoRequestForm } from './demo-request-form'

const SEND_TIMEOUT_MS = 4000

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('Nome'), 'Maria Souza')
  await user.type(screen.getByLabelText('Empresa'), 'Funerária Exemplo')
  await user.click(screen.getByRole('radio', { name: 'Funerária' }))
  await user.type(screen.getByLabelText('Cidade/UF'), 'Botucatu/SP')
  await user.type(screen.getByLabelText('WhatsApp'), '14999998888')
  await user.type(screen.getByLabelText('E-mail'), 'maria@exemplo.com.br')
  await user.click(screen.getByLabelText(/Li e aceito/))
}

describe('formulário de demonstração', () => {
  test('mostra um erro por campo e foca o primeiro inválido ao enviar vazio', async () => {
    const user = userEvent.setup()
    renderWithRouter(<DemoRequestForm />)
    await user.click(screen.getByRole('button', { name: 'Solicitar demonstração' }))

    expect(document.activeElement).toBe(screen.getByLabelText('Nome'))
    expect(screen.getByLabelText('Nome').getAttribute('aria-invalid')).toBe('true')
    expect(screen.getByLabelText('E-mail').getAttribute('aria-invalid')).toBe('true')
    expect(screen.getByText('Aceite a Política de Privacidade para continuar.')).toBeDefined()
  })

  test('aplica a máscara de telefone ao digitar o WhatsApp', async () => {
    const user = userEvent.setup()
    renderWithRouter(<DemoRequestForm />)
    const whatsapp = screen.getByLabelText('WhatsApp') as HTMLInputElement
    await user.type(whatsapp, '14999998888')
    expect(whatsapp.value).toBe('(14) 99999-8888')
  })

  test('valida o e-mail ao sair do campo e limpa o erro quando fica correto', async () => {
    const user = userEvent.setup()
    renderWithRouter(<DemoRequestForm />)
    const email = screen.getByLabelText('E-mail')
    await user.type(email, 'sem-arroba')
    await user.tab()
    expect(email.getAttribute('aria-invalid')).toBe('true')

    await user.clear(email)
    await user.type(email, 'maria@exemplo.com.br')
    expect(email.getAttribute('aria-invalid')).toBeNull()
  })

  test('não envia sem aceitar a política de privacidade', async () => {
    const user = userEvent.setup()
    renderWithRouter(<DemoRequestForm />)
    await fillValidForm(user)
    await user.click(screen.getByLabelText(/Li e aceito/))
    await user.click(screen.getByRole('button', { name: 'Solicitar demonstração' }))
    expect(screen.queryByRole('status')).toBeNull()
    expect(screen.getByLabelText(/Li e aceito/).getAttribute('aria-invalid')).toBe('true')
  })

  test('envia com dados válidos, mostra o estado de envio e depois a confirmação', async () => {
    const user = userEvent.setup()
    renderWithRouter(<DemoRequestForm />)
    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Solicitar demonstração' }))

    const sending = screen.getByRole('button', { name: 'Enviando…' }) as HTMLButtonElement
    expect(sending.disabled).toBe(true)
    expect(sending.getAttribute('aria-busy')).toBe('true')

    await waitFor(() => expect(screen.getByRole('status')).toBeDefined(), {
      timeout: SEND_TIMEOUT_MS,
    })
    expect(screen.getByText('Pedido recebido, Maria')).toBeDefined()
  })

  test('volta ao formulário vazio em "Enviar outro pedido"', async () => {
    const user = userEvent.setup()
    renderWithRouter(<DemoRequestForm />)
    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Solicitar demonstração' }))
    await waitFor(() => expect(screen.getByRole('status')).toBeDefined(), {
      timeout: SEND_TIMEOUT_MS,
    })
    await user.click(screen.getByRole('button', { name: 'Enviar outro pedido' }))
    expect((screen.getByLabelText('Nome') as HTMLInputElement).value).toBe('')
  })

  test('o link da política de privacidade aponta para a página própria', () => {
    renderWithRouter(<DemoRequestForm />)
    const link = screen.getByRole('link', { name: 'Política de Privacidade' })
    expect(link.getAttribute('href')).toBe('/politica-de-privacidade')
  })
})
