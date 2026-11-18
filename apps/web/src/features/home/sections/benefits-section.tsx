import { Icon, type IconName } from '../../../shared/ui/icon'
import { Reveal } from '../../../shared/ui/reveal'
import { trackPointer } from '../../../shared/ui/spotlight'

type Benefit = {
  readonly icon: IconName
  readonly title: string
  readonly text: string
}

const BENEFITS: readonly Benefit[] = [
  { icon: 'layers', title: 'Menos retrabalho', text: 'Informações integradas entre as áreas.' },
  {
    icon: 'receipt',
    title: 'Cobrança sob controle',
    text: 'Baixas automáticas e análise de inadimplência.',
  },
  {
    icon: 'chart',
    title: 'Decisões com dados',
    text: 'Receitas, despesas e vendas de qualquer lugar.',
  },
]

export const BenefitsSection = () => (
  <section className="ms-section ms-ben-sec">
    <div className="ms-wrap">
      <Reveal className="ms-intro ms-intro--center">
        <p className="ms-eyebrow ms-eyebrow--light">Resultados</p>
        <h2 className="ms-h2">
          Menos tarefas repetidas, <span className="ms-grad ms-grad--deep">mais controle</span>
        </h2>
      </Reveal>
      <div className="ms-bens">
        {BENEFITS.map((benefit, index) => (
          <Reveal delay={index * 100} key={benefit.title}>
            <article className="ms-ben ms-spot" onPointerMove={trackPointer}>
              <span className="ms-ben__n" aria-hidden="true">
                0{index + 1}
              </span>
              <span className="ms-ben__i">
                <Icon name={benefit.icon} size={26} />
              </span>
              <h3 className="ms-h3">{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)
