import type { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router'

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  readonly href: string
}

const isWebAddress = (href: string): boolean => /^https?:/.test(href)

const isExternal = (href: string): boolean => /^(https?:|mailto:|tel:)/.test(href)

export const SiteLink = ({ href, children, ...props }: SiteLinkProps) => {
  if (isWebAddress(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
  if (isExternal(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  )
}
