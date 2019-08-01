import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export async function scan<T>(ddbClient: DocumentClient, params: DocumentClient.ScanInput): Promise<T[]> {
  try {
    const response = await ddbClient
      .scan(params)
      .promise()
    console.log('response')
    console.log(response)
    return response.Items as unknown as Promise<T[]>
  } catch (e) {
    console.error('scan')
    console.error(e)
    return []
  }
}