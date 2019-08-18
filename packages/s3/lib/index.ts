import {S3} from 'aws-sdk'
import {cache, CacheInputType} from './cache'
import {getObject} from './api/get-object'
import {putObject} from './api/put-object'

export function createS3(s3: S3) {
  return {
    raw: s3,
    cache<T>(params: CacheInputType<T>) {
      return cache(s3, params)
    },
    putObject(params: S3.Types.PutObjectRequest) {
      return putObject(s3, params)
    },
    getObject(params: S3.Types.GetObjectRequest) {
      return getObject(s3, params)
    },
  }
}
