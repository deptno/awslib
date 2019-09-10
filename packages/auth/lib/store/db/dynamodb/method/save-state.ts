import {SaveStateInput} from '../../../type'

export function saveState(params) {
  const {ddbClient, tables} = params

  return async function ({state, expiresIn}: SaveStateInput) {
    return ddbClient
      .put({
        TableName: tables.token.tableName,
        Item: {
          [tables.token.hashKey]: state,
          [tables.token.rangeKey]: 'state',
          [tables.token.ttlKey]: ~~(Date.now() / 1000) + expiresIn,
          expiresIn,
        },
      })
      .promise()
  }
}

