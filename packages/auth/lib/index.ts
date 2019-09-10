import {AuthStore} from './store'
import {Provider} from './provider'
import {signIn} from './api/sign-in'
import {refresh} from './api/refresh'
import {signInCallback} from './api/sign-in-callback'

export function createAuth<U>(provider: Provider, store: AuthStore<U>) {
  return {
    signIn({state}) {
      return store
        .saveState({
          state,
          expiresIn: 15,
        })
        .then(() => signIn({...provider.raw, state}))
        .catch(console.error)
    },
    signInCallback({state, code, token}) {
      return signInCallback({
        provider,
        store,
        token,
        code,
        state,
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
