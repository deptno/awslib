import {getTokens} from './google'
import {GetTokensInput, ProviderInfo} from './type'

export function createGoogleProvider(provider: ProviderInfo) {
  return {
    raw: provider,
    getTokens(params: GetTokensInput) {
      return getTokens(provider, params)
    },
  }
}

export type Provider = ReturnType<typeof createGoogleProvider>
