import { type IconDetail, IconDetailList } from './icon-detail-list'

const BENEFITS: readonly IconDetail[] = [
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
  <section className="ms-section ms-section--mist">
    <div className="ms-wrap">
      <div className="ms-intro">
        <h2 className="ms-h2">Menos tarefas repetidas, mais controle</h2>
      </div>
      <IconDetailList items={BENEFITS} listClassName="ms-bens" itemClassName="ms-ben" />
    </div>
  </section>
)
