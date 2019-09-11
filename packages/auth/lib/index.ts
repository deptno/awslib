import {AuthStore} from './store'
import {Provider} from './provider'
import {signIn} from './api/sign-in'
import {refresh} from './api/refresh'
import {signInCallback} from './api/sign-in-callback'

export {createDynamoDbStoreMethods} from './store/db/dynamodb'
export {createToken, readToken} from './lib/jwt'
export {createAuthStore} from './store'
export {createGoogleProvider} from './provider'

export function createAuth<U>(provider: Provider, store: AuthStore<U>) {
  return {
    signIn({state, redirectUri}) {
      return store
        .saveState({
          state,
          expiresIn: 15,
        })
        .then(() => signIn({
          clientId: provider.raw.clientId,
          state,
          redirectUri,
        }))
        .catch(console.error)
    },
    signInCallback({state, code, token, redirectUri, redirectClientUri}) {
      return signInCallback({
        provider,
        store,
        token,
        code,
        state,
        redirectUri,
        redirectClientUri,
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
