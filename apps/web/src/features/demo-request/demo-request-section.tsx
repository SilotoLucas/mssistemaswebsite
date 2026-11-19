import { DEMO_HREF } from '../../shared/config/site-config'
import { Icon } from '../../shared/ui/icon'
import { Reveal } from '../../shared/ui/reveal'
import { SiteLink } from '../../shared/ui/site-link'
import { WhatsappButton } from '../../shared/ui/whatsapp-button'
import { DemoPoints } from './demo-points'
import './demo-request.css'

export const DemoRequestSection = () => (
  <section className="ms-section ms-demo" id="demonstracao">
    <div className="ms-wrap ms-final">
      <Reveal className="ms-final__copy">
        <p className="ms-eyebrow ms-eyebrow--light">Demonstração</p>
        <h2 className="ms-h2">
          Veja como a MS pode{' '}
          <span className="ms-grad ms-grad--deep">simplificar a sua gestão</span>
        </h2>
        <p>
          Conte um pouco sobre a sua empresa. Um consultor entra em contato para combinar a
          demonstração.
        </p>
        <DemoPoints className="ms-final__points" />
      </Reveal>
      <Reveal delay={120}>
        <div className="ms-formcard ms-dm-cta">
          <span className="ms-dm-cta__i">
            <Icon name="calendar" size={28} />
          </span>
          <h3 className="ms-h3">Peça a sua demonstração</h3>
          <p>
            Informe nome, empresa, cidade e WhatsApp. Se quiser, marque o SmallBusiness ou os
            módulos que interessam.
          </p>
          <SiteLink className="ms-btn ms-btn--primary ms-btn--lg ms-btn--block" href={DEMO_HREF}>
            Solicitar demonstração
            <Icon name="arrow-right" size={20} />
          </SiteLink>
          <div className="ms-dm-cta__or">
            <span>ou</span>
          </div>
          <WhatsappButton block />
        </div>
      </Reveal>
    </div>
  </section>
)
