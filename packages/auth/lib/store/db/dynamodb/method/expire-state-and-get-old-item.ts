import {CreateDynamoDbMethodInput, ExpireStateAndGetOldItemInput} from '../../../type'

export function expireStateAndGetOldItem(params: CreateDynamoDbMethodInput) {
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

      return !!response.Attributes
    } catch (e) {
      console.error(e.code, e.message)
      console.error('error, ddb expire state, return true to assume state is already expired')

      return false
    }
  }
}
