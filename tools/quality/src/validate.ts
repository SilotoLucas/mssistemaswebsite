import { mkdir } from 'node:fs/promises'

type Phase = {
  readonly name: string
  readonly command: readonly string[]
  readonly quick: boolean
  readonly barrier?: boolean
}

type PhaseResult = { readonly name: string; readonly exitCode: number; readonly ms: number }

const bunx = (...args: readonly string[]): readonly string[] => [
  process.execPath,
  'x',
  '--no-install',
  ...args,
]
const bun = (...args: readonly string[]): readonly string[] => [process.execPath, ...args]

const HYGIENE: readonly Phase[] = [
  { name: 'nomes de arquivo', command: bunx('ls-lint'), quick: true },
  {
    name: 'regras do projeto',
    command: bun('run', 'tools/quality/src/project-gates.ts'),
    quick: true,
  },
]
const TYPES: Phase = { name: 'tipos', command: bunx('tsc', '--noEmit'), quick: true, barrier: true }
const AFTER_TYPES: readonly Phase[] = [
  { name: 'estilo', command: bunx('biome', 'check', '.'), quick: true },
  {
    name: 'arquitetura',
    command: bun('run', 'tools/quality/src/architecture-gate.ts'),
    quick: true,
  },
  { name: 'testes', command: bun('test'), quick: false },
  { name: 'código morto', command: bunx('knip', '--no-progress'), quick: false },
  { name: 'duplicação', command: bunx('jscpd', '--config', '.jscpd.json'), quick: false },
  { name: 'build', command: bun('run', 'build'), quick: false },
]

const BROKEN_TOOL = 2

const runPhase = async (phase: Phase): Promise<PhaseResult & { readonly output: string }> => {
  const startedAt = performance.now()
  try {
    const child = Bun.spawn([...phase.command], { stdout: 'pipe', stderr: 'pipe' })
    const [stdout, stderr, exitCode] = await Promise.all([
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
      child.exited,
    ])
    return {
      name: phase.name,
      exitCode,
      ms: Math.round(performance.now() - startedAt),
      output: `${stdout}${stderr}`,
    }
  } catch (cause) {
    return { name: phase.name, exitCode: BROKEN_TOOL, ms: 0, output: String(cause) }
  }
}

const runAll = async (phases: readonly Phase[]) => Promise.all(phases.map(runPhase))

const quickOnly = process.argv.includes('--quick')
const select = (phases: readonly Phase[]) => phases.filter((phase) => !quickOnly || phase.quick)

const first = await runAll([...select(HYGIENE), TYPES])
const typesFailed = first.some((result) => result.name === TYPES.name && result.exitCode !== 0)
const results = typesFailed ? first : [...first, ...(await runAll(select(AFTER_TYPES)))]
const failed = results.filter((result) => result.exitCode !== 0)

await mkdir('.reports', { recursive: true })
await Bun.write(
  '.reports/validate.json',
  JSON.stringify(
    results.map(({ name, exitCode, ms }) => ({ name, exitCode, ms })),
    null,
    2,
  ),
)

for (const result of failed) console.log(`\n[${result.name}]\n${result.output.trim()}`)
for (const result of results)
  console.log(`${result.exitCode === 0 ? 'ok   ' : 'FALHA'} ${result.name} (${result.ms} ms)`)
if (typesFailed) console.log('Tipos reprovados: as demais fases não rodaram.')

process.exit(failed.length > 0 ? 1 : 0)
