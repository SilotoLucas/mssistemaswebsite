import { CountUp } from '../../../shared/ui/count-up'
import { Reveal } from '../../../shared/ui/reveal'

type ProofItem = {
  readonly label: string
  readonly target: number | null
  readonly prefix: string
}

const PROOF_ITEMS: readonly ProofItem[] = [
  { label: 'atuação no setor', target: null, prefix: '' },
  { label: 'estados atendidos', target: 18, prefix: '' },
  { label: 'cidades', target: 300, prefix: '+' },
  { label: 'soluções integradas', target: 24, prefix: '' },
]

export const ProofSection = () => (
  <section className="ms-proof ms-dark" aria-label="A MS em números">
    <div className="ms-wrap">
      <Reveal>
        <ul className="ms-proof__panel ms-glass">
          {PROOF_ITEMS.map((item) => (
            <li key={item.label}>
              <strong>
                {item.target === null ? (
                  'Desde 2005'
                ) : (
                  <CountUp target={item.target} prefix={item.prefix} />
                )}
              </strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
)
