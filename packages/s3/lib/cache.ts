import {getObject} from './api/get-object'
import {putObject} from './api/put-object'
import {S3} from 'aws-sdk'
import {identity} from 'ramda'

export async function cache<T>(s3: S3, params: CacheInputType<T>) {
  const {bucket, key, fetch, store = identity, restore = identity} = params

  const s3Item = await getObject(s3, {bucket, key})
  if (s3Item) {
    return restore(s3Item)
  }

  const fetchedItem = await fetch()
  if (fetchedItem) {
    const result = await putObject(s3, {
      Bucket: bucket,
      Key: key,
      Body: store(fetchedItem)
    })
    console.log('s3: write', result)
  }
  return fetchedItem
}

export type CacheInputType<T> = {
  bucket: string
  key: string
  fetch(): Promise<T>
  store?(data: T): string|Blob|Buffer
  restore?(data: string|Blob|Buffer): T
}
