import { useLocation } from 'react-router'
import { WHATSAPP_HREF } from '../config/site-config'
import { Icon } from './icon'
import { SiteLink } from './site-link'

const ROUTES_WITHOUT_FAB: readonly string[] = ['/contato']

export const WhatsappFab = () => {
  const { pathname } = useLocation()
  if (ROUTES_WITHOUT_FAB.includes(pathname)) return null
  return (
    <SiteLink className="ms-fab" href={WHATSAPP_HREF} aria-label="Fale conosco pelo WhatsApp">
      <Icon name="message" size={26} />
      <span className="ms-fab__t">Fale conosco</span>
    </SiteLink>
  )
}
