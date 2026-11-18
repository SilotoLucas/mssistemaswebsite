import { type ReactNode, useEffect, useId, useRef } from 'react'
import { Icon } from './icon'
import './modal.css'

type ModalProps = {
  readonly open: boolean
  readonly onClose: () => void
  readonly title: string
  readonly description?: string
  readonly media?: ReactNode
  readonly children: ReactNode
}

const CLOSE_MS = 180

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const cancelAnimations = (dialog: HTMLDialogElement) => {
  for (const animation of dialog.getAnimations({ subtree: true })) animation.cancel()
}

const finishClosing = (dialog: HTMLDialogElement) => {
  dialog.close()
  cancelAnimations(dialog)
}

const playClosing = (dialog: HTMLDialogElement) => {
  const timing = { duration: CLOSE_MS, easing: 'ease-in', fill: 'forwards' } as const
  dialog.animate(
    [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(12px)' },
    ],
    timing,
  )
  dialog.animate([{ opacity: 1 }, { opacity: 0 }], { ...timing, pseudoElement: '::backdrop' })
}

export const Modal = ({ open, onClose, title, description, media, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      cancelAnimations(dialog)
      if (!dialog.open) dialog.showModal()
      return
    }
    if (!dialog.open) return
    if (prefersReducedMotion()) {
      finishClosing(dialog)
      return
    }
    playClosing(dialog)
    const timer = setTimeout(() => finishClosing(dialog), CLOSE_MS)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onCancel = (event: Event) => {
      event.preventDefault()
      onClose()
    }
    const onBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) onClose()
    }
    dialog.addEventListener('cancel', onCancel)
    dialog.addEventListener('click', onBackdropClick)
    return () => {
      dialog.removeEventListener('cancel', onCancel)
      dialog.removeEventListener('click', onBackdropClick)
    }
  }, [onClose])

  return (
    <dialog
      className="ms-modal"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      ref={dialogRef}
    >
      <div className="ms-modal__panel">
        <header className="ms-modal__head">
          {media}
          <div className="ms-modal__titles">
            <h2 id={titleId}>{title}</h2>
            {description ? <p id={descriptionId}>{description}</p> : null}
          </div>
          <button className="ms-modal__close" type="button" aria-label="Fechar" onClick={onClose}>
            <Icon name="x" size={22} />
          </button>
        </header>
        <div className="ms-modal__body">{children}</div>
      </div>
    </dialog>
  )
}
