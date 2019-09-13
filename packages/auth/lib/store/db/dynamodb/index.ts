import {expireStateAndGetOldItem, revokeRefreshToken, saveRefreshToken, saveState, upsertUser} from './method'
import {CreateDynamoDbStoreInput, StoreMethods} from '../../type'

export const createDynamoDbStore = <U>(params: CreateDynamoDbStoreInput): StoreMethods<U> => {
  return {
    upsertUser: upsertUser<U>(params),
    saveState: saveState(params),
    revokeState: expireStateAndGetOldItem(params),
    saveRefreshToken: saveRefreshToken(params),
    revokeRefreshToken: revokeRefreshToken(params),
  }
}
