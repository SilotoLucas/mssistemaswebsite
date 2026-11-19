import type { ReactNode } from 'react'
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_EMAIL,
  COMPANY_PHONES,
} from '../../shared/config/company-info'
import { SUPPORT_URL, WHATSAPP_LABEL } from '../../shared/config/site-config'
import { Icon, type IconName } from '../../shared/ui/icon'
import { TextLink } from '../../shared/ui/text-link'
import { WhatsappButton } from '../../shared/ui/whatsapp-button'
import { MAP_DIRECTIONS_URL, MAP_EMBED_URL } from './company-content'

type ContactRowProps = {
  readonly icon: IconName
  readonly label: string
  readonly children: ReactNode
}

const ContactRow = ({ icon, label, children }: ContactRowProps) => (
  <div className="ms-co-contact__row">
    <span className="ms-co-tile">
      <Icon name={icon} size={22} />
    </span>
    <div>
      <h3>{label}</h3>
      {children}
    </div>
  </div>
)

export const LocationSection = () => (
  <section className="ms-co ms-co--fog" id="onde-estamos">
    <div className="ms-wrap">
      <div className="ms-co-head">
        <p className="ms-co-kicker">Fale com a MS</p>
        <h2>Onde estamos</h2>
      </div>
      <div className="ms-co-place">
        <div className="ms-co-contact">
          <ContactRow icon="pin" label="Endereço">
            <address>
              {COMPANY_ADDRESS_LINES[0]}
              <br />
              {COMPANY_ADDRESS_LINES[1]}
            </address>
          </ContactRow>
          <ContactRow icon="phone-call" label="Telefones">
            <ul className="ms-co-phones">
              {COMPANY_PHONES.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href}>{phone.label}</a>
                </li>
              ))}
            </ul>
          </ContactRow>
          <ContactRow icon="message" label="WhatsApp">
            <p className="ms-co-wa">{WHATSAPP_LABEL}</p>
            <WhatsappButton />
          </ContactRow>
          <ContactRow icon="mail" label="E-mail">
            <a className="ms-co-mail" href={`mailto:${COMPANY_EMAIL}`}>
              {COMPANY_EMAIL}
            </a>
          </ContactRow>
          <ContactRow icon="clock" label="Atendimento">
            <p>Dias úteis: telefones fixos ou plantão.</p>
            <p>Fins de semana e feriados: somente plantão.</p>
            <TextLink label="Abrir chamado" href={SUPPORT_URL} />
          </ContactRow>
        </div>
        <div className="ms-co-map">
          <iframe
            src={MAP_EMBED_URL}
            title="Mapa com a localização da MS Sistemas em Botucatu/SP"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a className="ms-btn ms-btn--primary ms-co-map__go" href={MAP_DIRECTIONS_URL}>
            <Icon name="pin" size={20} />
            Como chegar
          </a>
        </div>
      </div>
    </div>
  </section>
)
