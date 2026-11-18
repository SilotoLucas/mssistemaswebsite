import { useEffect, useState } from 'react'
import { countAt } from './count-up-math'
import { prefersReducedMotion } from './motion'
import { useInView } from './use-in-view'

type CountUpProps = {
  readonly target: number
  readonly prefix?: string
  readonly suffix?: string
  readonly durationMs?: number
}

const COUNT_THRESHOLD = 0.6
const DEFAULT_DURATION_MS = 1600

export const CountUp = ({
  target,
  prefix = '',
  suffix = '',
  durationMs = DEFAULT_DURATION_MS,
}: CountUpProps) => {
  const { ref, seen } = useInView<HTMLSpanElement>(COUNT_THRESHOLD)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!seen) return
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const elapsed = now - start
      setValue(countAt(target, elapsed, durationMs))
      if (elapsed < durationMs) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [seen, target, durationMs])

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="ms-sr">
        {prefix}
        {target}
        {suffix}
      </span>
    </span>
  )
}
