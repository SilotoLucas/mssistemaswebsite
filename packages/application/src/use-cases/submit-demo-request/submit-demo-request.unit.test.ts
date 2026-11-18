import { describe, expect, test } from 'bun:test'
import { type DemoRequest, type DemoRequestDraft, err, ok } from '@ms/domain'
import type { DemoRequestSender } from '../../ports/demo-request-sender'
import { createSubmitDemoRequest } from './submit-demo-request.use-case'

const draft: DemoRequestDraft = {
  name: 'Pessoa Teste',
  company: 'Empresa Exemplo',
  segment: 'Cemitério',
  cityState: 'Botucatu/SP',
  whatsapp: '(14) 99999-8888',
  email: 'contato@exemplo.com.br',
  privacyAccepted: true,
}

const senderSpy = (succeeds: boolean) => {
  const sent: DemoRequest[] = []
  const sender: DemoRequestSender = {
    send: async (request) => {
      sent.push(request)
      return succeeds ? ok(undefined) : err('send-failed')
    },
  }
  return { sender, sent }
}

describe('submitDemoRequest', () => {
  test('envia o pedido válido uma vez', async () => {
    const { sender, sent } = senderSpy(true)
    const result = await createSubmitDemoRequest(sender)(draft)
    expect(result.ok).toBe(true)
    expect(sent).toHaveLength(1)
  })

  test('não chama o envio quando o pedido é inválido', async () => {
    const { sender, sent } = senderSpy(true)
    const result = await createSubmitDemoRequest(sender)({ ...draft, email: 'invalido' })
    expect(result).toEqual({
      ok: false,
      error: { kind: 'invalid', fields: { email: 'email-invalid' } },
    })
    expect(sent).toHaveLength(0)
  })

  test('informa a falha quando o envio não acontece', async () => {
    const { sender } = senderSpy(false)
    const result = await createSubmitDemoRequest(sender)(draft)
    expect(result).toEqual({ ok: false, error: { kind: 'send-failed' } })
  })
})
