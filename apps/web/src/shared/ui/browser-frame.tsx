import './browser-frame.css'

type BrowserFrameProps = {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
  readonly address: string
  readonly className?: string
  readonly lazy?: boolean
}

export const BrowserFrame = ({
  src,
  alt,
  width,
  height,
  address,
  className = '',
  lazy = false,
}: BrowserFrameProps) => (
  <figure className={`ms-bf ${className}`}>
    <div className="ms-bf__bar" aria-hidden="true">
      <span className="ms-bf__dots">
        <span />
        <span />
        <span />
      </span>
      <span className="ms-bf__url">{address}</span>
    </div>
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
