import {DocumentClient, TransactWriteItemList} from 'aws-sdk/clients/dynamodb'
import {log} from '../log'

export async function transactWrite(ddbClient: DocumentClient, params: TransactWriteItemList) {
  try {
    const response = await ddbClient
      .transactWrite({
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
