import { DemoRequestSection } from '../demo-request'
import { BenefitsSection } from './sections/benefits-section'
import { ClientPortalSection } from './sections/client-portal-section'
import { EcosystemSection } from './sections/ecosystem-section'
import { HeroSection } from './sections/hero-section'
import { PresenceSection } from './sections/presence-section'
import { ProofSection } from './sections/proof-section'
import { SegmentsSection } from './sections/segments-section'
import { SupportSection } from './sections/support-section'

export const HomePage = () => (
  <main>
    <title>MS Sistemas | Gestão para funerárias, planos, cemitérios e crematórios</title>
    <meta
      name="description"
      content="Software de gestão para funerárias, planos, cemitérios e crematórios, com atendimento rápido pelo WhatsApp. Desde 2005."
    />
    <HeroSection />
    <ProofSection />
    <SupportSection />
    <SegmentsSection />
    <ClientPortalSection />
    <EcosystemSection />
    <BenefitsSection />
    <PresenceSection />
    <DemoRequestSection />
  </main>
)
