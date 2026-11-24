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

const SCREEN_WIDTH = 0.96
const BEZEL_HEIGHT = 0.13

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
    style={{ '--ar': `1 / ${(SCREEN_WIDTH * height) / width + BEZEL_HEIGHT}` } as CSSProperties}
  >
    <div className="ms-phone__body">
      <span className="ms-phone__cam" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : undefined}
        draggable={false}
      />
    </div>
  </div>
)
