import {createAuth} from '../lib'
import {createGoogleProvider} from '../lib/provider'
import {createAuthStore} from '../lib/store'
import {DynamoDB} from 'aws-sdk'

const ddbClient = new DynamoDB.DocumentClient({region: 'ap-northeast-2'})
const store = createAuthStore<User>({
  type: 'dynamodb',
  params: {
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
  }
})
const provider = createGoogleProvider({
  clientId: '',
  clientSecret: '',
  tokenSecret: '',
  refreshTokenExpiresIn: 60 * 60 * 24,
  expiresIn: 15,
  redirectUri: 'https://site.com/auth/callback',
})
const auth = createAuth(provider, store)

type User = {
  email: string
}
