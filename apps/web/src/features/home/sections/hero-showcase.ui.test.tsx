import { describe, expect, test } from 'bun:test'
import { screen, within } from '@testing-library/react'
import { renderWithRouter } from '../../../test/render-with-router'
import { HeroShowcase } from './hero-showcase'

const slides = () =>
  [...document.querySelectorAll<HTMLElement>('.ms-car__slide')].map((slide) =>
    slide.getAttribute('aria-label'),
  )

describe('vitrine da abertura da home', () => {
  test('mostra MS App, MS Dashboard e SmallBusiness, sem a Área do Cliente', () => {
    renderWithRouter(<HeroShowcase />)
    expect(slides()).toEqual(['1 de 3: MS App', '2 de 3: MS Dashboard', '3 de 3: SmallBusiness'])
  })

  test('o slide do app diz que é uma ferramenta para os associados do cliente', () => {
    renderWithRouter(<HeroShowcase />)
    const app = document.querySelectorAll<HTMLElement>('.ms-car__slide')[0] as HTMLElement
    expect(app.textContent).toContain('Um app para você oferecer aos seus associados')
    const link = within(app).getByRole('link', { name: 'Conhecer o MS App' })
    expect(link.getAttribute('href')).toBe('/produtos/app')
  })

  test('o SmallBusiness mostra a logo, os quatro módulos e leva à página do produto', () => {
    renderWithRouter(<HeroShowcase />)
    const slide = document.querySelectorAll<HTMLElement>('.ms-car__slide')[2] as HTMLElement
    const scope = within(slide)
    expect(scope.getByRole('img', { hidden: true }).getAttribute('alt')).toBe(
      'SmallBusiness, sistema de gestão',
    )
    const modules = slide.querySelectorAll('.ms-sb__mods li')
    expect([...modules].map((item) => item.textContent)).toEqual([
      'Plano',
      'Funerária',
      'Cobrança',
      'Caixa',
    ])
    expect(slide.textContent).toContain('Hospedado na nuvem')
    const link = scope.getByRole('link', { name: 'Conhecer o SmallBusiness', hidden: true })
    expect(link.getAttribute('href')).toBe('/produtos/smallbusiness')
  })

  test('o slide do Dashboard mostra os painéis do sistema e não fala em aparelhos', () => {
    renderWithRouter(<HeroShowcase />)
    const slide = document.querySelectorAll<HTMLElement>('.ms-car__slide')[1] as HTMLElement
    const chips = [...slide.querySelectorAll('.ms-chip strong')].map((chip) => chip.textContent)
    const link = within(slide).getByRole('link', { name: 'Conhecer o MS Dashboard', hidden: true })
    expect(link.getAttribute('href')).toBe('/produtos/dashboard')
    expect(chips).toEqual([
      'Fluxo previsto x realizado',
      'Inadimplência',
      'Vendas no período',
      'Contas a receber',
    ])
    expect(slide.textContent).not.toContain('Tablet, celular ou notebook')
  })

  test('só o slide visível fica disponível para o leitor de tela', () => {
    renderWithRouter(<HeroShowcase />)
    const hidden = [...document.querySelectorAll('.ms-car__slide')].map((slide) =>
      slide.getAttribute('aria-hidden'),
    )
    expect(hidden).toEqual(['false', 'true', 'true'])
    expect(screen.getByText('Um app para você oferecer aos seus associados')).toBeDefined()
  })
})
