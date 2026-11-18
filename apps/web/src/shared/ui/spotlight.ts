import type { PointerEvent } from 'react'

export const trackPointer = (event: PointerEvent<HTMLElement>): void => {
  const box = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - box.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - box.top}px`)
}
