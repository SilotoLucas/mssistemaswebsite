import { COMPANY_EMAIL } from '../../shared/config/company-info'
import { PageHero } from '../../shared/ui/page-hero'
import { SiteLink } from '../../shared/ui/site-link'
import { POLICY_SECTIONS, POLICY_UPDATED_AT } from './privacy-content'
import './privacy.css'

export const PrivacyPage = () => (
  <main>
    <title>Política de Privacidade | MS Sistemas</title>
    <meta
      name="description"
      content="Saiba quais dados a MS Sistemas coleta, para que usa e como você exerce os seus direitos."
    />
    <PageHero
      crumb="Política de Privacidade"
      title="Política de Privacidade"
      lead={`Explicamos de forma simples como tratamos os seus dados. Atualizada em ${POLICY_UPDATED_AT}.`}
      showActions={false}
    />
    <section className="ms-section ms-section--mist" id="politica">
      <div className="ms-wrap ms-pv">
        <nav className="ms-pv__toc" aria-label="Neste documento">
          <p>Neste documento</p>
          <ol>
            {POLICY_SECTIONS.map((section) => (
              <li key={section.id}>
                <SiteLink href={`#${section.id}`}>{section.title}</SiteLink>
              </li>
            ))}
          </ol>
        </nav>
        <div className="ms-pv__body">
          {POLICY_SECTIONS.map((section) => (
            <section className="ms-pv__sec" id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          <p className="ms-pv__contact">
            Dúvidas ou pedidos sobre seus dados:{' '}
            <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
          </p>
        </div>
      </div>
    </section>
  </main>
)
