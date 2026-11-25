import { useLocation } from 'react-router'
import { DEMO_HREF, NAVIGATION } from '../../shared/config/site-config'
import { BrandMark } from '../../shared/ui/brand-mark'
import { Icon } from '../../shared/ui/icon'
import { SiteLink } from '../../shared/ui/site-link'
import { SystemLinks } from './system-links'
import { useHeaderMenus } from './use-header-menus'
import { useScrolled } from './use-scrolled'

type NavigationLinksProps = { readonly onNavigate?: () => void }

const isCurrent = (pathname: string, href: string): boolean =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

const NavigationLinks = ({ onNavigate }: NavigationLinksProps) => {
  const { pathname } = useLocation()
  return (
    <>
      {NAVIGATION.map((link) => (
        <SiteLink
          href={link.href}
          key={link.href}
          onClick={onNavigate}
          aria-current={isCurrent(pathname, link.href) ? 'page' : undefined}
        >
          {link.label}
        </SiteLink>
      ))}
    </>
  )
}

export const SiteHeader = () => {
  const menus = useHeaderMenus()
  const scrolled = useScrolled()

  return (
    <header className={`ms-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="ms-header__shell">
        <div className="ms-header__bar">
          <div className="ms-wrap ms-header__in">
            <SiteLink
              className="ms-header__logo"
              href="/"
              aria-label="MS Consultoria &amp; Sistemas, página inicial"
            >
              <BrandMark variant="light" />
            </SiteLink>
            <nav className="ms-nav" aria-label="Principal">
              <NavigationLinks />
            </nav>
            <div className="ms-header__actions">
              <div className="ms-access" ref={menus.accessRef}>
                <button
                  className="ms-access__btn"
                  type="button"
                  aria-expanded={menus.accessOpen}
                  aria-controls="ms-access-menu"
                  onClick={menus.toggleAccess}
                  ref={menus.accessButtonRef}
                >
                  Acessar sistemas
                  <Icon name="chevron-down" size={16} />
                </button>
                <div className="ms-access__menu" id="ms-access-menu" hidden={!menus.accessOpen}>
                  <SystemLinks />
                </div>
              </div>
              <SiteLink className="ms-btn ms-btn--primary ms-btn--sm" href={DEMO_HREF}>
                <span className="ms-cta-full">Solicitar demonstração</span>
                <span className="ms-cta-short">Demonstração</span>
              </SiteLink>
              <button
                className="ms-burger"
                type="button"
                aria-label={menus.drawerOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menus.drawerOpen}
                aria-controls="ms-drawer"
                onClick={menus.toggleDrawer}
                ref={menus.burgerRef}
              >
                <Icon name={menus.drawerOpen ? 'x' : 'menu'} />
              </button>
            </div>
          </div>
        </div>
        <div className="ms-wrap ms-header__drop">
          <div className="ms-drawer" id="ms-drawer" hidden={!menus.drawerOpen}>
            <div className="ms-drawer__in">
              <nav className="ms-drawer__nav" aria-label="Principal no celular">
                <NavigationLinks onNavigate={menus.closeDrawer} />
              </nav>
              <div>
                <p className="ms-drawer__label">Acessar sistemas</p>
                <SystemLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
