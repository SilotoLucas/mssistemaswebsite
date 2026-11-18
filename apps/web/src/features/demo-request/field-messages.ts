import type { DemoRequestErrorCode } from '@ms/domain'

export const FIELD_MESSAGES: Record<DemoRequestErrorCode, string> = {
  'name-too-short': 'Informe seu nome.',
  'company-required': 'Informe o nome da empresa.',
  'segment-required': 'Selecione o segmento da empresa.',
  'city-state-invalid': 'Informe cidade e UF, como Botucatu/SP.',
  'whatsapp-invalid': 'Informe o WhatsApp com DDD.',
  'email-invalid': 'Informe um e-mail válido, como voce@empresa.com.br.',
  'privacy-not-accepted': 'Aceite a Política de Privacidade para continuar.',
}
