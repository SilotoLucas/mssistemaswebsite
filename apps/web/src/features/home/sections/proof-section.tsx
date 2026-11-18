const PROOF_ITEMS = [
  { value: 'Desde 2005', label: 'atuação no setor' },
  { value: '18', label: 'estados atendidos' },
  { value: '+300', label: 'cidades' },
  { value: '24', label: 'soluções integradas' },
] as const

export const ProofSection = () => (
  <section className="ms-proof" aria-label="A MS em números">
    <div className="ms-wrap">
      <ul>
        {PROOF_ITEMS.map((item) => (
          <li key={item.label}>
            <strong>{item.value}</strong>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  </section>
)
