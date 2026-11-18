type StateTile = {
  readonly code: string
  readonly name: string
  readonly column: number
  readonly row: number
  readonly served: boolean
}

const STATE_TILES: readonly StateTile[] = [
  { code: 'RR', name: 'Roraima', column: 3, row: 1, served: false },
  { code: 'AP', name: 'Amapá', column: 4, row: 1, served: false },
  { code: 'AM', name: 'Amazonas', column: 3, row: 2, served: true },
  { code: 'PA', name: 'Pará', column: 4, row: 2, served: true },
  { code: 'MA', name: 'Maranhão', column: 5, row: 2, served: false },
  { code: 'CE', name: 'Ceará', column: 6, row: 2, served: false },
  { code: 'RN', name: 'Rio Grande do Norte', column: 7, row: 2, served: true },
  { code: 'AC', name: 'Acre', column: 1, row: 3, served: false },
  { code: 'RO', name: 'Rondônia', column: 2, row: 3, served: true },
  { code: 'MT', name: 'Mato Grosso', column: 3, row: 3, served: false },
  { code: 'TO', name: 'Tocantins', column: 4, row: 3, served: false },
  { code: 'PI', name: 'Piauí', column: 5, row: 3, served: true },
  { code: 'PB', name: 'Paraíba', column: 6, row: 3, served: true },
  { code: 'GO', name: 'Goiás', column: 3, row: 4, served: true },
  { code: 'DF', name: 'Distrito Federal', column: 4, row: 4, served: false },
  { code: 'BA', name: 'Bahia', column: 5, row: 4, served: true },
  { code: 'PE', name: 'Pernambuco', column: 6, row: 4, served: true },
  { code: 'AL', name: 'Alagoas', column: 7, row: 4, served: true },
  { code: 'MS', name: 'Mato Grosso do Sul', column: 3, row: 5, served: true },
  { code: 'MG', name: 'Minas Gerais', column: 4, row: 5, served: true },
  { code: 'ES', name: 'Espírito Santo', column: 5, row: 5, served: true },
  { code: 'SE', name: 'Sergipe', column: 6, row: 5, served: true },
  { code: 'PR', name: 'Paraná', column: 3, row: 6, served: true },
  { code: 'SP', name: 'São Paulo', column: 4, row: 6, served: true },
  { code: 'RJ', name: 'Rio de Janeiro', column: 5, row: 6, served: true },
  { code: 'SC', name: 'Santa Catarina', column: 3, row: 7, served: false },
  { code: 'RS', name: 'Rio Grande do Sul', column: 3, row: 8, served: true },
]

export const PresenceSection = () => (
  <section className="ms-section" id="clientes">
    <div className="ms-wrap ms-pres">
      <div className="ms-pres__copy">
        <h2 className="ms-h2">Empresas de todo o Brasil confiam na MS</h2>
        <p>Clientes em 18 estados, do Rio Grande do Sul ao Amazonas.</p>
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
      </div>
      <ul className="ms-map" aria-label="Mapa do Brasil por estados. 18 estados atendidos.">
        {STATE_TILES.map((tile) => (
          <li
            className={tile.served ? 'is-on' : undefined}
            style={{ gridColumn: tile.column, gridRow: tile.row }}
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
    </div>
  </section>
)
