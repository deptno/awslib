import {UpsertUserInput} from '../../../type'

export function upsertUser<U>(params) {
  const {ddbClient, tables} = params

  return async function ({id, profile}: UpsertUserInput): Promise<U> {
    const now = new Date().toISOString()

    try {
      const user = await ddbClient
        .update({
          TableName: tables.user.tableName,
          Key: {
            [tables.user.hashKey]: id,
            [tables.user.rangeKey]: 'user#google',
          },
          UpdateExpression: [
            'SET #c = if_not_exists(#c, :n), #u = :n, #p = :p, #ll = :n',
            'ADD #lc :1',
          ].join(' '),
          ExpressionAttributeNames: {
            '#c': 'createdAt',
            '#u': 'updatedAt',
            '#p': 'profile',
            '#lc': 'loginCount',
            '#ll': 'lastLogin',
          },
          ExpressionAttributeValues: {
            ':n': now,
            ':p': profile,
            ':1': 1,
          },
          ReturnValues: 'ALL_NEW',
        })
        .promise()
      console.log({user})
      return user.Attributes
    } catch (e) {
      console.log('error', e, e.code)
      console.error('unknown error')
      throw new Error('unknown error')
    }
  }
}

