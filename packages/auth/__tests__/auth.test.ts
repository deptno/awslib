import {createAuth} from '../lib'
import {createGoogleProvider} from '../lib/provider'
import {createAuthStore} from '../lib/store'
import {createDynamoDbStoreMethods} from '../lib/store/db/dynamodb'
import {DynamoDB} from 'aws-sdk'
import tap from'tap'
import {hash} from '../lib/lib/crypto'

const ddbClient = new DynamoDB.DocumentClient({region: 'ap-northeast-2'})
const ddbMethods = createDynamoDbStoreMethods({
  ddbClient,
  tables: {
    token: {
      tableName: 'test-sp',
      hashKey: 'hk',
      rangeKey: 'rk',
      ttlKey: 'ttl',
    },
    user: {
      tableName: 'test-sp',
      hashKey: 'hk',
      rangeKey: 'rk',
    },
  },
})
const store = createAuthStore(ddbMethods)
const provider = createGoogleProvider({
  clientId: '144149044196-nfp40sk31cbgam249udmglsr5uhcihd2.apps.googleusercontent.com',
  clientSecret: 'dMO--hrCBzhnV8volCiJhn3b',
  tokenSecret: 'token secret',
  refreshTokenExpiresIn: 365,
  expiresIn: 15,
})
const auth = createAuth(provider, store)
