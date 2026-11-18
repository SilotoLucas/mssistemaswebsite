export type Violation = {
  readonly path: string
  readonly line: number
  readonly column: number
  readonly tool: string
  readonly rule: string
  readonly fact: string
  readonly fix: string
}

export const formatViolation = (violation: Violation): string =>
  `${violation.path}:${violation.line}:${violation.column}: error ${violation.tool}(${violation.rule}): ${violation.fact} fix: ${violation.fix}`
