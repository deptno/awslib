import {STATUS_CODES} from 'http'
import {APIGatewayProxyResult} from 'aws-lambda'

export function response(cors, statusCode, body = STATUS_CODES[statusCode]): APIGatewayProxyResult {
  if (cors) {
    return {
      statusCode,
      body,
      headers: {
        'Access-Control-Allow-Origin': cors || '',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Max-Age': 600,
      },
    }
  }
  return {
    statusCode,
    body,
  }
}

export const redirect = (location: string): APIGatewayProxyResult => {
  return {
    statusCode: 302,
    headers: {
      Location: location,
    },
    body: STATUS_CODES[302],
  }
}