import tokens from '@ms/design-tokens/tokens.json'
import { type DesignTokens, renderTokens } from './render-tokens'

await Bun.write('apps/web/src/styles/tokens.css', renderTokens(tokens as DesignTokens))
