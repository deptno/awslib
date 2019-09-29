import {batchGet} from './batch-get'
import {splitEvery} from 'ramda'
import {DocumentClient, BatchGetResponseMap, BatchGetRequestMap} from 'aws-sdk/clients/dynamodb'
import {log} from '../log'

export async function batchGetMassive<T>(ddbClient: DocumentClient, params: BatchGetMassiveInputType): Promise<[T[], number]> {
  const {tableName, keysList} = params
  const chunks = splitEvery(100, keysList)
  const promises = chunks
    .map((keys): DocumentClient.BatchGetRequestMap => ({
      [tableName]: {
        Keys: keys,
      }
    }))
    .map(mapRequests => _batchGetMassive({ddbClient, mapRequests}))
  const responses = await Promise.all(promises)
  const [items, unprocessedItems, rcu] = responses.reduce<[T[], Key[], number]>(
    (acc, [responses, mapRequests, wcu]) => {
      const items = responses[tableName]
      if (items) {
        acc[0].push(...items)
      }
      const unprocessedItems = mapRequests[tableName]
      if (unprocessedItems) {
        acc[1].push(...unprocessedItems.Keys)
      }
      acc[2] += wcu
      return acc
    },
    [[], [], 0]
  )
  if (unprocessedItems.length > 0) {
    log({'retry unprocessedItems': unprocessedItems.length})
    const [chunkedItems, chunkedRcu] = await batchGetMassive<T>(ddbClient, {
      tableName,
      keysList: unprocessedItems
    })
    return [
      [...chunkedItems, ...items],
      rcu + chunkedRcu
    ]
  }
  return [items, rcu]
}

async function _batchGetMassive<T>(params: _BatchGetMassiveInputType): Promise<[BatchGetResponseMap, BatchGetRequestMap, number]> {
  const {ddbClient, mapRequests} = params
  const response = await batchGet(ddbClient, {
    RequestItems          : mapRequests,
    ReturnConsumedCapacity: 'TOTAL'
  })
  if (response) {
    return [
      response.Responses,
      response.UnprocessedKeys,
      response.ConsumedCapacity[0].CapacityUnits || 0
    ]
  }
  return [{}, {}, 0]
}

export type BatchGetMassiveInputType = {
  tableName: string
  keysList: Key[]
}
type _BatchGetMassiveInputType = {
  ddbClient: DocumentClient,
  mapRequests: DocumentClient.BatchGetRequestMap
}
type Key = { [key: string]: string | number }
