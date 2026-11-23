import type { CSSProperties } from 'react'
import {
  MAP_COLUMNS,
  MAP_ROWS,
  SERVED_STATE_COUNT,
  STATE_TILES,
} from '../../../shared/config/brazil-states'
import { Aurora } from '../../../shared/ui/aurora'
import { CountUp } from '../../../shared/ui/count-up'
import { Reveal } from '../../../shared/ui/reveal'

export const PresenceSection = () => (
  <section className="ms-section ms-pres-sec ms-dark" id="clientes">
    <Aurora />
    <div className="ms-wrap ms-pres">
      <Reveal className="ms-pres__copy">
        <p className="ms-eyebrow">Presença nacional</p>
        <h2>
          Empresas de todo o Brasil <span className="ms-grad">confiam na MS</span>
        </h2>
        <p className="ms-pres__lead">
          Clientes em {SERVED_STATE_COUNT} estados, do Rio Grande do Sul ao Amazonas.
        </p>
        <div className="ms-pres__stats">
          <p>
            <strong>
              <CountUp target={SERVED_STATE_COUNT} />
            </strong>
            <span>estados atendidos</span>
          </p>
          <p>
            <strong>
              <CountUp target={300} prefix="+" />
            </strong>
            <span>cidades</span>
          </p>
        </div>
        <div className="ms-legend" aria-hidden="true">
          <span>
            <i />
            Estados atendidos
          </span>
          <span>
            <i className="is-idle" />
            Demais estados
          </span>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <ul
          className="ms-map"
          aria-label={`Mapa do Brasil por estados. ${SERVED_STATE_COUNT} estados atendidos.`}
          style={{ '--map-cols': MAP_COLUMNS, '--map-rows': MAP_ROWS } as CSSProperties}
        >
          {STATE_TILES.map((tile, index) => (
            <li
              className={tile.served ? 'is-on' : undefined}
              style={
                {
                  gridColumn: tile.column,
                  gridRow: tile.row,
                  '--i': index,
                } as CSSProperties
              }
              title={tile.served ? `${tile.name}: atendido` : tile.name}
              key={tile.code}
            >
              <span aria-hidden="true">{tile.code}</span>
              <span className="ms-sr">
                {tile.name}, {tile.served ? 'atendido' : 'sem atendimento listado'}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
)
