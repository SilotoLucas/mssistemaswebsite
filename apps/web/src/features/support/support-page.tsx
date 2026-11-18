import { COMPANY_PHONES } from '../../shared/config/company-info'
import { SUPPORT_URL } from '../../shared/config/site-config'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { Reveal } from '../../shared/ui/reveal'
import { SiteLink } from '../../shared/ui/site-link'
import { DemoRequestSection } from '../demo-request'
import { SUPPORT_DOWNLOADS, SUPPORT_STEPS } from './support-content'
import './support.css'

export const SupportPage = () => (
  <main>
    <title>Suporte | MS Sistemas</title>
    <meta
      name="description"
      content="Abra um chamado, fale com a equipe da MS Sistemas e baixe as ferramentas oficiais de acesso remoto."
    />
    <PageHero
      crumb="Suporte"
      title="Suporte de quem conhece o seu sistema"
      lead="Abra um chamado, ligue para a equipe ou peça um acesso remoto. Você escolhe o caminho mais cômodo."
      showActions={false}
      aside={
        <div className="ms-su-quick">
          <SiteLink className="ms-btn ms-btn--primary ms-btn--lg ms-btn--block" href={SUPPORT_URL}>
            Abrir chamado no MS Suporte
          </SiteLink>
          {COMPANY_PHONES.map((phone) => (
            <SiteLink
              className="ms-btn ms-btn--glass ms-btn--block"
              href={phone.href}
              key={phone.href}
            >
              <Icon name="phone-call" size={20} />
              {phone.label}
            </SiteLink>
          ))}
        </div>
      }
    />
    <section className="ms-section ms-section--mist" id="como-funciona">
      <div className="ms-wrap">
        <Reveal className="ms-su-head">
          <p className="ms-eyebrow ms-eyebrow--light">Como funciona</p>
          <h2 className="ms-h2">Três jeitos de ser atendido</h2>
        </Reveal>
        <ol className="ms-su-steps">
          {SUPPORT_STEPS.map((step, index) => (
            <li key={step.title}>
              <Reveal className="ms-su-step" delay={index * 90}>
                <span className="ms-su-step__i">
                  <Icon name={step.icon} size={26} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
    <section className="ms-section" id="downloads">
      <div className="ms-wrap">
        <Reveal className="ms-su-head">
          <p className="ms-eyebrow ms-eyebrow--light">Downloads</p>
          <h2 className="ms-h2">Ferramentas para o atendimento</h2>
          <p className="ms-su-lead">
            Baixe sempre pelos links oficiais dos fabricantes. Em caso de dúvida, confirme com um
            consultor antes de instalar.
          </p>
        </Reveal>
        <ul className="ms-su-dl">
          {SUPPORT_DOWNLOADS.map((item) => (
            <li className="ms-su-dl__item" key={item.name}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              {item.href ? (
                <SiteLink
                  className="ms-btn ms-btn--secondary ms-btn--sm"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Baixar<span className="ms-sr"> {item.name} (abre o site do fabricante)</span>
                </SiteLink>
              ) : (
                <SiteLink className="ms-btn ms-btn--secondary ms-btn--sm" href="/contato">
                  Falar com consultor<span className="ms-sr"> sobre {item.name}</span>
                </SiteLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
    <DemoRequestSection />
  </main>
)
