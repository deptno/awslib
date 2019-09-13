import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export type CreateDynamoDbStoreInput = {
  ddbClient: DocumentClient
  tables: {
    user: {
      tableName: string
      hashKey: string
      rangeKey: string
    }
    token: {
      tableName: string
      hashKey: string
      rangeKey: string
      ttlKey: string
    }
  }
}
export type StoreMethods<U> = {
  upsertUser(params: UpsertUserInput): Promise<U>
  saveState(params: SaveStateInput)
  revokeState(params: ExpireStateAndGetOldItemInput): Promise<string|undefined>
  saveRefreshToken(params: SaveRefreshTokenInput)
  revokeRefreshToken(params: RevokeRefreshTokenInput)
}

export type UpsertUserInput = {
  id: string
  profile: any
}
export type SaveStateInput = {
  state: string
  expiresIn: number
  host: string
}
export type ExpireStateAndGetOldItemInput = {
  state: string
}
export type RevokeRefreshTokenInput = {
  oldToken: string
  token: string
}
export type SaveRefreshTokenInput = {
  id: string | number
  token: string
  expiresIn: number
}
