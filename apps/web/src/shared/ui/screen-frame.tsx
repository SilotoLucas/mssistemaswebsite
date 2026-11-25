import './screen-frame.css'

type ScreenFrameProps = {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
  readonly className?: string
  readonly lazy?: boolean
}

export const ScreenFrame = ({
  src,
  alt,
  width,
  height,
  className = '',
  lazy = false,
}: ScreenFrameProps) => (
  <figure className={`ms-shot ${className}`}>
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : undefined}
      draggable={false}
    />
  </figure>
)
