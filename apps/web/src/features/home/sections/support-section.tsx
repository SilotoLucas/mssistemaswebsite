import { SUPPORT_URL, WHATSAPP_LABEL } from '../../../shared/config/site-config'
import { Aurora } from '../../../shared/ui/aurora'
import { ChatMockups } from '../../../shared/ui/chat-mockup'
import { Icon, type IconName } from '../../../shared/ui/icon'
import { Reveal } from '../../../shared/ui/reveal'
import { WhatsappButton } from '../../../shared/ui/whatsapp-button'

type SupportItem = {
  readonly icon: IconName
  readonly title: string
  readonly text: string
}

const SUPPORT_ITEMS: readonly SupportItem[] = [
  {
    icon: 'message',
    title: 'Atendimento rápido',
    text: 'Sua mensagem chega direto à nossa equipe.',
  },
  {
    icon: 'headset',
    title: 'Quem atende conhece o setor',
    text: 'Equipe especializada na rotina de funerárias, planos, cemitérios e crematórios.',
  },
  {
    icon: 'clock',
    title: 'Plantão em fins de semana e feriados',
    text: 'Nos dias úteis, fale também pelos telefones fixos.',
  },
]

export const SupportSection = () => (
  <section className="ms-section ms-sup-sec ms-dark" id="atendimento">
    <Aurora />
    <div className="ms-wrap ms-sup">
      <Reveal className="ms-sup__copy">
        <p className="ms-eyebrow">
          <span className="ms-pulse" aria-hidden="true" />
          Atendimento
        </p>
        <h2>
          Precisou da MS? <span className="ms-grad">Chame no WhatsApp</span>
        </h2>
        <p className="ms-sup__lead">
          O setor não para, e o nosso atendimento também não. Fale pelo WhatsApp com uma equipe
          especializada e resolva com rapidez.
        </p>
        <div className="ms-wanum">
          <span>WhatsApp da MS</span>
          <strong>{WHATSAPP_LABEL}</strong>
        </div>
        <div className="ms-sup__cta">
          <WhatsappButton />
          <a className="ms-btn ms-btn--glass" href={SUPPORT_URL}>
            Abrir chamado
          </a>
        </div>
        <ul className="ms-sup__list">
          {SUPPORT_ITEMS.map((item) => (
            <li key={item.title}>
              <span className="ms-sup__i">
                <Icon name={item.icon} size={22} />
              </span>
              <span>
                <strong>{item.title}</strong>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="ms-sup__visual" delay={150}>
        <ChatMockups />
      </Reveal>
    </div>
  </section>
)
