import type { CSSProperties, ReactNode } from 'react'
import { useInView } from './use-in-view'

type RevealProps = {
  readonly children: ReactNode
  readonly className?: string
  readonly delay?: number
}

const REVEAL_THRESHOLD = 0.12

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const { ref, seen } = useInView<HTMLDivElement>(REVEAL_THRESHOLD)
  const classes = ['ms-rv', seen ? 'is-in' : '', className ?? ''].filter(Boolean).join(' ')
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined

  return (
    <div className={classes} style={style} ref={ref}>
      {children}
    </div>
  )
}
