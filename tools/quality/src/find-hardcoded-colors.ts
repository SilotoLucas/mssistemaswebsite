import type { Violation } from './violation'

const COLOR_PATTERN = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\(/g

export const findHardcodedColors = (path: string, source: string): Violation[] =>
  source.split('\n').flatMap((text, index) =>
    [...text.matchAll(COLOR_PATTERN)].map((match) => ({
      path,
      line: index + 1,
      column: match.index + 1,
      tool: 'project-gates',
      rule: 'no-hardcoded-color',
      fact: `cor escrita à mão: ${match[0]}.`,
      fix: 'use uma variável gerada de packages/design-tokens/tokens.json.',
    })),
  )
