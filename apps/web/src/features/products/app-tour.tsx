import { type KeyboardEvent, useState } from 'react'
import type { Product } from '../../shared/config/products'
import { PhoneFrame } from '../../shared/ui/phone-frame'
import { APP_SCREENS } from './product-assets'

type AppTourProps = {
  readonly steps: NonNullable<Product['steps']>
}

const KEY_STEP: Readonly<Record<string, number>> = {
  ArrowDown: 1,
  ArrowRight: 1,
  ArrowUp: -1,
  ArrowLeft: -1,
}

export const AppTour = ({ steps }: AppTourProps) => {
  const [active, setActive] = useState(0)
  const count = Math.min(steps.length, APP_SCREENS.length)

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = KEY_STEP[event.key]
    if (!step) return
    event.preventDefault()
    const next = (active + step + count) % count
    setActive(next)
    document.getElementById(`ms-tour-tab-${next}`)?.focus()
  }

  return (
    <div className="ms-tour">
      <div className="ms-tour__tabs" role="tablist" aria-label="Telas do MS App">
        {steps.slice(0, count).map((step, index) => (
          <button
            type="button"
            role="tab"
            key={step.title}
            id={`ms-tour-tab-${index}`}
            aria-selected={index === active}
            aria-controls="ms-tour-panel"
            tabIndex={index === active ? 0 : -1}
            className={`ms-tour__tab${index === active ? ' is-on' : ''}`}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
          >
            <span className="ms-tour__n" aria-hidden="true">
              {index + 1}
            </span>
            <span className="ms-tour__tx">
              <strong>{step.title}</strong>
              <small>{step.text}</small>
            </span>
          </button>
        ))}
      </div>
      <div
        className="ms-tour__stage"
        role="tabpanel"
        id="ms-tour-panel"
        aria-labelledby={`ms-tour-tab-${active}`}
      >
        <span className="ms-tour__glow" aria-hidden="true" />
        {APP_SCREENS.slice(0, count).map((screen, index) => (
          <div
            className={`ms-tour__slot${index === active ? ' is-on' : ''}`}
            key={screen.key}
            aria-hidden={index === active ? undefined : true}
          >
            <PhoneFrame
              src={screen.src}
              alt={index === active ? screen.alt : ''}
              width={screen.width}
              height={screen.height}
              lazy
            />
          </div>
        ))}
      </div>
    </div>
  )
}
