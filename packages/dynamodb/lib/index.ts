import {DocumentClient, TransactGetItemList, TransactWriteItemList} from 'aws-sdk/clients/dynamodb'
import {js2DdbDoc} from './normalizer'
import {createToken, parseToken} from './token'
import {gzip, unGzip} from './gzip'
import {
  batchGetMassive,
  BatchGetMassiveInputType,
  batchWriteMassive,
  BatchWriteMassiveInputType,
  del,
  get,
  put,
  query,
  queryAll,
  scan,
  scanAll,
  scanAllSegmented,
  transactGet,
  transactWrite,
  update,
} from './api'

export function createDynamoDB(ddbClient: DocumentClient) {
  return {
    raw: ddbClient,
    batchGet<T>(params: BatchGetMassiveInputType) {
      return batchGetMassive<T>(ddbClient, params)
    },
    batchWrite<T>(params: BatchWriteMassiveInputType<T>) {
      return batchWriteMassive<T>(ddbClient, params)
    },
    transactGet<T>(params: TransactGetItemList) {
      return transactGet(ddbClient, params)
    },
    transactWrite<T>(params: TransactWriteItemList) {
      return transactWrite(ddbClient, params)
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
    util
  }
}

export const util = {
  js2DdbDoc,
  createToken,
  parseToken,
  gzip,
  unGzip,
}
