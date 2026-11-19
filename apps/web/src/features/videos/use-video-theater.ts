import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ALL_VIDEOS, type LibraryVideo, VIDEO_LIBRARY } from './video-library'

const COPY_RESET_MS = 2600

type CopyState = 'idle' | 'copied' | 'failed'

const FIRST_VIDEO = VIDEO_LIBRARY[0] as LibraryVideo

const videoPageUrl = (origin: string, slug: string): string =>
  `${origin}/videos?video=${encodeURIComponent(slug)}`

export const useVideoTheater = () => {
  const [params, setParams] = useSearchParams()
  const current = VIDEO_LIBRARY.find((video) => video.slug === params.get('video')) ?? FIRST_VIDEO
  const [playing, setPlaying] = useState(false)
  const [filter, setFilter] = useState(ALL_VIDEOS)
  const [cinema, setCinema] = useState(false)
  const [copy, setCopy] = useState<CopyState>('idle')

  const queue =
    filter === ALL_VIDEOS
      ? VIDEO_LIBRARY
      : VIDEO_LIBRARY.filter((video) => video.groupSlug === filter)
  const position = VIDEO_LIBRARY.indexOf(current) + 1

  const select = useCallback(
    (slug: string, play: boolean) => {
      setParams({ video: slug }, { replace: true, preventScrollReset: true })
      setPlaying(play)
      setCopy('idle')
    },
    [setParams],
  )

  const next = () => {
    const list = queue.includes(current) ? queue : VIDEO_LIBRARY
    const target = list[(list.indexOf(current) + 1) % list.length]
    if (target) select(target.slug, playing)
  }

  const copyLink = () => {
    const url = videoPageUrl(window.location.origin, current.slug)
    if (!navigator.clipboard) {
      setCopy('failed')
      return
    }
    navigator.clipboard.writeText(url).then(
      () => setCopy('copied'),
      () => setCopy('failed'),
    )
  }

  useEffect(() => {
    if (copy === 'idle') return
    const timer = window.setTimeout(() => setCopy('idle'), COPY_RESET_MS)
    return () => window.clearTimeout(timer)
  }, [copy])

  return {
    current,
    position,
    queue,
    playing,
    filter,
    cinema,
    copy,
    play: () => setPlaying(true),
    select,
    next,
    copyLink,
    setFilter,
    toggleCinema: () => setCinema((value) => !value),
  }
}
