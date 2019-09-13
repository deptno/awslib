import {CreateDynamoDbStoreInput, StoreMethods} from './type'
import {createDynamoDbStore} from './db/dynamodb'

export function createAuthStore<U>({type, params}: CreateAuthStoreInput<U>): StoreMethods<U> {
  if (type === 'dynamodb') {
    return createDynamoDbStore(params)
  }
  throw new Error(`unsupported type ${type}`)
}

type CreateAuthStoreInput<U> = {
  type: 'dynamodb',
  params: CreateDynamoDbStoreInput
}
