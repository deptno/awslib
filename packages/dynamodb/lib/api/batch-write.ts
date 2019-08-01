import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export async function batchWrite(ddbClient: DocumentClient, params: DocumentClient.BatchWriteItemInput) {
  try {
    const response = await ddbClient
      .batchWrite(params)
      .promise()
    return response
  } catch (e) {
    console.error('error batchWrite')
    console.error(e)
    console.error(JSON.stringify(params))
    return
  }
}