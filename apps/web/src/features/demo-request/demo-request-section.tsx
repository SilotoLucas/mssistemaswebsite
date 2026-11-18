import { DemoRequestForm } from './demo-request-form'

export const DemoRequestSection = () => (
  <section className="ms-section ms-section--mist" id="demonstracao">
    <div className="ms-wrap ms-final">
      <div className="ms-final__copy">
        <h2 className="ms-h2">Veja como a MS pode simplificar a sua gestão</h2>
        <p>
          Conte um pouco sobre a sua empresa. Um consultor entra em contato para combinar a
          demonstração.
        </p>
      </div>
      <DemoRequestForm />
    </div>
  </section>
)
