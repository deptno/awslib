import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {log} from '../log'

export async function queryAll<T>(ddbClient: DocumentClient, params: DocumentClient.QueryInput): Promise<T[]> {
  const items: T[] = []

  let consumedCapacity = 0
  let nextKey

  try {
    do {
      const response = await ddbClient
        .query({
          ...params,
          ReturnConsumedCapacity: 'TOTAL',
          ExclusiveStartKey     : nextKey,
        })
        .promise()
      nextKey = response.LastEvaluatedKey
      items.push(...response.Items as T[])
      if (response.ConsumedCapacity) {
        // DynamoDB local doesn't honor `ConsumedCapacity`
        consumedCapacity += response.ConsumedCapacity.CapacityUnits
      }
    } while (nextKey)

    log(`queryAll, rcu ${consumedCapacity} ${items.length} items`)
  } catch (e) {
    console.error('error queryAll', e)
    console.error(params)
  }
  return items
}