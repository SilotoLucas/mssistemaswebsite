import './chat-mockup.css'
import { Icon } from './icon'

type ChatMessage = { readonly from: 'client' | 'consultant'; readonly text: string }

type Conversation = {
  readonly key: string
  readonly messages: readonly ChatMessage[]
  readonly typing: boolean
}

const CONVERSATIONS: readonly Conversation[] = [
  {
    key: 'obito',
    typing: true,
    messages: [
      { from: 'client', text: 'Olá! Me ajuda, estou com uma dúvida ao registrar um óbito?' },
      { from: 'consultant', text: 'Olá! Claro, ajudo sim. Qual é a sua dúvida?' },
    ],
  },
  {
    key: 'relatorio',
    typing: false,
    messages: [
      {
        from: 'client',
        text: 'Preciso de um relatório com os associados em atraso, separados por cidade e plano.',
      },
      {
        from: 'consultant',
        text: 'Vamos marcar uma conversa para eu entender melhor e desenvolver esse relatório?',
      },
      { from: 'client', text: 'Pode ser amanhã de manhã.' },
      { from: 'consultant', text: 'Agendado! Falamos amanhã.' },
    ],
  },
]

const ChatMockup = ({ conversation }: { readonly conversation: Conversation }) => (
  <div className="ms-chat">
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
      {conversation.messages.map((message) => (
        <p
          className={`ms-chat__b ms-chat__b--${message.from === 'client' ? 'in' : 'out'}`}
          key={message.text}
        >
          {message.text}
        </p>
      ))}
      {conversation.typing ? (
        <p className="ms-chat__b ms-chat__b--out ms-chat__typing">
          <span />
          <span />
          <span />
        </p>
      ) : null}
    </div>
    <div className="ms-chat__bar">
      <span>Digite uma mensagem</span>
      <i>
        <Icon name="send" size={18} />
      </i>
    </div>
  </div>
)

export const ChatMockups = () => (
  <div className="ms-chats" aria-hidden="true">
    {CONVERSATIONS.map((conversation) => (
      <ChatMockup conversation={conversation} key={conversation.key} />
    ))}
  </div>
)
