import { describe, expect, test } from 'bun:test'
import { SOLUTION_COUNT, SOLUTION_GROUPS } from '../../shared/config/solutions-catalog'
import {
  formatDuration,
  isoDuration,
  LIVE_ONLY_COUNT,
  spokenDuration,
  TOTAL_MINUTES,
  VIDEO_FACTS,
  VIDEO_FILTERS,
  VIDEO_LIBRARY,
} from './video-library'

const catalogVideoIds = SOLUTION_GROUPS.flatMap((group) =>
  group.solutions.flatMap((solution) => (solution.videoId ? [solution.videoId] : [])),
)

describe('biblioteca de vídeos', () => {
  test('todo vídeo do catálogo de soluções entra na biblioteca', () => {
    expect(VIDEO_LIBRARY.map((video) => video.videoId)).toEqual(catalogVideoIds)
  })

  test('não guarda duração de vídeo que saiu do catálogo', () => {
    expect(Object.keys(VIDEO_FACTS).sort()).toEqual([...catalogVideoIds].sort())
  })

  test('cada vídeo tem duração positiva e capa própria', () => {
    for (const video of VIDEO_LIBRARY) {
      expect(video.seconds).toBeGreaterThan(0)
      expect(video.poster).toBeTruthy()
    }
    expect(new Set(VIDEO_LIBRARY.map((video) => video.poster)).size).toBe(VIDEO_LIBRARY.length)
  })

  test('os filtros somam a biblioteca inteira e não mostram área vazia', () => {
    const [all, ...groups] = VIDEO_FILTERS
    expect(all?.count).toBe(VIDEO_LIBRARY.length)
    expect(groups.every((group) => group.count > 0)).toBe(true)
    expect(groups.reduce((sum, group) => sum + group.count, 0)).toBe(VIDEO_LIBRARY.length)
  })

  test('os totais vêm das durações e do catálogo', () => {
    const seconds = VIDEO_LIBRARY.reduce((sum, video) => sum + video.seconds, 0)
    expect(TOTAL_MINUTES).toBe(Math.round(seconds / 60))
    expect(LIVE_ONLY_COUNT).toBe(SOLUTION_COUNT - VIDEO_LIBRARY.length)
  })
})

describe('duração', () => {
  test('mostra minutos e segundos com dois dígitos', () => {
    expect(formatDuration(233)).toBe('3:53')
    expect(formatDuration(61)).toBe('1:01')
    expect(formatDuration(45)).toBe('0:45')
  })

  test('gera a duração ISO para a tag time', () => {
    expect(isoDuration(233)).toBe('PT3M53S')
  })

  test('lê a duração por extenso para leitor de tela', () => {
    expect(spokenDuration(233)).toBe('3 minutos e 53 segundos')
    expect(spokenDuration(61)).toBe('1 minuto e 1 segundo')
    expect(spokenDuration(120)).toBe('2 minutos')
    expect(spokenDuration(45)).toBe('45 segundos')
  })
})
