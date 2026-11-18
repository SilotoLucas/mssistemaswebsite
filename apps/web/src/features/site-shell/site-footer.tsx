import { NAVIGATION, SYSTEM_ACCESS } from '../../shared/config/site-config'
import { BrandLogo } from '../../shared/ui/brand-logo'
import { Icon } from '../../shared/ui/icon'
import { SiteLink } from '../../shared/ui/site-link'

export const SiteFooter = () => (
  <footer className="ms-footer">
    <div className="ms-wrap">
      <div className="ms-footer__top">
        <div className="ms-footer__brand">
          <span className="ms-footer__logo">
            <BrandLogo width={97} height={48} />
          </span>
          <p>Software de gestão para funerárias, planos, cemitérios e crematórios desde 2005.</p>
          <div className="ms-social">
            <a href="https://www.facebook.com/mssist" aria-label="Facebook da MS Sistemas">
              <Icon name="facebook" />
            </a>
            <a href="https://www.instagram.com/mssistemas5" aria-label="Instagram da MS Sistemas">
              <Icon name="instagram" />
            </a>
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
                  <a href={system.href}>{system.name}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="ms-footer__t">Contato</p>
            <address>
              <span>
                Rua Florindo Silva, 51
                <br />
                Botucatu/SP, CEP 18610-150
              </span>
              <a href="tel:+551438156846">(14) 3815-6846</a>
              <a href="tel:+551438140749">(14) 3814-0749</a>
              <a href="mailto:contato@mssistemas.com.br">contato@mssistemas.com.br</a>
            </address>
          </div>
        </div>
      </div>
      <div className="ms-footer__bottom">
        <p>Parceiros: Granito, Rede Parcerias e iugu</p>
        <a href="#privacidade">Política de Privacidade</a>
      </div>
    </div>
  </footer>
)
