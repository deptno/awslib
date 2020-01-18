import {Key} from 'aws-sdk/clients/dynamodb'

export type PaginationResult<T> = {
  items: T[]
  lastEvaluatedKey?: Key
  firstResult?: boolean
}
