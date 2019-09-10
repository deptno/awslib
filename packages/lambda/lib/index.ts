import {Lambda} from 'aws-sdk'
import {redirect, response as _response} from './util/response'

export function createLambda(lambda: Lambda, cors?: string) {
  return {
    raw: lambda,
    util: {
      response(statusCode: number, body?: string) {
        return _response(cors, statusCode, body)
      },
      redirect
    },
  }
}
