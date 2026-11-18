import {
  type DemoRequest,
  type DemoRequestDraft,
  type DemoRequestErrors,
  err,
  ok,
  type Result,
  validateDemoRequest,
} from '@ms/domain'
import type { DemoRequestSender } from '../../ports/demo-request-sender'

type SubmitDemoRequestError =
  | { readonly kind: 'invalid'; readonly fields: DemoRequestErrors }
  | { readonly kind: 'send-failed' }

export type SubmitDemoRequest = (
  draft: DemoRequestDraft,
) => Promise<Result<DemoRequest, SubmitDemoRequestError>>

export const createSubmitDemoRequest =
  (sender: DemoRequestSender): SubmitDemoRequest =>
  async (draft) => {
    const validated = validateDemoRequest(draft)
    if (!validated.ok) return err({ kind: 'invalid', fields: validated.error })
    const sent = await sender.send(validated.value)
    if (!sent.ok) return err({ kind: 'send-failed' })
    return ok(validated.value)
  }
