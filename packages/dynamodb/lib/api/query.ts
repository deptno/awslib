import {DocumentClient, Key} from 'aws-sdk/clients/dynamodb'
import {log} from '../log'

export async function query<T>(ddbClient: DocumentClient, params: DocumentClient.QueryInput): Promise<PaginationResult<T>> {
  try {
    const response = await ddbClient
      .query(params)
      .promise()

    log(JSON.stringify({
      rcu: response.ConsumedCapacity
        ? response.ConsumedCapacity.CapacityUnits
        : 'unknown',
      condition: params.KeyConditionExpression,
      values: params.ExpressionAttributeValues,
    }))

    return {
      items: response.Items as T[],
      lastEvaluatedKey: response.LastEvaluatedKey,
      firstResult: !Boolean(params.ExclusiveStartKey),
    }
  } catch (e) {
    console.error('query')
    console.error(e)
    console.error(params)
    return {
      items: [],
    }
  }
}

export type PaginationResult<T> = {
  items: T[]
  lastEvaluatedKey?: Key
  firstResult?: boolean
}
