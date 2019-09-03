import {STATUS_CODES} from 'http'

export function response(cors, statusCode, body?) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': cors || '',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Max-Age': 600,
    },
    body: body || STATUS_CODES[statusCode]
  }
}
