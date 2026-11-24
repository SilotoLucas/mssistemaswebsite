import { PRODUCTS, type Product, productHref } from '../../shared/config/products'
import { DEMO_HREF, DIGITAL_SOLUTIONS } from '../../shared/config/site-config'
import { Icon } from '../../shared/ui/icon'
import { PageHero } from '../../shared/ui/page-hero'
import { Reveal } from '../../shared/ui/reveal'
import { SiteLink } from '../../shared/ui/site-link'
import { WhatsappButton } from '../../shared/ui/whatsapp-button'
import { ProductThumb } from './product-thumb'
import { ProductVisual } from './product-visual'
import { ProductsStage } from './products-stage'

const Overview = () => (
  <section className="ms-pd-over" id="escolha">
    <div className="ms-wrap">
      <ul className="ms-pd-over__list">
        {PRODUCTS.map((product, index) => (
          <li key={product.slug}>
            <Reveal delay={index * 90}>
              <a className="ms-pd-over__card" href={`#${product.slug}`}>
                <ProductThumb slug={product.slug} className="ms-pd-over__v" />
                <span className="ms-pd-over__a">{product.audience}</span>
                <strong className="ms-pd-over__t">{product.name}</strong>
                <span className="ms-pd-over__p">{product.pitch}</span>
                <span className="ms-pd-over__go">
                  Ver em detalhes
                  <Icon name="chevron-down" size={18} />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

const bandTone = (index: number): string => {
  if (index === PRODUCTS.length - 1) return 'ms-dark ms-pd-show'
  return index % 2 === 0 ? '' : 'ms-section--mist'
}

const Band = ({ product, index }: { readonly product: Product; readonly index: number }) => (
  <section className={`ms-section ${bandTone(index)}`} id={product.slug}>
    <div className={`ms-wrap ms-pd-row${index % 2 === 0 ? '' : ' ms-pd-row--flip'}`}>
      <Reveal className="ms-pd-row__v">
        <div className="ms-pd-stage">
          <ProductVisual slug={product.slug} decorative />
        </div>
      </Reveal>
      <Reveal className="ms-pd-row__c" delay={120}>
        <p className={`ms-eyebrow${index === PRODUCTS.length - 1 ? '' : ' ms-eyebrow--light'}`}>
          {product.name}
        </p>
        <h2 className="ms-h2">{product.headline}</h2>
        <p>{product.lead}</p>
        <ul className="ms-pd-tags">
          <li>
            <Icon name="user" size={16} />
            {product.audience}
          </li>
          <li>
            <Icon name="globe" size={16} />
            {product.access}
          </li>
        </ul>
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
)

export const ProductsPage = () => (
  <main>
    <title>{`${DIGITAL_SOLUTIONS.label} | MS Sistemas`}</title>
    <meta
      name="description"
      content="Soluções digitais da MS Sistemas: SmallBusiness, o sistema compacto na nuvem; MS App, o aplicativo para os associados; e MS Dashboard, os indicadores da empresa."
    />
    <PageHero
      crumb={DIGITAL_SOLUTIONS.label}
      title="Soluções digitais da MS para cada momento da sua empresa"
      lead="Do sistema compacto para começar rápido ao app que a sua empresa oferece aos associados e aos indicadores para decidir. Conheça cada um em detalhes."
      aside={<ProductsStage />}
    />
    <Overview />
    {PRODUCTS.map((product, index) => (
      <Band product={product} index={index} key={product.slug} />
    ))}
    <section className="ms-section ms-section--mist ms-pd-final-light" id="fechamento">
      <div className="ms-wrap ms-pd-final__in">
        <Reveal className="ms-pd-final__c">
          <h2 className="ms-h2">
            Não sabe qual solução{' '}
            <span className="ms-grad ms-grad--deep">combina com a sua empresa?</span>
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
