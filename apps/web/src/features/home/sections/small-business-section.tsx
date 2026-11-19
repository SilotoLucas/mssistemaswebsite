import smallBusinessLogo from '../../../assets/smallbusiness-logo.webp'
import {
  SMALL_BUSINESS_HREF,
  SMALL_BUSINESS_MODULES,
  SMALL_BUSINESS_PERKS,
} from '../../../shared/config/small-business'
import { Aurora } from '../../../shared/ui/aurora'
import { Icon } from '../../../shared/ui/icon'
import { Reveal } from '../../../shared/ui/reveal'
import { SiteLink } from '../../../shared/ui/site-link'

export const SmallBusinessSection = () => (
  <section className="ms-por ms-dark" id="smallbusiness">
    <Aurora />
    <div className="ms-wrap">
      <Reveal className="ms-por__head">
        <p className="ms-eyebrow">SmallBusiness</p>
        <h2>
          O sistema da MS em <span className="ms-grad">versão compacta</span>
        </h2>
        <p className="ms-por__i">
          Os módulos essenciais em um pacote enxuto, hospedado na nuvem, para começar rápido e com
          ótimo custo-benefício.
        </p>
      </Reveal>
      <Reveal className="ms-sbx">
        <div className="ms-por__glow" aria-hidden="true" />
        <div className="ms-sbx__brand">
          <img
            className="ms-sbx__logo"
            src={smallBusinessLogo}
            alt="SmallBusiness, sistema de gestão"
            width={560}
            height={560}
            loading="lazy"
          />
        </div>
        <div className="ms-sbx__body ms-glass">
          <p className="ms-por__cap">Módulos incluídos</p>
          <ul className="ms-sbx__mods">
            {SMALL_BUSINESS_MODULES.map((item) => (
              <li key={item.label}>
                <span className="ms-sbx__mods-i">
                  <Icon name={item.icon} size={22} />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
          <ul className="ms-sbx__perks">
            {SMALL_BUSINESS_PERKS.map((item) => (
              <li key={item.label}>
                <Icon name={item.icon} size={18} />
                {item.label}
              </li>
            ))}
          </ul>
          <SiteLink className="ms-btn ms-btn--whatsapp ms-btn--lg" href={SMALL_BUSINESS_HREF}>
            <Icon name="message" size={20} />
            Quero conhecer o SmallBusiness
          </SiteLink>
        </div>
      </Reveal>
    </div>
  </section>
)
