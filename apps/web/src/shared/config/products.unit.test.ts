import { describe, expect, test } from 'bun:test'
import { findProduct, PRODUCTS, productHref } from './products'
import { WHATSAPP_HREF } from './site-config'

describe('produtos', () => {
  test('são SmallBusiness, MS App e MS Dashboard, nessa ordem', () => {
    expect(PRODUCTS.map((product) => product.name)).toEqual([
      'SmallBusiness',
      'MS App',
      'MS Dashboard',
    ])
  })

  test('cada solução tem a sua rota, na raiz do site', () => {
    expect(PRODUCTS.map((product) => productHref(product.slug))).toEqual([
      '/smallbusiness',
      '/app',
      '/dashboard',
    ])
    expect(findProduct('app')?.name).toBe('MS App')
    expect(findProduct('nao-existe')).toBeUndefined()
  })

  test('cada produto leva ao WhatsApp com a mensagem pronta', () => {
    for (const product of PRODUCTS) {
      expect(product.whatsappHref).toStartWith(`${WHATSAPP_HREF}?text=`)
    }
  })

  test('não divulga preços', () => {
    expect(JSON.stringify(PRODUCTS)).not.toMatch(/R\$\s*\d/)
  })

  test('o SmallBusiness mantém a regra de até 5 máquinas', () => {
    expect(findProduct('smallbusiness')?.bullets).toContain('Até 5 máquinas')
  })
})
