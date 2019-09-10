import {createAuth} from '../lib'
import {createGoogleProvider} from '../lib/provider'
import {createAuthStore} from '../lib/store'
import {createDynamoDbStoreMethods} from '../lib/store/db/dynamodb'
import {DynamoDB} from 'aws-sdk'
import tap from'tap'
import {hash} from '../lib/lib/crypto'
import axios from 'axios'

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
  redirectClientUri: 'https://dev.tubemon.io/auth/google',
  redirectUri: 'https://auth.dev.tubemon.io/auth/callback',
})
const auth = createAuth(provider, store)

!async function () {

  const state = hash()
  const signInResult = auth.signIn({
    state
  })
  console.log({signInResult})
  tap.ok(signInResult)
//  const signInCallbackResult = await auth.signInCallback({
//    state,
//    code: 'code',
//    token: 'token'
//  })
//  console.log({signInCallbackResult})
}()

