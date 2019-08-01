import {S3} from 'aws-sdk'
import {cache, CacheInputType} from './cache'

export function createS3(s3: S3) {
  return {
    cache(params: CacheInputType) {
      return cache(s3, params)
    },
  }
}
