import { useCallback, useEffect, useRef } from 'react'
import { easeOutCubic, nearestStep, shortestDelta, wrapOffset } from './rail-math'

const AUTO_ADVANCE_MS = 3500
const GLIDE_MS = 800
const TICK_MS = 100

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const useAutoRail = (count: number, held: boolean) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const offset = useRef(0)
  const target = useRef(0)
  const frame = useRef(0)
  const metrics = useRef({ step: 0, setWidth: 0 })
  const elapsedMs = useRef(0)
  const blocked = useRef({ keyboard: false, offscreen: true })
  const heldRef = useRef(held)

  useEffect(() => {
    heldRef.current = held
  }, [held])

  const paint = useCallback(() => {
    const { step, setWidth } = metrics.current
    if (!setWidth) return
    const position = wrapOffset(offset.current, setWidth)
    trackRef.current?.style.setProperty(
      'transform',
      `translate3d(${-(position + setWidth)}px, 0, 0)`,
    )
    progressRef.current?.style.setProperty(
      'transform',
      `scaleX(${Math.min((position + step) / setWidth, 1)})`,
    )
  }, [])

  const glideTo = useCallback(
    (destination: number) => {
      cancelAnimationFrame(frame.current)
      target.current = destination
      elapsedMs.current = 0
      if (prefersReducedMotion()) {
        offset.current = destination
        paint()
        return
      }
      const origin = offset.current
      const startedAt = performance.now()
      const animate = (now: number) => {
        const progress = Math.min(Math.max(now - startedAt, 0) / GLIDE_MS, 1)
        offset.current = origin + (destination - origin) * easeOutCubic(progress)
        paint()
        if (progress < 1) frame.current = requestAnimationFrame(animate)
      }
      frame.current = requestAnimationFrame(animate)
    },
    [paint],
  )

  const showCard = useCallback(
    (index: number) => {
      const { step, setWidth } = metrics.current
      if (!step) return
      const delta = shortestDelta(wrapOffset(target.current, setWidth), index * step, setWidth)
      glideTo(target.current + delta)
    },
    [glideTo],
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      const first = track.children[0]
      const second = track.children[1]
      const repeated = track.children[count]
      if (!(first instanceof HTMLElement && second instanceof HTMLElement)) return
      if (!(repeated instanceof HTMLElement)) return
      const previousStep = metrics.current.step
      const step = second.offsetLeft - first.offsetLeft
      const index = previousStep ? Math.round(target.current / previousStep) : 0
      metrics.current = { step, setWidth: repeated.offsetLeft - first.offsetLeft }
      cancelAnimationFrame(frame.current)
      offset.current = index * step
      target.current = index * step
      paint()
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [count, paint])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const observer = new IntersectionObserver(([entry]) => {
      blocked.current.offscreen = !entry?.isIntersecting
    })
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let lastTick = performance.now()
    const timer = setInterval(() => {
      const now = performance.now()
      const { keyboard, offscreen } = blocked.current
      if (!(keyboard || offscreen || heldRef.current || document.hidden)) {
        elapsedMs.current += now - lastTick
      }
      lastTick = now
      const { step } = metrics.current
      if (step && elapsedMs.current >= AUTO_ADVANCE_MS) {
        glideTo(nearestStep(target.current, step) + step)
      }
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [glideTo])

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const onFocusIn = (event: FocusEvent) => {
      if (!(event.target instanceof Element && event.target.matches(':focus-visible'))) return
      blocked.current.keyboard = true
      const card = event.target.closest('li')
      const position = card ? [...track.children].indexOf(card) : -1
      if (position >= 0) showCard(position % count)
    }
    const onFocusOut = () => {
      blocked.current.keyboard = false
    }
    viewport.addEventListener('focusin', onFocusIn)
    viewport.addEventListener('focusout', onFocusOut)
    return () => {
      viewport.removeEventListener('focusin', onFocusIn)
      viewport.removeEventListener('focusout', onFocusOut)
    }
  }, [count, showCard])

  return { viewportRef, trackRef, progressRef, showCard }
}
