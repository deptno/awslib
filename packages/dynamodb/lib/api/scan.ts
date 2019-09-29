import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {log} from '../log'

export async function scan<T>(ddbClient: DocumentClient, params: DocumentClient.ScanInput): Promise<T[]> {
  try {
    const response = await ddbClient
      .scan(params)
      .promise()
    log('scan', response)
    return response.Items as unknown as Promise<T[]>
  } catch (e) {
    console.error('error scan')
    console.error('error scan', e)
    return []
  }
}