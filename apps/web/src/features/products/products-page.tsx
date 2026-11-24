import { PRODUCTS, productHref } from '../../shared/config/products'
import { DEMO_HREF } from '../../shared/config/site-config'
import { Aurora } from '../../shared/ui/aurora'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { Reveal } from '../../shared/ui/reveal'
import { SiteLink } from '../../shared/ui/site-link'
import { WhatsappButton } from '../../shared/ui/whatsapp-button'
import { ProductVisual } from './product-visual'

const HeroList = () => (
  <ul className="ms-pd-list ms-glass">
    {PRODUCTS.map((product) => (
      <li key={product.slug}>
        <SiteLink href={productHref(product.slug)}>
          <strong>{product.name}</strong>
          <span>{product.pitch}</span>
          <Icon name="arrow-right" size={18} />
        </SiteLink>
      </li>
    ))}
  </ul>
)

export const ProductsPage = () => (
  <main>
    <title>Produtos | MS Sistemas</title>
    <meta
      name="description"
      content="Produtos da MS Sistemas: SmallBusiness, o sistema compacto na nuvem; MS App, o aplicativo para os associados; e MS Dashboard, os indicadores da empresa."
    />
    <PageHero
      crumb="Produtos"
      title="Produtos MS para cada momento da sua empresa"
      lead="Do sistema compacto para começar rápido ao app que a sua empresa oferece aos associados e aos indicadores para decidir. Conheça cada um em detalhes."
      aside={<HeroList />}
    />
    {PRODUCTS.map((product, index) => (
      <section
        className={`ms-section${index % 2 === 0 ? '' : ' ms-section--mist'}`}
        id={product.slug}
        key={product.slug}
      >
        <div className={`ms-wrap ms-pd-row${index % 2 === 0 ? '' : ' ms-pd-row--flip'}`}>
          <Reveal className="ms-pd-row__v">
            <div className="ms-pd-stage">
              <ProductVisual slug={product.slug} decorative />
            </div>
          </Reveal>
          <Reveal className="ms-pd-row__c" delay={120}>
            <p className="ms-eyebrow ms-eyebrow--light">{product.name}</p>
            <h2 className="ms-h2">{product.headline}</h2>
            <p>{product.lead}</p>
            <ul className="ms-pd-bullets">
              {product.bullets.map((bullet) => (
                <li key={bullet}>
                  <span>
                    <Icon name="check" size={14} />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="ms-pd-row__cta">
              <SiteLink className="ms-btn ms-btn--primary" href={productHref(product.slug)}>
                Conhecer o {product.name}
                <Icon name="arrow-right" size={18} />
              </SiteLink>
            </div>
          </Reveal>
        </div>
      </section>
    ))}
    <section className="ms-section ms-dark ms-pd-final" id="fechamento">
      <Aurora />
      <div className="ms-wrap ms-pd-final__in">
        <Reveal className="ms-pd-final__c">
          <h2 className="ms-h2">
            Não sabe qual produto <span className="ms-grad">combina com a sua empresa?</span>
          </h2>
          <p>Conte como é a sua operação, e um consultor da MS indica o melhor caminho.</p>
          <div className="ms-pd-final__cta">
            <SiteLink className="ms-btn ms-btn--primary ms-btn--lg" href={DEMO_HREF}>
              Solicitar demonstração
            </SiteLink>
            <WhatsappButton large />
          </div>
        </Reveal>
      </div>
    </section>
  </main>
)
