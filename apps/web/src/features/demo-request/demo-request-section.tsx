import { Icon } from '../../shared/ui/icon'
import { Reveal } from '../../shared/ui/reveal'
import { DemoRequestForm } from './demo-request-form'
import './demo-request.css'

const POINTS = [
  'Um consultor entra em contato com você',
  'Conheça os módulos que fazem sentido para a sua empresa',
  'Atendimento de quem conhece o setor desde 2005',
] as const

export const DemoRequestSection = () => (
  <section className="ms-section ms-demo" id="demonstracao">
    <div className="ms-wrap ms-final">
      <Reveal className="ms-final__copy">
        <p className="ms-eyebrow ms-eyebrow--light">Demonstração</p>
        <h2 className="ms-h2">
          Veja como a MS pode{' '}
          <span className="ms-grad ms-grad--deep">simplificar a sua gestão</span>
        </h2>
        <p>
          Conte um pouco sobre a sua empresa. Um consultor entra em contato para combinar a
          demonstração.
        </p>
        <ul className="ms-final__points">
          {POINTS.map((point) => (
            <li key={point}>
              <span>
                <Icon name="check" size={14} />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={120}>
        <DemoRequestForm />
      </Reveal>
    </div>
  </section>
)
