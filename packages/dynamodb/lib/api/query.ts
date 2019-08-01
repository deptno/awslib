import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {identity} from 'ramda'

export async function query<T>(ddbClient: DocumentClient, params: DocumentClient.QueryInput): Promise<PaginationResult<T>> {
  try {
    if (params.ExclusiveStartKey) {
      params.ExclusiveStartKey = parseToken(params.ExclusiveStartKey)
    }
    const response = await ddbClient
      .query(params)
      .promise()

    console.log(JSON.stringify({
      rcu      : response.ConsumedCapacity.CapacityUnits,
      condition: params.KeyConditionExpression,
      values   : params.ExpressionAttributeValues,
    }))

    return {
      items      : response.Items as T[],
      nextToken  : createToken(response.LastEvaluatedKey),
      firstResult: !Boolean(params.ExclusiveStartKey)
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
  nextToken?: string
  firstResult?: boolean
}

const createToken = identity
const parseToken = identity
