export const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3

export const countAt = (target: number, elapsedMs: number, durationMs: number): number => {
  const progress = Math.min(Math.max(elapsedMs / durationMs, 0), 1)
  return Math.round(target * easeOutCubic(progress))
}
