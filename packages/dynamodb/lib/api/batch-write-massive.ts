import {
  BatchWriteItemRequestMap,
  PutItemInputAttributeMap,
  WriteRequest,
  DocumentClient
} from 'aws-sdk/clients/dynamodb'
import {batchWrite} from './batch-write'
import {splitEvery} from 'ramda'
import {log} from '../log'

export async function batchWriteMassive<T>(ddbClient: DocumentClient, params: BatchWriteMassiveInputType<T>): Promise<number> {
  const {tableName, items, mode = 'put'} = params

  if (items.length > 0) {
    const [pack, unpack] = getPacker(mode)
    const chunks = splitEvery(25, items)
    const promises = chunks
      .map((items): BatchWriteItemRequestMap => ({
        [tableName]: items.map(pack)
      }))
      .map(mapRequests => _batchWriteMassive(ddbClient, mapRequests))
    const responses = await Promise.all(promises)
    const [unprocessedItems, wcu] = responses.reduce<[T[], number]>((acc, [mapRequests, wcu]) => {
      const unprocessedItems = mapRequests[tableName]
      if (unprocessedItems) {
        acc[0].push(...unprocessedItems.map(unpack))
      }
      acc[1] += wcu
      return acc
    }, [[], 0])

    log({
      wcu,
      try    : items.length,
      success: items.length - unprocessedItems.length,
      retry  : unprocessedItems.length,
    })

    if (unprocessedItems.length > 0) {
      return wcu + await batchWriteMassive<T>(ddbClient, {
        tableName,
        mode,
        items: unprocessedItems,
      })
    }
    return wcu
  }
  return 0
}

function getPacker(mode) {
  return mode === 'put'
    ? [_packPutRequest, _unpackPutRequest]
    : [_packDeleteRequest, _unpackDeleteRequest]
}
function _packPutRequest(item: PutItemInputAttributeMap): WriteRequest {
  return {PutRequest: {Item: item}}
}
function _unpackPutRequest<T>(item: WriteRequest) {
  return item.PutRequest.Item as unknown as T
}
function _packDeleteRequest(key): WriteRequest {
  return {DeleteRequest: {Key: key}}
}
function _unpackDeleteRequest<T>(item: WriteRequest) {
  return item.DeleteRequest.Key
}
async function _batchWriteMassive<T>(
  ddbClient: DocumentClient,
  mapRequests: BatchWriteItemRequestMap
): Promise<[BatchWriteItemRequestMap, number]> {
  const response = await batchWrite(ddbClient, {
    RequestItems          : mapRequests,
    ReturnConsumedCapacity: 'TOTAL'
  })
  if (response) {
    return [
      response.UnprocessedItems,
      response.ConsumedCapacity[0].CapacityUnits || 0
    ]
  }
  return [{}, 0]
}

export type BatchWriteMassiveInputType<T> = {
  tableName: string
  items: T[]
  mode?: BatchWriteMassiveType
}
type BatchWriteMassiveType = 'put' | 'delete'
