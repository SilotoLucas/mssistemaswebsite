type TokenEntry = { readonly name: string; readonly value: string }
type ColorEntry = { readonly name: string; readonly value: string }

export type DesignTokens = {
  readonly color: { readonly tokens: readonly ColorEntry[] }
  readonly type: { readonly families: Readonly<Record<string, string>> }
  readonly spacing: { readonly tokens: readonly TokenEntry[] }
  readonly radius: { readonly tokens: readonly TokenEntry[] }
  readonly shadow: { readonly tokens: readonly TokenEntry[] }
  readonly fontSize: { readonly tokens: readonly TokenEntry[] }
  readonly layout: { readonly tokens: readonly TokenEntry[] }
  readonly timing: { readonly tokens: readonly TokenEntry[] }
}

const ALIAS_PATTERN = /^\{(.+)\}$/

const resolveColor = (value: string, colors: ReadonlyMap<string, string>): string => {
  const alias = value.match(ALIAS_PATTERN)?.[1]
  if (!alias) return value
  return resolveColor(colors.get(alias) ?? value.slice(1, -1), colors)
}

export const renderTokens = (tokens: DesignTokens): string => {
  const colors = new Map(tokens.color.tokens.map((entry) => [entry.name, entry.value]))
  const colorLines = tokens.color.tokens.map(
    (entry) => `  --${entry.name}: ${resolveColor(entry.value, colors)};`,
  )
  const scaleLines = [
    tokens.spacing,
    tokens.radius,
    tokens.shadow,
    tokens.fontSize,
    tokens.layout,
    tokens.timing,
  ].flatMap((family) => family.tokens.map((entry) => `  --${entry.name}: ${entry.value};`))
  const fontLines = Object.entries(tokens.type.families).map(
    ([name, stack]) => `  --font-${name}: ${stack};`,
  )
  return `:root {\n${[...colorLines, ...scaleLines, ...fontLines].join('\n')}\n}\n`
}
