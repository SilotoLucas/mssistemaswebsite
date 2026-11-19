import { createSubmitDemoRequest } from '@ms/application'
import {
  DEMO_REQUEST_FIELDS,
  type DemoRequestDraft,
  type DemoRequestErrors,
  type DemoRequestField,
  formatWhatsapp,
  toggleInterest,
  validateDemoRequest,
  validateDemoRequestField,
} from '@ms/domain'
import { type FormEvent, useState } from 'react'
import { simulatedDemoRequestSender } from './simulated-demo-request-sender'

type FormStatus = 'editing' | 'sending' | 'failed' | 'sent'

const EMPTY_DRAFT: DemoRequestDraft = {
  name: '',
  company: '',
  segment: '',
  cityState: '',
  whatsapp: '',
  email: '',
  interests: [],
  privacyAccepted: false,
}

const submitDemoRequest = createSubmitDemoRequest(simulatedDemoRequestSender)

const focusFirstInvalid = (errors: DemoRequestErrors) => {
  const firstInvalid = DEMO_REQUEST_FIELDS.find((field) => errors[field])
  if (firstInvalid) document.getElementById(firstInvalid)?.focus()
}

const withFieldError = (
  errors: DemoRequestErrors,
  field: DemoRequestField,
  draft: DemoRequestDraft,
): DemoRequestErrors => {
  const { [field]: _removed, ...others } = errors
  const code = validateDemoRequestField(field, draft)
  return code ? { ...others, [field]: code } : others
}

export const useDemoRequestForm = () => {
  const [draft, setDraft] = useState(EMPTY_DRAFT)
  const [errors, setErrors] = useState<DemoRequestErrors>({})
  const [status, setStatus] = useState<FormStatus>('editing')

  const change = <Field extends DemoRequestField>(field: Field, value: DemoRequestDraft[Field]) => {
    const formatted = field === 'whatsapp' ? formatWhatsapp(String(value)) : value
    const next = { ...draft, [field]: formatted }
    setDraft(next)
    if (errors[field]) setErrors(withFieldError(errors, field, next))
  }

  const blur = (field: DemoRequestField) => {
    if (draft[field] && field !== 'privacyAccepted') {
      setErrors(withFieldError(errors, field, draft))
    }
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validated = validateDemoRequest(draft)
    if (!validated.ok) {
      setErrors(validated.error)
      focusFirstInvalid(validated.error)
      return
    }
    setErrors({})
    setStatus('sending')
    const result = await submitDemoRequest(draft)
    setStatus(result.ok ? 'sent' : 'failed')
  }

  const toggle = (interest: string) => {
    setDraft((current) => ({ ...current, interests: toggleInterest(current.interests, interest) }))
  }

  const reset = () => {
    setDraft(EMPTY_DRAFT)
    setErrors({})
    setStatus('editing')
  }

  return { draft, errors, status, change, blur, toggle, submit, reset }
}
