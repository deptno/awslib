import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {scanAll} from './scan-all'
import {flatten} from 'ramda'

export async function scanAllSegmented<T>(ddbClient: DocumentClient, segmentCount: number, params: DocumentClient.ScanInput): Promise<T[]> {
  const nested = await Promise.all(
    Array(segmentCount)
      .fill(0)
      .map((_, index) => scanAll<T>(ddbClient, {
        ...params,
        TotalSegments: segmentCount,
        Segment      : index,
      }))
  )

  return flatten(nested)
}

