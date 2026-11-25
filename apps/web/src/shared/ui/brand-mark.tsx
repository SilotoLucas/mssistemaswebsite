import compactUrl from '../../assets/ms-logo-2d-compacto.webp'
import fullUrl from '../../assets/ms-logo-3d-completo.webp'

const ARTWORK = {
  compact: { src: compactUrl, width: 960, height: 476 },
  full: { src: fullUrl, width: 640, height: 377 },
} as const

type BrandMarkProps = { readonly variant: keyof typeof ARTWORK }

export const BrandMark = ({ variant }: BrandMarkProps) => {
  const { src, width, height } = ARTWORK[variant]
  return (
    <img
      className={`ms-mark ms-mark--${variant}`}
      src={src}
      alt="MS Consultoria & Sistemas"
      width={width}
      height={height}
    />
  )
}
