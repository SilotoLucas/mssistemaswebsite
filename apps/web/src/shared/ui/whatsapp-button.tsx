import { WHATSAPP_HREF } from '../config/site-config'
import { Icon } from './icon'
import { SiteLink } from './site-link'

type WhatsappButtonProps = { readonly block?: boolean; readonly large?: boolean }

export const WhatsappButton = ({ block = false, large = false }: WhatsappButtonProps) => (
  <SiteLink
    className={`ms-btn ms-btn--whatsapp${large ? ' ms-btn--lg' : ''}${block ? ' ms-btn--block' : ''}`}
    href={WHATSAPP_HREF}
  >
    <Icon name="message" size={20} />
    Chamar no WhatsApp
  </SiteLink>
)
