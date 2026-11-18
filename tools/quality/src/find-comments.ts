import type { Violation } from './violation'

type ScanState = { quote: string | null; escaped: boolean; block: boolean }

const isQuote = (character: string): boolean => '\'"`'.includes(character)

const stepQuote = (state: ScanState, character: string): void => {
  if (state.escaped) state.escaped = false
  else if (character === '\\') state.escaped = true
  else if (character === state.quote) state.quote = null
}

const commentViolation = (path: string, line: number, column: number): Violation => ({
  path,
  line,
  column,
  tool: 'project-gates',
  rule: 'no-comment',
  fact: 'comentário encontrado no código.',
  fix: 'remova o comentário e deixe o nome do código explicar a intenção.',
})

const scanLine = (path: string, text: string, line: number, state: ScanState): Violation[] => {
  const found: Violation[] = []
  for (let index = 0; index < text.length; index += 1) {
    const character = text.charAt(index)
    const pair = text.slice(index, index + 2)
    if (state.block) {
      if (pair === '*/') state.block = false
    } else if (state.quote) {
      stepQuote(state, character)
    } else if (isQuote(character)) {
      state.quote = character
    } else if (pair === '/*') {
      state.block = true
      found.push(commentViolation(path, line, index + 1))
    } else if (pair === '//') {
      found.push(commentViolation(path, line, index + 1))
      break
    }
  }
  return found
}

export const findComments = (path: string, source: string): Violation[] => {
  const state: ScanState = { quote: null, escaped: false, block: false }
  return source.split('\n').flatMap((text, index) => {
    if (state.quote !== '`') state.quote = null
    return scanLine(path, text, index + 1, state)
  })
}
