import { describe, expect, test } from 'bun:test'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { YoutubeVideo, youtubeEmbedUrl } from './youtube-video'

describe('vídeo do YouTube', () => {
  test('não carrega o YouTube antes do clique', () => {
    render(<YoutubeVideo videoId="ymyX2M4RuA0" title="Funerárias" />)
    expect(document.querySelector('iframe')).toBeNull()
    expect(screen.getByRole('button', { name: /Assistir ao vídeo de apresentação/ })).toBeTruthy()
  })

  test('abre o player dentro da página no modo de privacidade aprimorada', async () => {
    render(<YoutubeVideo videoId="ymyX2M4RuA0" title="Funerárias" />)
    await userEvent.click(screen.getByRole('button', { name: /Assistir ao vídeo de apresentação/ }))
    const frame = screen.getByTitle('Vídeo de apresentação: Funerárias')
    expect(frame.getAttribute('src')).toBe(youtubeEmbedUrl('ymyX2M4RuA0'))
    expect(frame.getAttribute('src')).toStartWith(
      'https://www.youtube-nocookie.com/embed/ymyX2M4RuA0?',
    )
    expect(frame.hasAttribute('allowfullscreen')).toBe(true)
    expect(document.activeElement).toBe(frame)
    expect(screen.queryByRole('button', { name: /Assistir ao vídeo/ })).toBeNull()
  })
})
