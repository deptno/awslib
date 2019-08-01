import {getObject} from './api/get-object'
import {putObject} from './api/put-object'
import {S3} from 'aws-sdk'

export async function cache(s3: S3, params: CacheInputType) {
  const {bucket, key, fetch} = params

  const s3Item = await getObject(s3, {bucket, key})
  if (s3Item) {
    return s3Item
  }

  const fetchedItem = await fetch()
  if (fetchedItem) {
    const result = await putObject(s3, {
      Bucket: bucket,
      Key: key,
      Body: fetchedItem
    })
    console.log('s3: write', result)
  }
  return fetchedItem
}

export type CacheInputType = {
  bucket: string
  key: string
  fetch<T>(): Promise<T>
}
