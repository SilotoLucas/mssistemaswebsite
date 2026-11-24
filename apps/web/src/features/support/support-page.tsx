import { COMPANY_PHONES } from '../../shared/config/company-info'
import { SUPPORT_URL, whatsappMessageHref } from '../../shared/config/site-config'
import { Aurora } from '../../shared/ui/aurora'
import { ChatMockups } from '../../shared/ui/chat-mockup'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { Reveal } from '../../shared/ui/reveal'
import { SiteLink } from '../../shared/ui/site-link'
import { WhatsappButton } from '../../shared/ui/whatsapp-button'
import { SUPPORT_DOWNLOADS, SUPPORT_FLOW, SUPPORT_STRENGTHS } from './support-content'
import './support.css'

export const SupportPage = () => (
  <main>
    <title>Suporte | MS Sistemas</title>
    <meta
      name="description"
      content="Suporte rápido da MS Sistemas: fale com um consultor pelo WhatsApp, abra uma solicitação ou peça acesso remoto."
    />
    <PageHero
      crumb="Suporte"
      title="Suporte rápido, direto no WhatsApp"
      lead="O nosso suporte é o que mais nos orgulha. Chame no WhatsApp e fale com quem conhece o seu sistema e o setor."
      actions={
        <>
          <WhatsappButton large />
          <SiteLink className="ms-btn ms-btn--glass ms-btn--lg" href={SUPPORT_URL}>
            Abrir solicitação
          </SiteLink>
        </>
      }
      aside={
        <div className="ms-su-chat">
          <ChatMockups />
        </div>
      }
    />
    <section className="ms-section ms-section--mist" id="diferenciais">
      <div className="ms-wrap">
        <Reveal className="ms-su-head">
          <p className="ms-eyebrow ms-eyebrow--light">Nosso diferencial</p>
          <h2 className="ms-h2">
            Suporte que <span className="ms-grad ms-grad--deep">resolve de verdade</span>
          </h2>
        </Reveal>
        <ul className="ms-su-strengths">
          {SUPPORT_STRENGTHS.map((item, index) => (
            <li key={item.title}>
              <Reveal className="ms-su-card" delay={index * 80}>
                <span className="ms-su-card__i">
                  <Icon name={item.icon} size={26} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <section className="ms-section" id="como-funciona">
      <div className="ms-wrap">
        <Reveal className="ms-su-head">
          <p className="ms-eyebrow ms-eyebrow--light">Como funciona</p>
          <h2 className="ms-h2">Da mensagem à solução</h2>
        </Reveal>
        <ol className="ms-su-flow">
          {SUPPORT_FLOW.map((step, index) => (
            <li key={step.title}>
              <Reveal className="ms-su-step" delay={index * 90}>
                <span className="ms-su-step__n" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="ms-su-other">
          <p>Prefere outro canal?</p>
          <SiteLink className="ms-btn ms-btn--secondary ms-btn--sm" href={SUPPORT_URL}>
            Abrir solicitação no MS Suporte
          </SiteLink>
          {COMPANY_PHONES.map((phone) => (
            <SiteLink
              className="ms-btn ms-btn--secondary ms-btn--sm"
              href={phone.href}
              key={phone.href}
            >
              <Icon name="phone-call" size={18} />
              {phone.label}
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
    <section className="ms-section ms-section--mist" id="downloads">
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
                <SiteLink
                  className="ms-btn ms-btn--secondary ms-btn--sm"
                  href={whatsappMessageHref(`Olá! Preciso do instalador do ${item.name}.`)}
                >
                  Falar com consultor<span className="ms-sr"> sobre {item.name}</span>
                </SiteLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
    <section className="ms-section ms-su-final ms-dark" id="atendimento">
      <Aurora />
      <div className="ms-wrap ms-su-final__in">
        <Reveal className="ms-su-final__c">
          <h2 className="ms-h2">Chame um consultor agora</h2>
          <p>O setor não para. Fale com a equipe da MS pelo WhatsApp.</p>
          <WhatsappButton large />
        </Reveal>
      </div>
    </section>
  </main>
)
