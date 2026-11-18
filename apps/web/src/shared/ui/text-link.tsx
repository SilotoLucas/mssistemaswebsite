import { Icon } from './icon'
import { SiteLink } from './site-link'

type TextLinkProps = {
  readonly label: string
  readonly href: string
  readonly hiddenContext?: string
}

export const TextLink = ({ label, href, hiddenContext }: TextLinkProps) => (
  <SiteLink className="ms-link" href={href}>
    <span className="ms-link__t">{label}</span>
    {hiddenContext ? <span className="ms-sr"> {hiddenContext}</span> : null}
    <Icon name="arrow-right" size={20} />
  </SiteLink>
)
