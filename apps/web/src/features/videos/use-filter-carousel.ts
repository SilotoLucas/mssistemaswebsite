import { useCallback, useEffect, useRef, useState } from 'react'
import { CLICK_GUARD_MS, DRAG_THRESHOLD_PX, isPrimaryPress } from '../../shared/ui/gesture'
import { prefersReducedMotion } from '../../shared/ui/motion'

const EDGE_PX = 4
const PAGE_RATIO = 0.7
const GLIDE_MS = 420

const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3

type Edges = { readonly start: boolean; readonly end: boolean }

const readEdges = (track: HTMLElement): Edges => ({
  start: track.scrollLeft > EDGE_PX,
  end: track.scrollLeft + track.clientWidth < track.scrollWidth - EDGE_PX,
})

export const useFilterCarousel = (activeKey: string) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const glideRef = useRef(0)
  const [edges, setEdges] = useState<Edges>({ start: false, end: false })

  const refresh = useCallback(() => {
    const track = trackRef.current
    if (track) setEdges(readEdges(track))
  }, [])

  const glideTo = useCallback((left: number) => {
    const track = trackRef.current
    if (!track) return
    cancelAnimationFrame(glideRef.current)
    const max = track.scrollWidth - track.clientWidth
    const target = Math.min(Math.max(left, 0), Math.max(max, 0))
    if (prefersReducedMotion()) {
      track.scrollLeft = target
      return
    }
    const from = track.scrollLeft
    const startedAt = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / GLIDE_MS, 1)
      track.scrollLeft = from + (target - from) * easeOutCubic(progress)
      if (progress < 1) glideRef.current = requestAnimationFrame(step)
    }
    glideRef.current = requestAnimationFrame(step)
  }, [])

  const page = (direction: 1 | -1) => {
    const track = trackRef.current
    if (track) glideTo(track.scrollLeft + direction * track.clientWidth * PAGE_RATIO)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    refresh()
    track.addEventListener('scroll', refresh, { passive: true })
    window.addEventListener('resize', refresh)
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(refresh)
    observer?.observe(track)
    return () => {
      track.removeEventListener('scroll', refresh)
      window.removeEventListener('resize', refresh)
      observer?.disconnect()
    }
  }, [refresh])

  useEffect(() => () => cancelAnimationFrame(glideRef.current), [])

  useEffect(() => {
    const track = trackRef.current
    const chip = track?.querySelector<HTMLElement>(`[data-key="${activeKey}"]`)
    if (!(track && chip)) return
    glideTo(chip.offsetLeft - (track.clientWidth - chip.offsetWidth) / 2)
  }, [activeKey, glideTo])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let origin: { x: number; scroll: number } | null = null
    let dragging = false
    let guardUntil = 0

    const onDown = (event: PointerEvent) => {
      cancelAnimationFrame(glideRef.current)
      if (event.pointerType !== 'mouse' || !isPrimaryPress(event)) return
      origin = { x: event.clientX, scroll: track.scrollLeft }
      dragging = false
    }
    const onMove = (event: PointerEvent) => {
      if (!origin) return
      const dx = event.clientX - origin.x
      if (!dragging && Math.abs(dx) < DRAG_THRESHOLD_PX) return
      if (!dragging) {
        dragging = true
        track.classList.add('is-dragging')
        track.setPointerCapture?.(event.pointerId)
      }
      track.scrollLeft = origin.scroll - dx
    }
    const onUp = () => {
      if (dragging) guardUntil = performance.now() + CLICK_GUARD_MS
      origin = null
      dragging = false
      track.classList.remove('is-dragging')
    }
    const onClick = (event: MouseEvent) => {
      if (performance.now() < guardUntil) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    track.addEventListener('pointerdown', onDown)
    track.addEventListener('pointermove', onMove)
    track.addEventListener('pointerup', onUp)
    track.addEventListener('pointercancel', onUp)
    track.addEventListener('click', onClick, true)
    return () => {
      track.removeEventListener('pointerdown', onDown)
      track.removeEventListener('pointermove', onMove)
      track.removeEventListener('pointerup', onUp)
      track.removeEventListener('pointercancel', onUp)
      track.removeEventListener('click', onClick, true)
    }
  }, [])

  return { trackRef, edges, page }
}
