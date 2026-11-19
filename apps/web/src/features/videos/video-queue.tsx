import { useEffect, useRef } from 'react'
import { VideoFilters } from './video-filters'
import { formatDuration, isoDuration, type LibraryVideo, spokenDuration } from './video-library'

type VideoQueueProps = {
  readonly queue: readonly LibraryVideo[]
  readonly currentSlug: string
  readonly playing: boolean
  readonly filter: string
  readonly onFilter: (slug: string) => void
  readonly onSelect: (slug: string) => void
}

export const VideoQueue = ({
  queue,
  currentSlug,
  playing,
  filter,
  onFilter,
  onSelect,
}: VideoQueueProps) => {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    const item = list?.querySelector<HTMLElement>(`[data-slug="${currentSlug}"]`)
    if (!(list && item) || list.scrollHeight <= list.clientHeight) return
    const top = item.offsetTop
    const bottom = top + item.offsetHeight
    if (top >= list.scrollTop && bottom <= list.scrollTop + list.clientHeight) return
    list.scrollTop = top - (list.clientHeight - item.offsetHeight) / 2
  }, [currentSlug])

  return (
    <section className="ms-vd-queue" aria-labelledby="ms-vd-queue-title">
      <div className="ms-vd-queue__head">
        <h2 id="ms-vd-queue-title">Fila de vídeos</h2>
        <span>{queue.length === 1 ? '1 vídeo' : `${queue.length} vídeos`}</span>
      </div>
      <VideoFilters filter={filter} onFilter={onFilter} />
      <ol className="ms-vd-list" ref={listRef}>
        {queue.map((video) => {
          const isCurrent = video.slug === currentSlug
          return (
            <li key={video.slug}>
              <button
                className="ms-vd-item"
                data-slug={video.slug}
                type="button"
                aria-current={isCurrent ? 'true' : undefined}
                onClick={() => onSelect(video.slug)}
              >
                <span className="ms-vd-item__thumb">
                  <img src={video.poster} alt="" width={960} height={540} loading="lazy" />
                  <time dateTime={isoDuration(video.seconds)}>
                    <span aria-hidden="true">{formatDuration(video.seconds)}</span>
                    <span className="ms-sr">{spokenDuration(video.seconds)}</span>
                  </time>
                </span>
                <span className="ms-vd-item__text">
                  <strong>{video.name}</strong>
                  <span>{video.groupName}</span>
                  {isCurrent ? (
                    <span className={`ms-vd-now${playing ? ' is-live' : ''}`}>
                      <span className="ms-vd-now__eq" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </span>
                      {playing ? 'Tocando agora' : 'Em exibição'}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
