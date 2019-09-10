import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {expireStateAndGetOldItem, revokeRefreshToken, saveRefreshToken, saveState, upsertUser} from './method'
import {DbMethods} from '../../type'

export const createDynamoDbStoreMethods = <U>(params: CreateDynamoDbMethodInput): DbMethods<U> => {
  return {
    upsertUser: upsertUser<U>(params),
    saveState: saveState(params),
    expireStateAndGetOldItem: expireStateAndGetOldItem(params),
    saveRefreshToken: saveRefreshToken(params),
    revokeRefreshToken: revokeRefreshToken(params),
  }
}

type CreateDynamoDbMethodInput = {
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
