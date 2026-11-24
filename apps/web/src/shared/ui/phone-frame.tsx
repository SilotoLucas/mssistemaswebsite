import type { CSSProperties } from 'react'
import './phone-frame.css'

type PhoneFrameProps = {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
  readonly className?: string
  readonly lazy?: boolean
}

export const PhoneFrame = ({
  src,
  alt,
  width,
  height,
  className = '',
  lazy = false,
}: PhoneFrameProps) => (
  <div
    className={`ms-phone ${className}`}
    style={{ '--ar': `${width} / ${height}` } as CSSProperties}
  >
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : undefined}
      draggable={false}
    />
  </div>
)
