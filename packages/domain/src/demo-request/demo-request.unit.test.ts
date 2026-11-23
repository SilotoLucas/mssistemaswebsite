import { describe, expect, test } from 'bun:test'
import {
  type DemoRequestDraft,
  formatWhatsapp,
  toggleChoice,
  validateDemoRequest,
  validateDemoRequestField,
} from './demo-request'

const validDraft: DemoRequestDraft = {
  name: 'Pessoa Teste',
  company: 'Empresa Exemplo',
  segments: ['Funerária'],
  cityState: 'Botucatu/SP',
  whatsapp: '(14) 99999-8888',
  email: 'contato@exemplo.com.br',
  interests: [],
  privacyAccepted: true,
}

describe('validateDemoRequest', () => {
  test('aceita um pedido completo', () => {
    expect(validateDemoRequest(validDraft).ok).toBe(true)
  })

  test('devolve um erro para cada campo vazio', () => {
    const result = validateDemoRequest({
      name: '',
      company: '',
      segments: [],
      cityState: '',
      whatsapp: '',
      email: '',
      interests: [],
      privacyAccepted: false,
    })
    expect(result).toEqual({
      ok: false,
      error: {
        name: 'name-too-short',
        company: 'company-required',
        segments: 'segment-required',
        cityState: 'city-state-invalid',
        whatsapp: 'whatsapp-invalid',
        email: 'email-invalid',
        privacyAccepted: 'privacy-not-accepted',
      },
    })
  })
})

describe('validateDemoRequestField', () => {
  test.each([
    ['Botucatu/SP', null],
    ['Botucatu - SP', null],
    ['Botucatu', 'city-state-invalid'],
  ])('cidade e UF %s', (cityState, expected) => {
    expect(validateDemoRequestField('cityState', { ...validDraft, cityState })).toBe(
      expected as 'city-state-invalid' | null,
    )
  })

  test.each([
    ['(14) 3815-6846', null],
    ['(14) 99999-8888', null],
    ['(14) 9999', 'whatsapp-invalid'],
  ])('WhatsApp %s', (whatsapp, expected) => {
    expect(validateDemoRequestField('whatsapp', { ...validDraft, whatsapp })).toBe(
      expected as 'whatsapp-invalid' | null,
    )
  })
})

describe('formatWhatsapp', () => {
  test.each([
    ['14', '14'],
    ['1499', '(14) 99'],
    ['1438156846', '(14) 3815-6846'],
    ['14999998888', '(14) 99999-8888'],
    ['149999988887777', '(14) 99999-8888'],
  ])('formata %s', (input, expected) => {
    expect(formatWhatsapp(input)).toBe(expected)
  })
})

describe('toggleChoice', () => {
  test('marca um interesse novo no fim da lista', () => {
    expect(toggleChoice(['SmallBusiness'], 'Cemitérios')).toEqual(['SmallBusiness', 'Cemitérios'])
  })

  test('desmarca um interesse que já estava marcado', () => {
    expect(toggleChoice(['SmallBusiness', 'Cemitérios'], 'SmallBusiness')).toEqual(['Cemitérios'])
  })

  test('aceita pedido sem nenhum interesse marcado', () => {
    expect(validateDemoRequest({ ...validDraft, interests: [] }).ok).toBe(true)
  })
})

describe('segmentos da empresa', () => {
  test('aceita mais de um segmento', () => {
    expect(validateDemoRequest({ ...validDraft, segments: ['Funerária', 'Cemitério'] }).ok).toBe(
      true,
    )
  })

  test('exige ao menos um segmento', () => {
    expect(validateDemoRequestField('segments', { ...validDraft, segments: [] })).toBe(
      'segment-required',
    )
  })
})
