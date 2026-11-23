import { type ReactNode, useEffect, useRef } from 'react'
import { Icon, type IconName } from '../../shared/ui/icon'
import { SiteLink } from '../../shared/ui/site-link'

type SuccessPanelProps = {
  readonly name: string
  readonly whatsapp: string
  readonly onReset: () => void
}

type NextStep = {
  readonly icon: IconName
  readonly title: ReactNode
  readonly done: boolean
}

const nextSteps = (whatsapp: string): readonly NextStep[] => [
  { icon: 'check', title: 'Recebemos o seu pedido', done: true },
  {
    icon: 'message',
    title: (
      <span>
        Um consultor chama você no WhatsApp{' '}
        {whatsapp ? <span className="ms-success__phone">{whatsapp}</span> : null}
      </span>
    ),
    done: false,
  },
  { icon: 'calendar', title: 'Vocês combinam o melhor dia para a demonstração', done: false },
]

export const SuccessPanel = ({ name, whatsapp, onReset }: SuccessPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => panelRef.current?.focus(), [])
  return (
    <div className="ms-success" role="status" tabIndex={-1} ref={panelRef}>
      <span className="ms-success__badge" aria-hidden="true">
        <Icon name="check" size={30} />
      </span>
      <p className="ms-success__tag">Pedido enviado</p>
      <h3 className="ms-success__title">{name ? `Pedido recebido, ${name}` : 'Pedido recebido'}</h3>
      <p className="ms-success__lead">
        Obrigado pelo interesse na MS. Agora é com a gente: veja o que acontece a seguir.
      </p>
      <ol className="ms-success__steps">
        {nextSteps(whatsapp).map((step) => (
          <li className={step.done ? 'is-done' : undefined} key={step.icon}>
            <span className="ms-success__ico">
              <Icon name={step.icon} size={16} />
            </span>
            {step.title}
          </li>
        ))}
      </ol>
      <div className="ms-success__actions">
        <SiteLink className="ms-btn ms-btn--primary" href="/videos">
          <Icon name="play" size={18} />
          Ver vídeos do sistema
        </SiteLink>
        <button className="ms-btn ms-btn--secondary" type="button" onClick={onReset}>
          Enviar outro pedido
        </button>
      </div>
    </div>
  )
}
