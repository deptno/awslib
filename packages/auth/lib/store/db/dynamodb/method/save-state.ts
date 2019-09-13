import {SaveStateInput} from '../../../type'
import {log} from '../../../../lib/log'

export function saveState(params) {
  const {ddbClient, tables} = params

  return async function ({state, expiresIn, host}: SaveStateInput) {
    const putParams = {
      TableName: tables.token.tableName,
      Item: {
        [tables.token.hashKey]: state,
        [tables.token.rangeKey]: 'state',
        [tables.token.ttlKey]: ~~(Date.now() / 1000) + expiresIn,
        host,
        expiresIn,
      },
    }
    log('putParams', putParams)
    return ddbClient
      .put(putParams)
      .promise()
  }
}

