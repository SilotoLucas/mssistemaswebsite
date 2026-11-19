import { describe, expect, test } from 'bun:test'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SOLUTION_GROUPS } from '../../shared/config/solutions-catalog'
import { renderWithRouter } from '../../test/render-with-router'
import {
  COMPANY_SEGMENTS,
  SEGMENT_GROUP_SLUG,
  SEGMENT_MODULES,
  SMALL_BUSINESS_INTEREST,
} from './demo-options'
import { DemoRequestForm } from './demo-request-form'

const OTHER_GROUPS = SOLUTION_GROUPS.filter((group) => group.slug !== SEGMENT_GROUP_SLUG)

const interestBoxes = () =>
  [...document.querySelectorAll<HTMLInputElement>('input[name="interests"]')].map(
    (input) => input.value,
  )

describe('segmento da empresa', () => {
  test('mostra os segmentos como botões, incluindo Clínica e Material Convalescente', () => {
    renderWithRouter(<DemoRequestForm />)
    const group = screen.getByRole('group', { name: 'Segmento da empresa' })
    const options = within(group)
      .getAllByRole('radio')
      .map((radio) => (radio as HTMLInputElement).value)
    expect(options).toEqual([...COMPANY_SEGMENTS])
    expect(options).toContain('Clínica')
    expect(options).toContain('Material Convalescente')
    expect(document.querySelector('select')).toBeNull()
  })

  test('marca um segmento por vez', async () => {
    const user = userEvent.setup()
    renderWithRouter(<DemoRequestForm />)
    const funeraria = screen.getByRole('radio', { name: 'Funerária' }) as HTMLInputElement
    const clinica = screen.getByRole('radio', { name: 'Clínica' }) as HTMLInputElement
    await user.click(funeraria)
    await user.click(clinica)
    expect(funeraria.checked).toBe(false)
    expect(clinica.checked).toBe(true)
  })
})

describe('interesses no formulário de demonstração', () => {
  test('mostra o SmallBusiness, depois os segmentos e depois os outros módulos', () => {
    renderWithRouter(<DemoRequestForm />)
    const values = interestBoxes()
    const otherModules = OTHER_GROUPS.flatMap((group) => group.solutions.map((item) => item.name))
    expect(values).toEqual([SMALL_BUSINESS_INTEREST, ...SEGMENT_MODULES, ...otherModules])
  })

  test('os segmentos ficam à mostra e os outros módulos ficam em grupos que abrem e fecham', () => {
    renderWithRouter(<DemoRequestForm />)
    const segments = screen.getByRole('group', { name: 'Sistema por segmento' })
    expect(within(segments).getAllByRole('checkbox')).toHaveLength(SEGMENT_MODULES.length)
    expect(segments.querySelector('details')).toBeNull()
    const groups = [...document.querySelectorAll('.ms-interest__g summary')].map(
      (summary) => summary.textContent,
    )
    expect(groups).toEqual(OTHER_GROUPS.map((group) => group.name))
  })

  test('é opcional: o formulário não marca erro sem nenhum interesse', async () => {
    const user = userEvent.setup()
    renderWithRouter(<DemoRequestForm />)
    await user.click(screen.getByRole('button', { name: 'Solicitar demonstração' }))
    const fieldset = screen.getByRole('group', { name: /Quais soluções interessam/ })
    expect(within(fieldset).queryByRole('alert')).toBeNull()
    expect(fieldset.querySelector('[aria-invalid="true"]')).toBeNull()
  })

  test('marca o SmallBusiness e um segmento, e conta os módulos marcados em cada grupo', async () => {
    const user = userEvent.setup()
    renderWithRouter(<DemoRequestForm />)
    const smallBusiness = screen.getByRole('checkbox', {
      name: /SmallBusiness/,
    }) as HTMLInputElement
    await user.click(smallBusiness)
    expect(smallBusiness.checked).toBe(true)
    const segments = screen.getByRole('group', { name: 'Sistema por segmento' })
    const plano = within(segments).getByRole('checkbox', { name: 'Plano' }) as HTMLInputElement
    await user.click(plano)
    expect(plano.checked).toBe(true)

    const [first, second] = (OTHER_GROUPS[0]?.solutions ?? []).map((solution) => solution.name)
    await user.click(screen.getByRole('checkbox', { name: first ?? '' }))
    await user.click(screen.getByRole('checkbox', { name: second ?? '' }))
    const summary = document.querySelector('.ms-interest__g summary') as HTMLElement
    expect(summary.textContent).toContain('2 marcados')
  })
})
