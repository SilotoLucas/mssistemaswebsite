import type { DemoRequestErrorCode } from '@ms/domain'
import { COMPANY_SEGMENTS } from './demo-options'
import { FieldError } from './form-field'

type SegmentFieldProps = {
  readonly value: string
  readonly code: DemoRequestErrorCode | undefined
  readonly onChange: (segment: string) => void
}

export const SegmentField = ({ value, code, onChange }: SegmentFieldProps) => (
  <fieldset
    className={`ms-field ms-segpick${code ? ' is-invalid' : ''}`}
    aria-describedby="segment-error"
  >
    <legend className="ms-field__l">Segmento da empresa</legend>
    <div className="ms-segpick__opts">
      {COMPANY_SEGMENTS.map((segment, index) => (
        <label className="ms-segpick__opt" key={segment}>
          <input
            type="radio"
            name="segment"
            id={index === 0 ? 'segment' : undefined}
            value={segment}
            checked={value === segment}
            required
            aria-invalid={code ? true : undefined}
            onChange={() => onChange(segment)}
          />
          <span>{segment}</span>
        </label>
      ))}
    </div>
    <FieldError field="segment" code={code} />
  </fieldset>
)
