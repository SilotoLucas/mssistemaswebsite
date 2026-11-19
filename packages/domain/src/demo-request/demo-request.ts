import { err, ok, type Result } from '../result'

export const DEMO_REQUEST_FIELDS = [
  'name',
  'company',
  'cityState',
  'whatsapp',
  'email',
  'segment',
  'privacyAccepted',
] as const

export type DemoRequestField = (typeof DEMO_REQUEST_FIELDS)[number]

export type DemoRequestDraft = {
  readonly name: string
  readonly company: string
  readonly segment: string
  readonly cityState: string
  readonly whatsapp: string
  readonly email: string
  readonly interests: readonly string[]
  readonly privacyAccepted: boolean
}

export type DemoRequest = DemoRequestDraft & { readonly privacyAccepted: true }

export type DemoRequestErrorCode =
  | 'name-too-short'
  | 'company-required'
  | 'segment-required'
  | 'city-state-invalid'
  | 'whatsapp-invalid'
  | 'email-invalid'
  | 'privacy-not-accepted'

export type DemoRequestErrors = Partial<Record<DemoRequestField, DemoRequestErrorCode>>

const MIN_NAME_LENGTH = 3
const CITY_STATE_PATTERN = /^.{2,}[/,\-\s]+[A-Za-z]{2}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const LANDLINE_DIGITS = 10
const MOBILE_DIGITS = 11

const digitsOf = (value: string): string => value.replace(/\D/g, '')

const hasValidWhatsappLength = (value: string): boolean => {
  const length = digitsOf(value).length
  return length === LANDLINE_DIGITS || length === MOBILE_DIGITS
}

const FIELD_RULES: Record<
  DemoRequestField,
  (draft: DemoRequestDraft) => DemoRequestErrorCode | null
> = {
  name: (draft) => (draft.name.trim().length >= MIN_NAME_LENGTH ? null : 'name-too-short'),
  company: (draft) => (draft.company.trim() ? null : 'company-required'),
  segment: (draft) => (draft.segment ? null : 'segment-required'),
  cityState: (draft) =>
    CITY_STATE_PATTERN.test(draft.cityState.trim()) ? null : 'city-state-invalid',
  whatsapp: (draft) => (hasValidWhatsappLength(draft.whatsapp) ? null : 'whatsapp-invalid'),
  email: (draft) => (EMAIL_PATTERN.test(draft.email.trim()) ? null : 'email-invalid'),
  privacyAccepted: (draft) => (draft.privacyAccepted ? null : 'privacy-not-accepted'),
}

export const validateDemoRequestField = (
  field: DemoRequestField,
  draft: DemoRequestDraft,
): DemoRequestErrorCode | null => FIELD_RULES[field](draft)

export const validateDemoRequest = (
  draft: DemoRequestDraft,
): Result<DemoRequest, DemoRequestErrors> => {
  const errors: DemoRequestErrors = {}
  for (const field of DEMO_REQUEST_FIELDS) {
    const code = validateDemoRequestField(field, draft)
    if (code) errors[field] = code
  }
  if (Object.keys(errors).length > 0 || !draft.privacyAccepted) return err(errors)
  return ok({ ...draft, privacyAccepted: true })
}

export const toggleInterest = (
  interests: readonly string[],
  interest: string,
): readonly string[] =>
  interests.includes(interest)
    ? interests.filter((item) => item !== interest)
    : [...interests, interest]

export const formatWhatsapp = (value: string): string => {
  const digits = digitsOf(value).slice(0, MOBILE_DIGITS)
  if (digits.length <= 2) return digits
  const areaCode = digits.slice(0, 2)
  const number = digits.slice(2)
  const prefixLength = digits.length === MOBILE_DIGITS ? 5 : 4
  if (number.length <= prefixLength) return `(${areaCode}) ${number}`
  return `(${areaCode}) ${number.slice(0, prefixLength)}-${number.slice(prefixLength)}`
}
