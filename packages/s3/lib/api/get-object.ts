import {S3} from 'aws-sdk'
import {log} from '../log'

export async function getObject(s3: S3, params: S3.Types.GetObjectRequest) {
  try {
    const response = await s3
      .getObject(params)
      .promise()
    return response.Body
  } catch (e) {
    if (e.code === 'NoSuchKey') {
      log(`[ok] ${params.Key} doesn't exists`)
    } else {
      console.error('error get')
      console.error(e)
      console.error(params)
    }
  }
}
