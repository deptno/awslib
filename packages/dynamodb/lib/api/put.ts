import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export async function put<T>(ddbClient: DocumentClient, params: DocumentClient.PutItemInput) {
  try {
    await ddbClient
      .put(params)
      .promise()
    return params.Item as Promise<T>
  } catch (e) {
    console.error('put', e.code, params.Item)
    console.error(e)
    return
  }
}
