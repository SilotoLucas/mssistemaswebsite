import { PageHero } from '../../shared/ui/page-hero'
import { LocationSection } from '../company'
import { DemoRequestSection } from '../demo-request'

export const ContactPage = () => (
  <main>
    <title>Contato | MS Sistemas</title>
    <meta
      name="description"
      content="Fale com a MS Sistemas por telefone, e-mail ou WhatsApp, ou peça uma demonstração dos sistemas para o seu negócio."
    />
    <PageHero
      crumb="Contato"
      title="Vamos conversar sobre o seu negócio"
      lead="Peça uma demonstração ou fale direto com a equipe. Respondemos com atenção, sem enrolação."
    />
    <DemoRequestSection />
    <LocationSection />
  </main>
)
