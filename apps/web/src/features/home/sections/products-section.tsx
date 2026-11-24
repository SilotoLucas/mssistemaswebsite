import { PRODUCTS, PRODUCTS_HREF, type Product, productHref } from '../../../shared/config/products'
import { SMALL_BUSINESS_MODULES, SMALL_BUSINESS_PERKS } from '../../../shared/config/small-business'
import { Aurora } from '../../../shared/ui/aurora'
import { Icon } from '../../../shared/ui/icon'
import { Reveal } from '../../../shared/ui/reveal'
import { SiteLink } from '../../../shared/ui/site-link'
import { trackPointer } from '../../../shared/ui/spotlight'
import { ProductThumb } from '../../products'

const DashboardArt = () => (
  <svg className="ms-pb__chart" viewBox="0 0 280 120" aria-hidden="true" focusable="false">
    <g className="ms-pb__bars">
      <rect x="14" y="70" width="26" height="40" rx="6" />
      <rect x="58" y="50" width="26" height="60" rx="6" />
      <rect x="102" y="62" width="26" height="48" rx="6" />
      <rect x="146" y="34" width="26" height="76" rx="6" />
      <rect x="190" y="46" width="26" height="64" rx="6" />
      <rect x="234" y="18" width="26" height="92" rx="6" />
    </g>
    <polyline className="ms-pb__line" points="27,60 71,38 115,50 159,22 203,34 247,8" />
  </svg>
)

const Link = ({
  product,
  lead = false,
}: {
  readonly product: Product
  readonly lead?: boolean
}) => (
  <span className={lead ? 'ms-btn ms-btn--primary ms-pb__go' : 'ms-pb__go'}>
    Conhecer o {product.name}
    <Icon name="arrow-right" size={18} />
  </span>
)

const SmallBusinessCard = ({ product }: { readonly product: Product }) => (
  <SiteLink
    className="ms-pb__card ms-pb__card--lead ms-spot ms-spot--dark"
    href={productHref(product.slug)}
    onPointerMove={trackPointer}
  >
    <span className="ms-pb__top">
      <span className="ms-pb__tag">{product.audience}</span>
      <ProductThumb slug={product.slug} className="ms-pb__art" />
    </span>
    <h3 className="ms-pb__t">{product.headline}</h3>
    <p className="ms-pb__p">{product.pitch}</p>
    <ul className="ms-pb__mods">
      {SMALL_BUSINESS_MODULES.map((item) => (
        <li key={item.label}>
          <span className="ms-pb__ico">
            <Icon name={item.icon} size={16} />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
    <ul className="ms-pb__perks">
      {SMALL_BUSINESS_PERKS.map((item) => (
        <li key={item.label}>
          <Icon name={item.icon} size={16} />
          {item.label}
        </li>
      ))}
    </ul>
    <Link product={product} lead />
  </SiteLink>
)

const CompactCard = ({ product }: { readonly product: Product }) => (
  <SiteLink
    className="ms-pb__card ms-spot ms-spot--dark"
    href={productHref(product.slug)}
    onPointerMove={trackPointer}
  >
    <span className="ms-pb__top">
      <span className="ms-pb__tag">{product.audience}</span>
      {product.slug === 'dashboard' ? (
        <DashboardArt />
      ) : (
        <ProductThumb slug={product.slug} className="ms-pb__art" />
      )}
    </span>
    <h3 className="ms-pb__t">{product.headline}</h3>
    <p className="ms-pb__p">{product.pitch}</p>
    <Link product={product} />
  </SiteLink>
)

export const ProductsSection = () => (
  <section className="ms-pb ms-dark" id="produtos">
    <Aurora />
    <div className="ms-wrap">
      <Reveal className="ms-pb__head">
        <p className="ms-eyebrow">Produtos MS</p>
        <h2>
          Cada produto resolve <span className="ms-grad">uma parte do seu negócio</span>
        </h2>
        <p className="ms-pb__lead">
          Escolha por onde começar: o sistema compacto na nuvem, o app dos seus associados ou os
          números da empresa em um só painel.
        </p>
      </Reveal>
      <ul className="ms-pb__grid">
        {PRODUCTS.map((product, index) => (
          <li className={`ms-pb__cell ms-pb__cell--${product.slug}`} key={product.slug}>
            <Reveal className="ms-pb__rv" delay={index * 90}>
              {product.slug === 'smallbusiness' ? (
                <SmallBusinessCard product={product} />
              ) : (
                <CompactCard product={product} />
              )}
            </Reveal>
          </li>
        ))}
      </ul>
      <div className="ms-pb__all">
        <SiteLink className="ms-btn ms-btn--glass" href={PRODUCTS_HREF}>
          Ver todos os produtos
        </SiteLink>
      </div>
    </div>
  </section>
)
