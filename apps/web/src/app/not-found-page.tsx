import { SiteLink } from '../shared/ui/site-link'

export const NotFoundPage = () => (
  <main className="ms-section">
    <title>Página não encontrada | MS Sistemas</title>
    <div className="ms-wrap ms-intro">
      <h1 className="ms-h2">Página não encontrada</h1>
      <p>O endereço pode ter mudado. Volte para a página inicial e continue a navegação.</p>
      <SiteLink className="ms-link" href="/">
        Ir para a página inicial
      </SiteLink>
    </div>
  </main>
)
