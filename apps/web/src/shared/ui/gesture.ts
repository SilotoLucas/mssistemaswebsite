export const DRAG_THRESHOLD_PX = 6
export const CLICK_GUARD_MS = 300

export const isPrimaryPress = (event: PointerEvent): boolean =>
  event.isPrimary && !(event.pointerType === 'mouse' && event.button !== 0)

export const isHorizontalGesture = (dx: number, dy: number, minimum: number): boolean =>
  Math.abs(dx) >= minimum && Math.abs(dx) > Math.abs(dy)

const LINE_HEIGHT_PX = 16

type WheelDelta = Pick<WheelEvent, 'deltaX' | 'deltaY' | 'deltaMode' | 'shiftKey'>

export const horizontalWheelDelta = (event: WheelDelta): number => {
  const scale = event.deltaMode === 1 ? LINE_HEIGHT_PX : 1
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return event.deltaX * scale
  return event.shiftKey ? event.deltaY * scale : 0
}
