import {SaveRefreshTokenInput} from '../../../type'

export function saveRefreshToken(params) {
  const {ddbClient, tables} = params

  return async function ({id, token, expiresIn}: SaveRefreshTokenInput) {
    console.log('> save refresh token')
    const putParams = {
      TableName: tables.token.tableName,
      Item: {
        [tables.token.hashKey]: token,
        [tables.token.rangeKey]: 'refresh',
        [tables.token.ttlKey]: expiresIn,
        id,
        expired: false,
      },
    }

    try {
      await ddbClient
        .put(putParams)
        .promise()
      return token
    } catch (e) {
      console.error('fail to save refresh token')
      throw new Error('fail to save refresh token')
    } finally {
      console.log('< save refresh token')
    }
  }
}
