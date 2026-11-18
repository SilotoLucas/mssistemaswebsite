import { Icon, type IconName } from '../../../shared/ui/icon'
import { TextLink } from '../../../shared/ui/text-link'

type Segment = {
  readonly icon: IconName
  readonly title: string
  readonly text: string
  readonly href: string
}

const SEGMENTS: readonly Segment[] = [
  {
    icon: 'shield',
    title: 'Planos Funerários',
    text: 'Contratos, cobrança, carteirinhas, convênios e comissões em um só lugar.',
    href: '/solucoes#planos-funerarios',
  },
  {
    icon: 'clipboard',
    title: 'Funerárias',
    text: 'Documentação do óbito, ordens de serviço, nota fiscal e estoque.',
    href: '/solucoes#funerarias',
  },
  {
    icon: 'pin',
    title: 'Cemitérios',
    text: 'Jazigos, sepultamentos, exumações, contratos e cobranças.',
    href: '/solucoes#cemiterios',
  },
  {
    icon: 'calendar',
    title: 'Crematórios',
    text: 'Cremações, agendamento de salas, documentação e vendas.',
    href: '/solucoes#crematorios',
  },
]

export const SegmentsSection = () => (
  <section className="ms-section" id="solucoes">
    <div className="ms-wrap">
      <div className="ms-intro">
        <h2 className="ms-h2">Feito para a sua operação</h2>
      </div>
      <div className="ms-segs">
        {SEGMENTS.map((segment) => (
          <article className="ms-seg" key={segment.title}>
            <Icon name={segment.icon} size={32} />
            <h3 className="ms-h3">{segment.title}</h3>
            <p>{segment.text}</p>
            <TextLink
              label="Saiba mais"
              href={segment.href}
              hiddenContext={`sobre ${segment.title}`}
            />
          </article>
        ))}
      </div>
    </div>
  </section>
)
