import {S3} from 'aws-sdk'

export async function putObject(s3: S3, params: S3.Types.PutObjectRequest) {
  try {
    return await s3
      .putObject(params)
      .promise()
  } catch (e) {
    console.error('error')
    console.error(e)
    console.error(params)
  }
}
