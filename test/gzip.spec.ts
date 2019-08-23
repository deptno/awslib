import tap from 'tap'
import {gzip, unGzip} from '@deptno/dynamodb/lib/gzip'

const expected = {
  a: 1,
}
const gzipped = gzip(expected)
const actual = unGzip(gzipped)

// type checking
actual.a

tap.same(actual, expected)
