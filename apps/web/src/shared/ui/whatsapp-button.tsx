import { WHATSAPP_HREF } from '../config/site-config'
import { Icon } from './icon'
import { SiteLink } from './site-link'

type WhatsappButtonProps = { readonly block?: boolean }

export const WhatsappButton = ({ block = false }: WhatsappButtonProps) => (
  <SiteLink
    className={`ms-btn ms-btn--whatsapp${block ? ' ms-btn--block' : ''}`}
    href={WHATSAPP_HREF}
  >
    <Icon name="message" size={20} />
    Chamar no WhatsApp
  </SiteLink>
)
