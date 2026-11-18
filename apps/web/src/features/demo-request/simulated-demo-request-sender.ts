import type { DemoRequestSender } from '@ms/application'
import { ok } from '@ms/domain'

const SIMULATED_DELAY_MS = 1400

export const simulatedDemoRequestSender: DemoRequestSender = {
  send: () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(ok(undefined)), SIMULATED_DELAY_MS)
    }),
}
