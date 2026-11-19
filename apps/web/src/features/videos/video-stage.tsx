import { useEffect, useRef } from 'react'
import { Icon } from '../../shared/ui/icon'
import { prefersReducedMotion } from '../../shared/ui/motion'
import { youtubeEmbedUrl } from '../../shared/ui/youtube-video'
import { formatDuration, type LibraryVideo, spokenDuration } from './video-library'

type VideoStageProps = {
  readonly video: LibraryVideo
  readonly playing: boolean
  readonly onPlay: () => void
}

export const VideoStage = ({ video, playing, onPlay }: VideoStageProps) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const stage = stageRef.current
    if (!(playing && frame && stage && video.videoId)) return
    frame.focus({ preventScroll: true })
    stage.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [playing, video.videoId])

  return (
    <div className="ms-vd-stage" ref={stageRef}>
      <img className="ms-vd-stage__glow" key={video.slug} src={video.poster} alt="" />
      <div className="ms-vd-stage__screen">
        {playing ? (
          <iframe
            key={video.videoId}
            ref={frameRef}
            src={youtubeEmbedUrl(video.videoId)}
            title={`Vídeo de apresentação: ${video.name}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button className="ms-vd-poster" type="button" onClick={onPlay} key={video.slug}>
            <img src={video.poster} alt="" width={960} height={540} />
            <span className="ms-vd-poster__play">
              <Icon name="play" size={34} />
            </span>
            <span className="ms-vd-poster__bar">
              <span>
                Assistir ao vídeo<span className="ms-sr"> de {video.name}</span>
              </span>
              <span className="ms-vd-poster__time">
                <span aria-hidden="true">{formatDuration(video.seconds)}</span>
                <span className="ms-sr">, {spokenDuration(video.seconds)}</span>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
