import { HAS_WHATSAPP, SUPPORT_URL, WHATSAPP_LABEL } from '../../../shared/config/site-config'
import { Aurora } from '../../../shared/ui/aurora'
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
        {HAS_WHATSAPP ? (
          <div className="ms-wanum">
            <span>WhatsApp da MS</span>
            <strong>{WHATSAPP_LABEL}</strong>
          </div>
        ) : null}
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
        <div className="ms-chat" aria-hidden="true">
          <div className="ms-chat__top">
            <span className="ms-chat__av">
              <Icon name="headset" size={20} />
            </span>
            <span className="ms-chat__who">
              <strong>MS Sistemas</strong>
              <small>
                <span className="ms-pulse" /> online
              </small>
            </span>
          </div>
          <div className="ms-chat__body">
            <p className="ms-chat__b ms-chat__b--in">Olá! Preciso da segunda via de um boleto.</p>
            <p className="ms-chat__b ms-chat__b--out">Claro! Vou te ajudar com isso.</p>
            <p className="ms-chat__b ms-chat__b--out ms-chat__typing">
              <span />
              <span />
              <span />
            </p>
          </div>
          <div className="ms-chat__bar">
            <span>Digite uma mensagem</span>
            <i>
              <Icon name="send" size={18} />
            </i>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)
