import {expireStateAndGetOldItem, revokeRefreshToken, saveRefreshToken, saveState, upsertUser} from './method'
import {CreateDynamoDbMethodInput, DbMethods} from '../../type'

export const createDynamoDbStoreMethods = <U>(params: CreateDynamoDbMethodInput): DbMethods<U> => {
  return {
    upsertUser: upsertUser<U>(params),
    saveState: saveState(params),
    expireStateAndGetOldItem: expireStateAndGetOldItem(params),
    saveRefreshToken: saveRefreshToken(params),
    revokeRefreshToken: revokeRefreshToken(params),
  }
}
