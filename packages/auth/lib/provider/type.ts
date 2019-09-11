export type ProviderInfo = {
  clientId: string
  clientSecret: string
  tokenSecret: string
  expiresIn: number
  refreshTokenExpiresIn: number
}

export type GetTokensInput = {
  state: string
  code: string
  redirectUri: string
}