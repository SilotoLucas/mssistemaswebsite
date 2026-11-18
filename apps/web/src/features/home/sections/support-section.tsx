import { SUPPORT_URL, WHATSAPP_LABEL } from '../../../shared/config/site-config'
import { WhatsappButton } from '../../../shared/ui/whatsapp-button'
import { type IconDetail, IconDetailList } from './icon-detail-list'

const SUPPORT_ITEMS: readonly IconDetail[] = [
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
  <section className="ms-section ms-section--dark ms-dark" id="atendimento">
    <div className="ms-wrap ms-sup">
      <div className="ms-sup__copy">
        <h2 className="ms-h2">Precisou da MS? Chame no WhatsApp</h2>
        <p>
          O setor não para, e o nosso atendimento também não. Fale pelo WhatsApp com uma equipe
          especializada e resolva com rapidez.
        </p>
        <div className="ms-wanum">
          <span>WhatsApp da MS</span>
          <strong>{WHATSAPP_LABEL}</strong>
        </div>
        <div className="ms-sup__cta">
          <WhatsappButton />
          <a className="ms-btn ms-btn--on-dark" href={SUPPORT_URL}>
            Abrir chamado
          </a>
        </div>
      </div>
      <IconDetailList
        items={SUPPORT_ITEMS}
        listClassName="ms-sup__list"
        itemClassName="ms-sup__i"
      />
    </div>
  </section>
)
