import { describe, expect, test } from 'bun:test'
import { renderWithRouter } from '../../../test/render-with-router'
import { MODULE_GROUPS } from '../home-content'
import { EcosystemSection } from './ecosystem-section'

describe('EcosystemSection', () => {
  test('cada grupo é um botão que leva ao grupo na tela de soluções', () => {
    renderWithRouter(<EcosystemSection />)
    for (const group of MODULE_GROUPS) {
      const link = document.querySelector(`a.ms-eco__open[href="/solucoes#${group.slug}"]`)
      expect(link?.textContent).toContain(group.title)
    }
  })

  test('cada módulo é um botão que leva ao módulo na tela de soluções', () => {
    renderWithRouter(<EcosystemSection />)
    const modules = MODULE_GROUPS.flatMap((group) => group.modules)
    for (const module of modules) {
      const link = document.querySelector(`a.ms-eco__chip[href="/solucoes#${module.slug}"]`)
      expect(link?.textContent).toBe(module.label)
    }
  })
})
