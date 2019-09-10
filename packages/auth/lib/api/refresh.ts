import {Provider} from '../provider'
import {AuthStore} from '../store'
import {createToken} from '../lib/jwt'

export async function refresh(params: RefreshInput) {
  const {provider, store, refreshToken, token} = params
  const results = await store.revokeRefreshToken({
    oldToken: refreshToken,
    token,
  })
  const {id} = results
  const data = {
    authorizationToken: {
      payload: {
        id,
      },
      options: {
        expiresIn: provider.raw.expiresIn,
      },
    },
    refreshToken: results.token,
  }
  if (typeof results.payload === 'object') {
    data.authorizationToken.payload = Object.assign(
      data.authorizationToken.payload,
      results.payload,
    )
  }
  const authorizationToken = createToken(
    data.authorizationToken.payload,
    provider.raw.tokenSecret,
    data.authorizationToken.options,
  )

  return {
    id,
    authorizationToken,
    refreshToken: data.refreshToken,
  }
}

type RefreshInput = {
  provider: Provider
  store: AuthStore
  refreshToken: string
  token: string
}
