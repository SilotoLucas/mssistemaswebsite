import type { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router'

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  readonly href: string
}

const isExternal = (href: string): boolean => /^(https?:|mailto:|tel:)/.test(href)

export const SiteLink = ({ href, children, ...props }: SiteLinkProps) =>
  isExternal(href) ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <Link to={href} {...props}>
      {children}
    </Link>
  )
