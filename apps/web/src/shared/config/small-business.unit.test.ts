import { describe, expect, test } from 'bun:test'
import { WHATSAPP_HREF } from './site-config'
import {
  SMALL_BUSINESS_HREF,
  SMALL_BUSINESS_MAX_MACHINES,
  SMALL_BUSINESS_MODULES,
  SMALL_BUSINESS_PERKS,
} from './small-business'

describe('pacote SmallBusiness', () => {
  test('traz os módulos Plano, Funerária, Cobrança e Caixa', () => {
    expect(SMALL_BUSINESS_MODULES.map((item) => item.label)).toEqual([
      'Plano',
      'Funerária',
      'Cobrança',
      'Caixa',
    ])
  })

  test('permite instalar em até 5 máquinas', () => {
    expect(SMALL_BUSINESS_MAX_MACHINES).toBe(5)
    expect(SMALL_BUSINESS_PERKS.map((item) => item.label)).toContain('Até 5 máquinas')
  })

  test('leva o interessado ao WhatsApp com a mensagem pronta', () => {
    expect(SMALL_BUSINESS_HREF).toStartWith(`${WHATSAPP_HREF}?text=`)
    expect(decodeURIComponent(SMALL_BUSINESS_HREF)).toContain('SmallBusiness')
  })
})
