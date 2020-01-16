import {deflateSync, inflateSync} from 'zlib'
import {compose} from 'ramda'

export type Gzip<T> = Buffer & {
  __parse?: T
}
export const gzip: <T>(json: T) => Gzip<T> = compose(
  deflateSync,
  Buffer.from,
  JSON.stringify,
)
export const unGzip: <T>(binary: Gzip<T>) => T = compose(
  JSON.parse,
  inflateSync,
)
