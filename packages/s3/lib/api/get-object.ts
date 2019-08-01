import {S3} from 'aws-sdk'

export async function getObject(s3: S3, params) {
  const {bucket, key} = params

  try {
    const response = await s3
      .getObject({
        Bucket: bucket,
        Key   : key,
      })
      .promise()
    return response.Body
  } catch (e) {
    if (e.code === 'NoSuchKey') {
      console.log(`[ok] ${key} doesn't exists`)
    } else {
      console.error('error get')
      console.error(e)
      console.error({bucket, key})
    }
  }
}


type GetInputType = {
  bucket: string
  key: string
}
