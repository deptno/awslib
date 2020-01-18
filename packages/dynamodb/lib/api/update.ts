import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export async function update<T>(ddbClient: DocumentClient, params: DocumentClient.UpdateItemInput) {
  try {
    const response = await ddbClient
      .update(params)
      .promise()

    return response.$response.data
  } catch (e) {
    console.error('update', e.code, params)
    console.error(e)
  }
}
