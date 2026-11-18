import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const TICK_MS = 100
const SLIDE_MS = 850
const SLIDE_EASING = 'cubic-bezier(0.22, 0.8, 0.2, 1)'

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const slideFrames = (from: number, to: number): Keyframe[] => [
  { transform: `translate3d(${from}%, 0, 0)`, visibility: 'visible' },
  { transform: `translate3d(${to}%, 0, 0)`, visibility: 'visible' },
]

export const useCarousel = (count: number, intervalMs: number) => {
  const [index, setIndex] = useState(0)
  const [held, setHeld] = useState(false)
  const rootRef = useRef<HTMLElement>(null)
  const shownIndex = useRef(0)

  useLayoutEffect(() => {
    const leaving = shownIndex.current
    if (leaving === index) return
    shownIndex.current = index
    if (prefersReducedMotion()) return
    const slides = rootRef.current?.querySelectorAll<HTMLElement>('.ms-car__slide')
    if (!slides) return
    const timing = { duration: SLIDE_MS, easing: SLIDE_EASING }
    slides[index]?.animate(slideFrames(100, 0), timing)
    slides[leaving]?.animate(slideFrames(0, -100), timing)
  }, [index])

  useEffect(() => {
    if (held) return
    let lastTick = performance.now()
    let elapsedMs = 0
    const timer = setInterval(() => {
      const now = performance.now()
      if (!document.hidden) elapsedMs += now - lastTick
      lastTick = now
      if (elapsedMs < intervalMs) return
      elapsedMs = 0
      setIndex((current) => (current + 1) % count)
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [held, intervalMs, count])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const holdForKeyboard = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.matches(':focus-visible')) setHeld(true)
    }
    const release = () => setHeld(false)
    root.addEventListener('focusin', holdForKeyboard)
    root.addEventListener('focusout', release)
    return () => {
      root.removeEventListener('focusin', holdForKeyboard)
      root.removeEventListener('focusout', release)
    }
  }, [])

  return { index, held, rootRef }
}
