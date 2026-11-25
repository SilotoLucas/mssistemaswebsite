import onDarkUrl from '../../assets/ms-logo-2d-claro.webp'
import compactUrl from '../../assets/ms-logo-2d-compacto.webp'

const ARTWORK = {
  compact: { src: compactUrl, width: 960, height: 476 },
  dark: { src: onDarkUrl, width: 720, height: 357 },
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
