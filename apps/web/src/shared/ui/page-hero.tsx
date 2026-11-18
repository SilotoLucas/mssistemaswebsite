import type { ReactNode } from 'react'
import { Aurora } from './aurora'
import './page-hero.css'
import { SiteLink } from './site-link'
import { WhatsappButton } from './whatsapp-button'

type PageHeroProps = {
  readonly crumb: string
  readonly title: string
  readonly lead: string
  readonly aside?: ReactNode
}

export const PageHero = ({ crumb, title, lead, aside }: PageHeroProps) => (
  <section className="ms-ph ms-dark">
    <Aurora />
    <div className="ms-wrap ms-ph__g">
      <div className="ms-ph__c">
        <nav className="ms-crumb" aria-label="Você está em">
          <SiteLink href="/">Início</SiteLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1>{title}</h1>
        <p className="ms-ph__p">{lead}</p>
        <div className="ms-ph__cta">
          <SiteLink className="ms-btn ms-btn--primary ms-btn--lg" href="#demonstracao">
            Solicitar demonstração
          </SiteLink>
          <WhatsappButton />
        </div>
      </div>
      {aside}
    </div>
  </section>
)
