import {
  COMPANY_ADDRESS_LINES,
  COMPANY_EMAIL,
  COMPANY_PHONES,
} from '../../shared/config/company-info'
import { NAVIGATION, SYSTEM_ACCESS } from '../../shared/config/site-config'
import { BrandMark } from '../../shared/ui/brand-mark'
import { Icon } from '../../shared/ui/icon'
import { SiteLink } from '../../shared/ui/site-link'

export const SiteFooter = () => (
  <footer className="ms-footer">
    <div className="ms-wrap">
      <div className="ms-footer__top">
        <div className="ms-footer__brand">
          <span className="ms-footer__logo">
            <BrandMark variant="full" />
          </span>
          <p>Software de gestão para funerárias, planos, cemitérios e crematórios desde 2005.</p>
          <div className="ms-social">
            <SiteLink href="https://www.facebook.com/mssist" aria-label="Facebook da MS Sistemas">
              <Icon name="facebook" />
            </SiteLink>
            <SiteLink
              href="https://www.instagram.com/mssistemas5"
              aria-label="Instagram da MS Sistemas"
            >
              <Icon name="instagram" />
            </SiteLink>
          </div>
        </div>
        <div className="ms-footer__cols">
          <nav aria-label="Rodapé">
            <p className="ms-footer__t">Navegação</p>
            <ul className="ms-footer__links">
              {NAVIGATION.map((link) => (
                <li key={link.href}>
                  <SiteLink href={link.href}>{link.label}</SiteLink>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Acesso aos sistemas">
            <p className="ms-footer__t">Acesso aos sistemas</p>
            <ul className="ms-footer__links">
              {SYSTEM_ACCESS.map((system) => (
                <li key={system.name}>
                  <SiteLink href={system.href}>{system.name}</SiteLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="ms-footer__t">Contato</p>
            <address>
              <span>
                {COMPANY_ADDRESS_LINES[0]}
                <br />
                {COMPANY_ADDRESS_LINES[1]}
              </span>
              {COMPANY_PHONES.map((phone) => (
                <a href={phone.href} key={phone.href}>
                  {phone.label}
                </a>
              ))}
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
            </address>
          </div>
        </div>
      </div>
      <div className="ms-footer__bottom">
        <SiteLink href="/politica-de-privacidade">Política de Privacidade</SiteLink>
      </div>
    </div>
  </footer>
)
