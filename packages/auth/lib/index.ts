import {Provider} from './provider'
import {signIn} from './api/sign-in'
import {refresh} from './api/refresh'
import {signInCallback} from './api/sign-in-callback'
import {StoreMethods} from './store/type'

export {createDynamoDbStore} from './store/db/dynamodb'
export {createToken, readToken, getClaim} from './lib/jwt'
export {createAuthStore} from './store'
export {createGoogleProvider} from './provider'

export function createAuth<U>(provider: Provider, store: StoreMethods<U>) {
  return {
    signIn({state, host}) {
      return store
        .saveState({
          state,
          host,
          expiresIn: 15,
        })
        .then(() => signIn({
          state,
          clientId: provider.raw.clientId,
          redirectUri: provider.raw.redirectUri,
        }))
        .catch(console.error)
    },
    signInCallback({state, code, token, iss}) {
      return signInCallback({
        provider,
        store,
        token,
        code,
        state,
        iss,
      })
    },
    refresh({refreshToken, token}) {
      return refresh({
        provider,
        store,
        refreshToken,
        token,
      })
    },
  }
}
