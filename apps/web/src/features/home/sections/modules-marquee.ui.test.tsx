import { describe, expect, test } from 'bun:test'
import { screen, within } from '@testing-library/react'
import { SOLUTION_GROUPS } from '../../../shared/config/solutions-catalog'
import { renderWithRouter } from '../../../test/render-with-router'
import { MODULE_GROUPS } from '../home-content'
import { ModulesMarquee } from './modules-marquee'

const CATALOG_SLUGS = new Set(
  SOLUTION_GROUPS.flatMap((group) => group.solutions.map((solution) => solution.slug)),
)
const MODULES = MODULE_GROUPS.flatMap((group) => group.modules)

describe('faixa de módulos da Home', () => {
  test('cada módulo aponta para uma solução que existe na tela Soluções', () => {
    for (const module of MODULES) expect(CATALOG_SLUGS.has(module.slug)).toBe(true)
  })

  test('cada módulo é um link para o seu lugar na tela Soluções', () => {
    renderWithRouter(<ModulesMarquee />)
    const nav = screen.getByRole('navigation', { name: 'Módulos do sistema' })
    const links = within(nav).getAllByRole('link')
    expect(links).toHaveLength(MODULES.length)
    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      MODULES.map((module) => `/solucoes#${module.slug}`),
    )
  })

  test('a cópia que fecha o laço fica fora do teclado e do leitor de tela', () => {
    renderWithRouter(<ModulesMarquee />)
    const copies = document.querySelectorAll('.ms-marq__row[aria-hidden="true"] a')
    expect(copies).toHaveLength(MODULES.length)
    for (const link of copies) expect(link.getAttribute('tabindex')).toBe('-1')
  })
})
