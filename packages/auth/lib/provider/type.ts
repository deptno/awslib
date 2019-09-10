export type ProviderInfo = {
  clientId: string
  clientSecret: string
  redirectUri: string
  redirectClientUri: string
  tokenSecret: string
  expiresIn: number
  refreshTokenExpiresIn: number
}

export type GetTokensInput = {
  state: string
  code: string
}