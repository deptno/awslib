import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export type CreateDynamoDbMethodInput = {
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
export type DbMethods<U> = {
  upsertUser(params: UpsertUserInput): Promise<U>
  saveState(params: SaveStateInput)
  expireStateAndGetOldItem(params: ExpireStateAndGetOldItemInput): Promise<boolean>
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
