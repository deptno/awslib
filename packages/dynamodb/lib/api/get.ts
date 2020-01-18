import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {log} from '../log'

export async function get<T>(ddbClient: DocumentClient, params: DocumentClient.GetItemInput) {
  try {
    const response = await ddbClient
      .get(params)
      .promise()

    log({
      key: params.Key,
      rcu: response.ConsumedCapacity,
    })

    return response.Item as Promise<T>
  } catch (e) {
    console.error('get')
    console.error(params)
    console.error(e)
  }
}