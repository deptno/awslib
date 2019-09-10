export type DbMethods<U> = {
  upsertUser(params: UpsertUserInput): Promise<U>
  saveState(params: SaveStateInput)
  expireStateAndGetOldItem(params: ExpireStateAndGetOldItemInput): Promise<boolean>
  saveRefreshToken(params: SaveRefreshTokenInput)
  revokeRefreshToken(params: RevokeRefreshTokenInput)
}

export type UpsertUserInput = {
  userId: string
  profile: any
}
export type SaveStateInput = {
  state: string
  expiresIn: number
}
export type ExpireStateAndGetOldItemInput = {
  state: string
}
export type RevokeRefreshTokenInput = {
  oldToken: string
  token: string
}
export type SaveRefreshTokenInput = {
  userId: string | number
  payload: any
  token: string
  expiresIn: number
}
