import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {log} from '../log'

export async function scanAll<T>(ddbClient: DocumentClient, params: DocumentClient.ScanInput): Promise<T[]> {
  const items: T[] = []

  let consumedCapacity = 0
  let nextKey

  try {
    do {
      const response = await ddbClient
        .scan({
          ...params,
          ReturnConsumedCapacity: 'TOTAL',
          ExclusiveStartKey: nextKey,
        })
        .promise()
      nextKey = response.LastEvaluatedKey
      items.push(...response.Items as T[])
      if (response.ConsumedCapacity) {
        // DynamoDB local doesn't honor `ConsumedCapacity`
        consumedCapacity += response.ConsumedCapacity.CapacityUnits
      }
    } while (nextKey)

    log(`scanAll, rcu ${consumedCapacity} ${items.length} items`)
  } catch (e) {
    console.error('error scanAll', e)
    console.error(params)
  }

  return items
}