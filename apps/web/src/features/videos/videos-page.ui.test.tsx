import { afterEach, describe, expect, mock, test } from 'bun:test'
import { act, fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { youtubeEmbedUrl } from '../../shared/ui/youtube-video'
import { renderWithRouter } from '../../test/render-with-router'
import { type LibraryVideo, VIDEO_LIBRARY } from './video-library'
import { VideosPage } from './videos-page'

const first = VIDEO_LIBRARY[0] as LibraryVideo
const second = VIDEO_LIBRARY[1] as LibraryVideo
const videoBySlug = (slug: string) =>
  VIDEO_LIBRARY.find((video) => video.slug === slug) as LibraryVideo
const queue = () => within(screen.getByRole('region', { name: 'Fila de vídeos' })).getByRole('list')
const nowShowing = () => document.querySelector('.ms-vd-info h2') as HTMLElement

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard')

afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard)
})

describe('página de vídeos', () => {
  test('abre no primeiro vídeo sem carregar nada do YouTube', () => {
    renderWithRouter(<VideosPage />, '/videos')
    expect(nowShowing().textContent).toBe(first.name)
    expect(document.querySelector('iframe')).toBeNull()
    const sources = [...document.querySelectorAll('img')].map((img) => img.getAttribute('src'))
    expect(sources.some((src) => /youtube|ytimg/.test(src ?? ''))).toBe(false)
  })

  test('toca o vídeo em exibição no player da página', async () => {
    renderWithRouter(<VideosPage />, '/videos')
    await userEvent.click(screen.getByRole('button', { name: /^Assistir ao vídeo de/ }))
    const frame = screen.getByTitle(`Vídeo de apresentação: ${first.name}`)
    expect(frame.getAttribute('src')).toBe(youtubeEmbedUrl(first.videoId))
  })

  test('abre direto no vídeo do link compartilhado', () => {
    const target = videoBySlug('dashboard')
    renderWithRouter(<VideosPage />, '/videos?video=dashboard')
    expect(nowShowing().textContent).toBe(target.name)
    const current = within(queue()).getByRole('button', { current: true })
    expect(current.textContent).toContain(target.name)
  })

  test('escolher na fila já começa a tocar aquele vídeo', async () => {
    const target = videoBySlug('chatbot')
    renderWithRouter(<VideosPage />, '/videos')
    await userEvent.click(within(queue()).getByRole('button', { name: new RegExp(target.name) }))
    expect(nowShowing().textContent).toBe(target.name)
    expect(screen.getByTitle(`Vídeo de apresentação: ${target.name}`)).toBeTruthy()
    expect(within(queue()).getByRole('button', { current: true }).textContent).toContain(
      'Tocando agora',
    )
  })

  test('filtra a fila por área', async () => {
    renderWithRouter(<VideosPage />, '/videos')
    const gestao = screen.getByRole('button', { name: /^Gestão/ })
    await userEvent.click(gestao)
    expect(gestao.getAttribute('aria-pressed')).toBe('true')
    const expected = VIDEO_LIBRARY.filter((video) => video.groupSlug === 'gestao')
    expect(within(queue()).getAllByRole('listitem')).toHaveLength(expected.length)
  })

  test('o carrossel de filtros só mostra a seta do lado que tem mais filtros', () => {
    renderWithRouter(<VideosPage />, '/videos')
    const track = document.querySelector('.ms-vd-filters__track') as HTMLElement
    const prev = document.querySelector('.ms-vd-filters__arrow--prev') as HTMLButtonElement
    const next = document.querySelector('.ms-vd-filters__arrow--next') as HTMLButtonElement
    const scrollTo = (left: number) => {
      Object.defineProperty(track, 'scrollWidth', { value: 600, configurable: true })
      Object.defineProperty(track, 'clientWidth', { value: 300, configurable: true })
      Object.defineProperty(track, 'scrollLeft', { value: left, configurable: true })
      act(() => {
        fireEvent.scroll(track)
      })
    }
    scrollTo(0)
    expect(prev.hidden).toBe(true)
    expect(next.hidden).toBe(false)
    expect(next.getAttribute('aria-label')).toBe('Ver mais filtros')
    scrollTo(150)
    expect(prev.hidden).toBe(false)
    expect(next.hidden).toBe(false)
    scrollTo(300)
    expect(prev.hidden).toBe(false)
    expect(next.hidden).toBe(true)
  })

  test('passa para o próximo vídeo', async () => {
    renderWithRouter(<VideosPage />, '/videos')
    await userEvent.click(screen.getByRole('button', { name: 'Próximo vídeo' }))
    expect(nowShowing().textContent).toBe(second.name)
    expect(document.querySelector('iframe')).toBeNull()
  })

  test('leva a dúvida para o WhatsApp e mostra as funções do sistema', () => {
    renderWithRouter(<VideosPage />, '/videos')
    const whatsapp = screen.getByRole('link', { name: 'Tirar dúvidas no WhatsApp' })
    const href = whatsapp.getAttribute('href') ?? ''
    expect(href).toMatch(/^https:\/\/wa\.me\/55\d{11}\?text=/)
    expect(decodeURIComponent(href)).toContain(first.name)
    expect(screen.getByRole('link', { name: 'Ver o que o sistema faz' }).getAttribute('href')).toBe(
      `/solucoes#${first.slug}`,
    )
  })

  test('copia o link do vídeo em exibição', async () => {
    const writeText = mock((_text: string) => Promise.resolve())
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    renderWithRouter(<VideosPage />, '/videos')
    await userEvent.click(screen.getByRole('button', { name: 'Copiar link' }))
    expect(writeText.mock.calls[0]?.[0]).toEndWith(`/videos?video=${first.slug}`)
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('Link copiado'))
  })

  test('não promete tempo de resposta', () => {
    renderWithRouter(<VideosPage />, '/videos')
    const text = screen.getByRole('main').textContent ?? ''
    expect(text).not.toMatch(/respond\w* em|resposta em/i)
  })
})
