import type { DemoRequest, Result } from '@ms/domain'

export type DemoRequestSender = {
  readonly send: (request: DemoRequest) => Promise<Result<void, 'send-failed'>>
}
