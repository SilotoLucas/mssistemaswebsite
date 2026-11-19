import { useEffect, useRef, useState } from 'react'
import { Icon } from './icon'
import { prefersReducedMotion } from './motion'
import './youtube-video.css'

type YoutubeVideoProps = {
  readonly videoId: string
  readonly title: string
}

export const youtubeEmbedUrl = (videoId: string): string =>
  `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&playsinline=1`

export const YoutubeVideo = ({ videoId, title }: YoutubeVideoProps) => {
  const [playing, setPlaying] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!(playing && frame)) return
    frame.focus({ preventScroll: true })
    frame.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [playing])

  if (!playing) {
    return (
      <button className="ms-video__start" type="button" onClick={() => setPlaying(true)}>
        <span className="ms-video__play">
          <Icon name="play" size={22} />
        </span>
        <span className="ms-video__text">
          <strong>Assistir ao vídeo de apresentação</strong>
          <span>{title}, no player do YouTube</span>
        </span>
      </button>
    )
  }

  return (
    <div className="ms-video__frame">
      <iframe
        ref={frameRef}
        src={youtubeEmbedUrl(videoId)}
        title={`Vídeo de apresentação: ${title}`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
