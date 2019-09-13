import {RevokeRefreshTokenInput} from '../../../type'

export function revokeRefreshToken(params) {
  const {ddbClient, tables} = params

  return async ({oldToken, token}: RevokeRefreshTokenInput) => {
    if (oldToken.match(/[A-Fa-f0-9]{64}/)) {
      const getToken = async () => {
        const params = {
          TableName: tables.token.tableName,
          Key: {
            [tables.token.hashKey]: oldToken,
            [tables.token.rangeKey]: 'refresh',
          },
        }

        const token = await ddbClient
          .get(params)
          .promise()
        return token.Item
      }
      const newRefreshToken = async (data) => {
        const {userId, payload} = data

        const params = {
          TableName: tables.token.tableName,
          Item: {
            [tables.token.hashKey]: token,
            [tables.token.rangeKey]: 'refresh',
            userId,
            payload,
            expired: false,
          },
        }

        return ddbClient
          .put(params)
          .promise()
          .then(() => userId)
      }
      const expireRefreshToken = async (userId) => {
        const params = {
          TableName: tables.token.tableName,
          Item: {
            [tables.token.hashKey]: oldToken,
            [tables.token.rangeKey]: 'refresh',
            expired: true,
            userId,
          },
        }

        return ddbClient
          .put(params)
          .promise()
          .then(() => userId)
      }

      const data = await getToken()
      if (!data) {
        throw new Error('Invalid token')
      }
      const next = await newRefreshToken(data)
        .then(expireRefreshToken)
        .then((id) => ({
          id,
          token,
          payload: data.payload && JSON.parse(data.payload),
        }))
      return next
    } else {
      throw new Error('Invalid token')
    }
  }
}
