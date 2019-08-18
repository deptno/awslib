import {deflateSync, inflateSync} from 'zlib'

type Gzip<T> = Buffer & {
  __parse?: T
}
export const gzip = <T>(json: T): Gzip<T> => {
  return deflateSync(Buffer.from(JSON.stringify(json)))
}
export const unGzip = <T>(binary: Gzip<T>): T => {
  return inflateSync(binary) as unknown as T
}
