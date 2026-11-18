import logoUrl from '../../assets/ms-logo.webp'

type BrandLogoProps = { readonly width: number; readonly height: number }

export const BrandLogo = ({ width, height }: BrandLogoProps) => (
  <img src={logoUrl} alt="MS Consultoria &amp; Sistemas" width={width} height={height} />
)
