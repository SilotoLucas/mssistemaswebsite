import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CLICK_GUARD_MS, isHorizontalGesture, isPrimaryPress } from './gesture'
import { prefersReducedMotion } from './motion'

const TICK_MS = 100
const SLIDE_MS = 850
const SWIPE_PX = 40
const SLIDE_EASING = 'cubic-bezier(0.22, 0.8, 0.2, 1)'

type Press = { readonly id: number; readonly x: number; readonly y: number }

const FADE_SHIFT = 0.06
const FADE_SCALE = 0.97

export type CarouselTransition = 'slide' | 'fade'

const slideFrames = (from: number, to: number): Keyframe[] => [
  { transform: `translate3d(${from}%, 0, 0)`, visibility: 'visible' },
  { transform: `translate3d(${to}%, 0, 0)`, visibility: 'visible' },
]

const fadeFrames = (from: number, to: number): Keyframe[] => [
  {
    opacity: from === 0 ? 1 : 0,
    transform: `translate3d(${from * FADE_SHIFT}%, 0, 0) scale(${from === 0 ? 1 : FADE_SCALE})`,
    visibility: 'visible',
  },
  {
    opacity: to === 0 ? 1 : 0,
    transform: `translate3d(${to * FADE_SHIFT}%, 0, 0) scale(${to === 0 ? 1 : FADE_SCALE})`,
    visibility: 'visible',
  },
]

export const useCarousel = (
  count: number,
  intervalMs: number,
  transition: CarouselTransition = 'slide',
) => {
  const [index, setIndex] = useState(0)
  const [held, setHeld] = useState(false)
  const rootRef = useRef<HTMLElement>(null)
  const shownIndex = useRef(0)
  const direction = useRef(1)
  const elapsedMs = useRef(0)

  const go = useCallback(
    (delta: 1 | -1) => {
      direction.current = delta
      elapsedMs.current = 0
      setIndex((current) => (current + delta + count) % count)
    },
    [count],
  )

  useLayoutEffect(() => {
    const leaving = shownIndex.current
    if (leaving === index) return
    shownIndex.current = index
    if (prefersReducedMotion()) return
    const slides = rootRef.current?.querySelectorAll<HTMLElement>('.ms-car__slide')
    if (!slides) return
    const timing = { duration: SLIDE_MS, easing: SLIDE_EASING }
    const side = direction.current * 100
    const frames = transition === 'fade' ? fadeFrames : slideFrames
    slides[index]?.animate(frames(side, 0), timing)
    slides[leaving]?.animate(frames(0, -side), timing)
  }, [index, transition])

  useEffect(() => {
    if (held) return
    let lastTick = performance.now()
    const timer = setInterval(() => {
      const now = performance.now()
      if (!document.hidden) elapsedMs.current += now - lastTick
      lastTick = now
      if (elapsedMs.current >= intervalMs) go(1)
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [held, intervalMs, go])

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

  useEffect(() => {
    const root = rootRef.current
    if (!root || count < 2) return
    let press: Press | null = null
    let guardUntil = 0

    const onPointerDown = (event: PointerEvent) => {
      press = isPrimaryPress(event)
        ? { id: event.pointerId, x: event.clientX, y: event.clientY }
        : null
    }
    const onPointerUp = (event: PointerEvent) => {
      if (!press || event.pointerId !== press.id) return
      const dx = event.clientX - press.x
      const dy = event.clientY - press.y
      press = null
      if (!isHorizontalGesture(dx, dy, SWIPE_PX)) return
      guardUntil = performance.now() + CLICK_GUARD_MS
      go(dx < 0 ? 1 : -1)
    }
    const onPointerCancel = () => {
      press = null
    }
    const onClick = (event: MouseEvent) => {
      if (performance.now() >= guardUntil) return
      guardUntil = 0
      event.preventDefault()
      event.stopPropagation()
    }
    const onDragStart = (event: DragEvent) => event.preventDefault()

    root.addEventListener('pointerdown', onPointerDown)
    root.addEventListener('pointerup', onPointerUp)
    root.addEventListener('pointercancel', onPointerCancel)
    root.addEventListener('click', onClick, true)
    root.addEventListener('dragstart', onDragStart)
    return () => {
      root.removeEventListener('pointerdown', onPointerDown)
      root.removeEventListener('pointerup', onPointerUp)
      root.removeEventListener('pointercancel', onPointerCancel)
      root.removeEventListener('click', onClick, true)
      root.removeEventListener('dragstart', onDragStart)
    }
  }, [count, go])

  return { index, held, rootRef, go }
}
