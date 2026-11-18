import './chat-mockup.css'
import { Icon } from './icon'

export const ChatMockup = () => (
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
)
