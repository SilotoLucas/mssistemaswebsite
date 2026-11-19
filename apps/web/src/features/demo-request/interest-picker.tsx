import type { ReactNode } from 'react'
import { SMALL_BUSINESS_MODULES } from '../../shared/config/small-business'
import { SOLUTION_GROUPS } from '../../shared/config/solutions-catalog'
import { Icon } from '../../shared/ui/icon'
import { SEGMENT_GROUP_SLUG, SEGMENT_MODULES, SMALL_BUSINESS_INTEREST } from './demo-options'

type InterestPickerProps = {
  readonly selected: readonly string[]
  readonly onToggle: (interest: string) => void
}

type InterestCheckProps = InterestPickerProps & {
  readonly value: string
  readonly className: string
  readonly children: ReactNode
}

const InterestCheck = ({ value, selected, onToggle, className, children }: InterestCheckProps) => (
  <label className={className}>
    <input
      type="checkbox"
      name="interests"
      value={value}
      checked={selected.includes(value)}
      onChange={() => onToggle(value)}
    />
    <span className="ms-pick__box" aria-hidden="true">
      <Icon name="check" size={14} />
    </span>
    {children}
  </label>
)

const smallBusinessModules = SMALL_BUSINESS_MODULES.map((item) => item.label).join(', ')

const OTHER_GROUPS = SOLUTION_GROUPS.filter((group) => group.slug !== SEGMENT_GROUP_SLUG)

export const InterestPicker = ({ selected, onToggle }: InterestPickerProps) => (
  <fieldset className="ms-interest">
    <legend className="ms-interest__t">
      Quais soluções interessam? <span>Opcional</span>
    </legend>
    <InterestCheck
      className="ms-pick ms-pick--sb"
      value={SMALL_BUSINESS_INTEREST}
      selected={selected}
      onToggle={onToggle}
    >
      <span className="ms-pick__t">
        <strong>SmallBusiness</strong>
        <small>Pacote compacto na nuvem: {smallBusinessModules}</small>
      </span>
    </InterestCheck>
    <fieldset className="ms-interest__block">
      <legend className="ms-interest__sub">Sistema por segmento</legend>
      <div className="ms-interest__seg">
        {SEGMENT_MODULES.map((module) => (
          <InterestCheck
            className="ms-pick ms-pick--chip"
            value={module}
            selected={selected}
            onToggle={onToggle}
            key={module}
          >
            <span className="ms-pick__t">{module}</span>
          </InterestCheck>
        ))}
      </div>
    </fieldset>
    <fieldset className="ms-interest__block">
      <legend className="ms-interest__sub">Outros módulos</legend>
      {OTHER_GROUPS.map((group) => {
        const count = group.solutions.filter((solution) => selected.includes(solution.name)).length
        return (
          <details className="ms-interest__g" key={group.slug}>
            <summary>
              <span className="ms-interest__gi" aria-hidden="true">
                <Icon name={group.icon} size={18} />
              </span>
              <span className="ms-interest__gn">{group.name}</span>
              {count > 0 ? (
                <span className="ms-interest__n">
                  {count === 1 ? '1 marcado' : `${count} marcados`}
                </span>
              ) : null}
              <span className="ms-interest__chev" aria-hidden="true">
                <Icon name="chevron-down" size={18} />
              </span>
            </summary>
            <div className="ms-interest__opts">
              {group.solutions.map((solution) => (
                <InterestCheck
                  className="ms-pick"
                  value={solution.name}
                  selected={selected}
                  onToggle={onToggle}
                  key={solution.slug}
                >
                  <span className="ms-pick__t">{solution.name}</span>
                </InterestCheck>
              ))}
            </div>
          </details>
        )
      })}
    </fieldset>
  </fieldset>
)
