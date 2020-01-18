import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export async function batchGet(ddbClient: DocumentClient, params: DocumentClient.BatchGetItemInput) {
  try {
    const response = await ddbClient
      .batchGet(params)
      .promise()

    return response
  } catch (e) {
    console.error('error batchGet')
    console.error(e)
    console.error(JSON.stringify(params))
  }
}