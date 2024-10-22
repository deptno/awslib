import {DocumentClient, TransactGetItemList} from 'aws-sdk/clients/dynamodb'
import {log} from '../log'

export async function transactGet(ddbClient: DocumentClient, params: TransactGetItemList) {
  try {
    const response = await ddbClient
      .transactGet({
        ReturnConsumedCapacity: 'TOTAL',
        TransactItems: params,
      })
      .promise()

    log({'transaction response': response})

    return response
  } catch (e) {
    console.error('error batchWrite')
    console.error(e)
    console.error(JSON.stringify(params))
  }
}
