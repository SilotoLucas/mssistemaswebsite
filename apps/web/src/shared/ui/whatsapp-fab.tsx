import { WHATSAPP_HREF } from '../config/site-config'
import { Icon } from './icon'
import { SiteLink } from './site-link'

export const WhatsappFab = () => (
  <SiteLink className="ms-fab" href={WHATSAPP_HREF} aria-label="Falar com um consultor no WhatsApp">
    <Icon name="message" size={26} />
    <span className="ms-fab__t">Falar com consultor</span>
  </SiteLink>
)
