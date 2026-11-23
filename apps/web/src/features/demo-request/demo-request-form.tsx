import type { DemoRequestField } from '@ms/domain'
import { type HTMLInputTypeAttribute, useEffect, useRef } from 'react'
import { Icon } from '../../shared/ui/icon'
import { SiteLink } from '../../shared/ui/site-link'
import { FieldError, FormField } from './form-field'
import { InterestPicker } from './interest-picker'
import { SegmentField } from './segment-field'
import { useDemoRequestForm } from './use-demo-request-form'

type TextFieldConfig = {
  readonly field: Exclude<DemoRequestField, 'segments' | 'privacyAccepted'>
  readonly label: string
  readonly type: HTMLInputTypeAttribute
  readonly autoComplete: string
  readonly placeholder?: string
  readonly wide?: boolean
}

const LEADING_FIELDS: readonly TextFieldConfig[] = [
  { field: 'name', label: 'Nome', type: 'text', autoComplete: 'name' },
  { field: 'company', label: 'Empresa', type: 'text', autoComplete: 'organization' },
]

const TRAILING_FIELDS: readonly TextFieldConfig[] = [
  {
    field: 'cityState',
    label: 'Cidade/UF',
    type: 'text',
    autoComplete: 'address-level2',
    placeholder: 'Botucatu/SP',
  },
  {
    field: 'whatsapp',
    label: 'WhatsApp',
    type: 'tel',
    autoComplete: 'tel-national',
    placeholder: '(14) 99999-9999',
  },
  {
    field: 'email',
    label: 'E-mail',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'voce@empresa.com.br',
    wide: true,
  },
]

const SuccessPanel = ({
  name,
  onReset,
}: {
  readonly name: string
  readonly onReset: () => void
}) => {
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => panelRef.current?.focus(), [])
  return (
    <div className="ms-success" role="status" tabIndex={-1} ref={panelRef}>
      <span className="ms-success__i">
        <Icon name="check" />
      </span>
      <h3 className="ms-h3">Pedido recebido, {name}</h3>
      <p>
        Um consultor da MS vai falar com você pelo WhatsApp informado para combinar a demonstração.
      </p>
      <button className="ms-btn ms-btn--secondary" type="button" onClick={onReset}>
        Enviar outro pedido
      </button>
    </div>
  )
}

export const DemoRequestForm = () => {
  const form = useDemoRequestForm()
  const sending = form.status === 'sending'

  if (form.status === 'sent') {
    return (
      <div className="ms-formcard">
        <SuccessPanel name={form.draft.name.trim().split(' ')[0] ?? ''} onReset={form.reset} />
      </div>
    )
  }

  const renderTextField = (config: TextFieldConfig) => (
    <FormField
      field={config.field}
      code={form.errors[config.field]}
      label={config.label}
      wide={config.wide ?? false}
      key={config.field}
    >
      <input
        className="ms-input"
        id={config.field}
        name={config.field}
        type={config.type}
        autoComplete={config.autoComplete}
        placeholder={config.placeholder}
        value={form.draft[config.field]}
        required
        aria-invalid={form.errors[config.field] ? true : undefined}
        aria-describedby={`${config.field}-error`}
        onChange={(event) => form.change(config.field, event.target.value)}
        onBlur={() => form.blur(config.field)}
      />
    </FormField>
  )

  return (
    <div className="ms-formcard">
      <form className="ms-form" noValidate onSubmit={form.submit}>
        <div className="ms-form__grid">
          {LEADING_FIELDS.map(renderTextField)}
          {TRAILING_FIELDS.map(renderTextField)}
        </div>
        <SegmentField
          values={form.draft.segments}
          code={form.errors.segments}
          onToggle={form.toggleSegment}
        />
        <InterestPicker selected={form.draft.interests} onToggle={form.toggle} />
        <div className={`ms-field${form.errors.privacyAccepted ? ' is-invalid' : ''}`}>
          <label className="ms-check" htmlFor="privacyAccepted">
            <span className="ms-check__box">
              <input
                type="checkbox"
                id="privacyAccepted"
                name="privacyAccepted"
                checked={form.draft.privacyAccepted}
                required
                aria-invalid={form.errors.privacyAccepted ? true : undefined}
                aria-describedby="privacyAccepted-error"
                onChange={(event) => form.change('privacyAccepted', event.target.checked)}
              />
              <Icon name="check" size={16} />
            </span>
            <span className="ms-check__t">
              Li e aceito a{' '}
              <SiteLink href="/politica-de-privacidade">Política de Privacidade</SiteLink> e
              autorizo o contato da MS sobre este pedido.
            </span>
          </label>
          <FieldError field="privacyAccepted" code={form.errors.privacyAccepted} />
        </div>
        {form.status === 'failed' ? (
          <div className="ms-alert" role="alert">
            <Icon name="alert" size={16} />
            <span>Não foi possível enviar agora. Confira a conexão e tente de novo.</span>
          </div>
        ) : null}
        <button
          className={`ms-btn ms-btn--primary ms-btn--block${sending ? ' is-loading' : ''}`}
          type="submit"
          disabled={sending}
          aria-busy={sending}
        >
          {sending ? <span className="ms-spinner" aria-hidden="true" /> : null}
          {sending ? 'Enviando…' : 'Solicitar demonstração'}
        </button>
      </form>
    </div>
  )
}
