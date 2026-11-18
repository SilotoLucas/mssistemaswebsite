import { describe, expect, test } from 'bun:test'
import { findComments } from './find-comments'
import { findHardcodedColors } from './find-hardcoded-colors'
import { renderTokens } from './render-tokens'
import { formatViolation } from './violation'

const fixture = (name: string): Promise<string> =>
  Bun.file(new URL(`../fixtures/${name}`, import.meta.url)).text()

describe('no-comment', () => {
  test('encontra exatamente os comentários do fixture', async () => {
    const found = findComments('fixture.ts', await fixture('comment-violation.ts'))
    expect(found.map(({ line, column }) => [line, column])).toEqual([
      [1, 1],
      [2, 17],
    ])
  })

  test('não confunde endereço em texto com comentário', () => {
    expect(findComments('site.ts', "export const url = 'https://mssistemas.com.br'\n")).toEqual([])
  })
})

describe('no-hardcoded-color', () => {
  test('encontra exatamente as cores do fixture', async () => {
    const found = findHardcodedColors('fixture.css', await fixture('color-violation.css'))
    expect(found.map(({ line, column }) => [line, column])).toEqual([
      [2, 10],
      [3, 15],
    ])
  })

  test('aceita variável de token e âncora', () => {
    expect(findHardcodedColors('a.css', '.a { color: var(--navy); }')).toEqual([])
    expect(findHardcodedColors('a.tsx', '<a href="#demonstracao" />')).toEqual([])
  })
})

describe('renderTokens', () => {
  test('resolve apelidos de cor', () => {
    const empty = { tokens: [] }
    const css = renderTokens({
      color: {
        tokens: [
          { name: 'brand', value: '#112233' },
          { name: 'focus', value: '{brand}' },
        ],
      },
      type: { families: {} },
      spacing: empty,
      radius: empty,
      shadow: empty,
      fontSize: empty,
      layout: empty,
      timing: empty,
    })
    expect(css).toContain('--focus: #112233;')
  })
})

describe('formatViolation', () => {
  test('usa o formato único do gate', () => {
    expect(
      formatViolation({
        path: 'a.ts',
        line: 2,
        column: 3,
        tool: 'gate',
        rule: 'regra',
        fact: 'fato.',
        fix: 'ação.',
      }),
    ).toBe('a.ts:2:3: error gate(regra): fato. fix: ação.')
  })
})
