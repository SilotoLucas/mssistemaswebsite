import { formatViolation } from './violation'

type CruiseViolation = {
  readonly from: string
  readonly to: string
  readonly rule: { readonly name: string }
}

type CruiseReport = {
  readonly summary: {
    readonly totalCruised: number
    readonly violations: readonly CruiseViolation[]
  }
}

const child = Bun.spawn(
  [
    process.execPath,
    'x',
    '--no-install',
    'depcruise',
    'apps/web/src',
    'packages',
    'tools/quality/src',
    '--config',
    '.dependency-cruiser.cjs',
    '--output-type',
    'json',
  ],
  { stdout: 'pipe', stderr: 'pipe' },
)
const [stdout, stderr] = await Promise.all([
  new Response(child.stdout).text(),
  new Response(child.stderr).text(),
  child.exited,
])

const parseReport = (): CruiseReport | null => {
  try {
    return JSON.parse(stdout) as CruiseReport
  } catch {
    return null
  }
}

const report = parseReport()

if (!report || report.summary.totalCruised === 0) {
  console.error(`architecture-gate: nenhum módulo analisado. ${stderr}`)
  process.exit(2)
}

for (const violation of report.summary.violations) {
  console.log(
    formatViolation({
      path: violation.from,
      line: 1,
      column: 1,
      tool: 'dependency-cruiser',
      rule: violation.rule.name,
      fact: `importa ${violation.to}.`,
      fix: 'mova a dependência para a camada permitida em docs/arquitetura.md.',
    }),
  )
}

process.exit(report.summary.violations.length > 0 ? 1 : 0)
