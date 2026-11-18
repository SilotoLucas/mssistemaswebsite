export const wrapOffset = (offset: number, setWidth: number): number =>
  ((offset % setWidth) + setWidth) % setWidth

export const nearestStep = (offset: number, step: number): number =>
  Math.round(offset / step) * step

export const shortestDelta = (from: number, to: number, setWidth: number): number => {
  const delta = wrapOffset(to - from, setWidth)
  return delta > setWidth / 2 ? delta - setWidth : delta
}

export const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3
