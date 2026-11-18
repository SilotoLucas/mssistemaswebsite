import tokens from '@ms/design-tokens/tokens.json'
import { findComments } from './find-comments'
import { findHardcodedColors } from './find-hardcoded-colors'
import { type DesignTokens, renderTokens } from './render-tokens'
import { formatViolation, type Violation } from './violation'

const SOURCE_ROOTS = [
  'apps/web/src',
  'packages/application/src',
  'packages/domain/src',
  'tools/quality/src',
]
const TOKENS_PATH = 'apps/web/src/styles/tokens.css'
const GATE_SOURCES = /tools\/quality\/src\/find-(comments|hardcoded-colors)/

const scanFile = async (path: string): Promise<Violation[]> => {
  const source = await Bun.file(path).text()
  const comments = GATE_SOURCES.test(path) ? [] : findComments(path, source)
  const isScannedForColor =
    path !== TOKENS_PATH && !path.includes('.unit.test.') && !GATE_SOURCES.test(path)
  return [...comments, ...(isScannedForColor ? findHardcodedColors(path, source) : [])]
}

const tokensDrift = async (): Promise<Violation[]> => {
  const current = await Bun.file(TOKENS_PATH).text()
  if (current === renderTokens(tokens as DesignTokens)) return []
  return [
    {
      path: TOKENS_PATH,
      line: 1,
      column: 1,
      tool: 'project-gates',
      rule: 'tokens-in-sync',
      fact: 'tokens.css difere de tokens.json.',
      fix: 'rode bun run tokens.',
    },
  ]
}

const paths = SOURCE_ROOTS.flatMap((root) =>
  [...new Bun.Glob('**/*.{ts,tsx,css}').scanSync({ cwd: root })].map(
    (path) => `${root}/${path.replaceAll('\\', '/')}`,
  ),
).sort()
const violations = [...(await Promise.all(paths.map(scanFile))).flat(), ...(await tokensDrift())]

for (const violation of violations) console.log(formatViolation(violation))
if (paths.length === 0) {
  console.error('project-gates: nenhum arquivo encontrado.')
  process.exit(2)
}
process.exit(violations.length > 0 ? 1 : 0)
