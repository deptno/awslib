import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {log} from '../log'
import {PaginationResult} from '../type'

export async function scan<T>(ddbClient: DocumentClient, params: DocumentClient.ScanInput): Promise<PaginationResult<T>> {
  try {
    const response = await ddbClient
      .scan(params)
      .promise()

    log('scan', response)

    return {
      items: response.Items as T[],
      lastEvaluatedKey: response.LastEvaluatedKey,
      firstResult: !Boolean(params.ExclusiveStartKey),
    }
  } catch (e) {
    console.error('error scan')
    console.error('error scan', e)

    return {
      items: [],
    }
  }
}
