import {put} from './api/put'
import {batchGetMassive, BatchGetMassiveInputType} from './api/batch-get-massive'
import {get} from './api/get'
import {batchWriteMassive, BatchWriteMassiveInputType} from './api/batch-write-massive'
import {del} from './api/del'
import {query} from './api/query'
import {queryAll} from './api/query-all'
import {scan} from './api/scan'
import {update} from './api/update'
import {scanAllSegmented} from './api/scan-all-segmented'
import {scanAll} from './api/scan-all'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export function createDynamoDB(ddbClient: DocumentClient) {
  return {
    batchGet<T>(params: BatchGetMassiveInputType) {
      return batchGetMassive<T>(ddbClient, params)
    },
    batchWrite<T>(params: BatchWriteMassiveInputType<T>) {
      return batchWriteMassive<T>(ddbClient, params)
    },
    del(params: DocumentClient.DeleteItemInput) {
      return del(ddbClient, params)
    },
    get<T>(params: DocumentClient.GetItemInput) {
      return get<T>(ddbClient, params)
    },
    put<T>(params: DocumentClient.PutItemInput) {
      return put<T>(ddbClient, params)
    },
    query<T>(params: DocumentClient.QueryInput) {
      return query<T>(ddbClient, params)
    },
    queryAll<T>(params: DocumentClient.QueryInput) {
      return queryAll<T>(ddbClient, params)
    },
    scan<T>(params: DocumentClient.ScanInput) {
      return scan<T>(ddbClient, params)
    },
    scanAll<T>(params: DocumentClient.ScanInput) {
      return scanAll<T>(ddbClient, params)
    },
    scanAllSegmented<T>(segmentCount: number, params: DocumentClient.ScanInput) {
      return scanAllSegmented<T>(ddbClient, segmentCount, params)
    },
    update<T>(params: DocumentClient.UpdateItemInput) {
      return update<T>(ddbClient, params)
    },
  }
}
