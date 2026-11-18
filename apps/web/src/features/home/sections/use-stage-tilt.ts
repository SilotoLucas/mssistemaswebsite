import { useEffect, useRef } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../../../shared/ui/motion'

export const useStageTilt = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion() || !hasFinePointer()) return
    let frame = 0
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = node.getBoundingClientRect()
        node.style.setProperty('--tx', ((event.clientX - box.left) / box.width - 0.5).toFixed(3))
        node.style.setProperty('--ty', ((event.clientY - box.top) / box.height - 0.5).toFixed(3))
      })
    }
    node.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('pointermove', onMove)
    }
  }, [])

  return ref
}
