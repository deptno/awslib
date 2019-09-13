import {CreateDynamoDbStoreInput, ExpireStateAndGetOldItemInput} from '../../../type'
import {log} from '../../../../lib/log'

export function expireStateAndGetOldItem(params: CreateDynamoDbStoreInput) {
  const {ddbClient, tables} = params

  return async function ({state}: ExpireStateAndGetOldItemInput) {
    try {
      const response = await ddbClient
        .delete({
          TableName: tables.token.tableName,
          Key: {
            [tables.token.hashKey]: state,
            [tables.token.rangeKey]: 'state',
          },
          ReturnValues: 'ALL_OLD',
        })
        .promise()

      log('response', response)
      if (response.Attributes) {
        return response.Attributes.host
      }
      return
    } catch (e) {
      console.error(e.code, e.message)
      console.error('error, ddb expire state, return true to assume state is already expired')

      return
    }
  }
}
