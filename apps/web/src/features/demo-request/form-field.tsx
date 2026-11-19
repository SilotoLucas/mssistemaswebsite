import type { DemoRequestErrorCode, DemoRequestField } from '@ms/domain'
import type { ReactNode } from 'react'
import { Icon } from '../../shared/ui/icon'
import { FIELD_MESSAGES } from './field-messages'

type FieldErrorProps = {
  readonly field: DemoRequestField
  readonly code: DemoRequestErrorCode | undefined
}

export const FieldError = ({ field, code }: FieldErrorProps) => (
  <p className="ms-err" id={`${field}-error`} hidden={!code}>
    <Icon name="alert" size={16} />
    <span>{code ? FIELD_MESSAGES[code] : ''}</span>
  </p>
)

type FormFieldProps = FieldErrorProps & {
  readonly label: string
  readonly wide?: boolean
  readonly children: ReactNode
}

export const FormField = ({ field, code, label, wide = false, children }: FormFieldProps) => (
  <div className={`ms-field${wide ? ' ms-field--wide' : ''}${code ? ' is-invalid' : ''}`}>
    <label htmlFor={field}>{label}</label>
    {children}
    <FieldError field={field} code={code} />
  </div>
)
