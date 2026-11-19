import { PageHero } from '../../shared/ui/page-hero'
import { WhatsappButton } from '../../shared/ui/whatsapp-button'
import { DemoPoints } from './demo-points'
import { DemoRequestForm } from './demo-request-form'
import './demo-request.css'

export const DemoRequestPage = () => (
  <main className="ms-dm">
    <title>Solicitar demonstração | MS Sistemas</title>
    <meta
      name="description"
      content="Peça uma demonstração dos sistemas da MS. Conte sobre a sua empresa, marque os módulos que interessam e um consultor entra em contato."
    />
    <PageHero
      crumb="Demonstração"
      title="Solicite uma demonstração"
      lead="Conte um pouco sobre a sua empresa e marque os módulos que interessam. Um consultor entra em contato para combinar a demonstração."
      actions={
        <>
          <DemoPoints className="ms-dm-points" />
          <div className="ms-dm-alt">
            <p>Prefere falar agora?</p>
            <WhatsappButton />
          </div>
        </>
      }
      aside={
        <div className="ms-dm-form" id="formulario">
          <DemoRequestForm />
        </div>
      }
    />
  </main>
)
