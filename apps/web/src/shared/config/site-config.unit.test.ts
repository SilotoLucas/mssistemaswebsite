import { describe, expect, test } from 'bun:test'
import { COMPANY_WHATSAPP_NUMBER } from './company-info'
import { WHATSAPP_HREF, WHATSAPP_LABEL } from './site-config'

describe('WhatsApp da MS', () => {
  test('o número oficial tem DDD e 9 dígitos', () => {
    expect(COMPANY_WHATSAPP_NUMBER).toMatch(/^\d{2}9\d{8}$/)
  })

  test('o link usa o código do Brasil e só dígitos', () => {
    expect(WHATSAPP_HREF).toMatch(/^https:\/\/wa\.me\/55\d{11}$/)
  })

  test('o rótulo mostra o número formatado', () => {
    expect(WHATSAPP_LABEL).toMatch(/^\(\d{2}\) 9\d{4}-\d{4}$/)
  })
})
