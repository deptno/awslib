import {DocumentClient} from 'aws-sdk/clients/dynamodb'

export async function del(ddbClient: DocumentClient, params: DocumentClient.DeleteItemInput) {
  try {
    const response = await ddbClient
      .delete(params)
      .promise()

    return response
  } catch (e) {
    console.error('error del')
    console.error(e)
    console.error(JSON.stringify(params))
  }
}
