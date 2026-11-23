import type { DemoRequestErrorCode } from '@ms/domain'
import { Icon } from '../../shared/ui/icon'
import { COMPANY_SEGMENTS } from './demo-options'
import { FieldError } from './form-field'

type SegmentFieldProps = {
  readonly values: readonly string[]
  readonly code: DemoRequestErrorCode | undefined
  readonly onToggle: (segment: string) => void
}

export const SegmentField = ({ values, code, onToggle }: SegmentFieldProps) => (
  <fieldset
    className={`ms-field ms-segpick${code ? ' is-invalid' : ''}`}
    aria-describedby="segments-error"
  >
    <legend className="ms-field__l">
      Segmento da empresa <span className="ms-segpick__hint">Marque um ou mais</span>
    </legend>
    <div className="ms-segpick__opts">
      {COMPANY_SEGMENTS.map((segment, index) => (
        <label className="ms-segpick__opt" key={segment}>
          <input
            type="checkbox"
            name="segments"
            id={index === 0 ? 'segments' : undefined}
            value={segment}
            checked={values.includes(segment)}
            aria-invalid={code ? true : undefined}
            onChange={() => onToggle(segment)}
          />
          <span>
            <Icon name="check" size={14} />
            {segment}
          </span>
        </label>
      ))}
    </div>
    <FieldError field="segments" code={code} />
  </fieldset>
)
