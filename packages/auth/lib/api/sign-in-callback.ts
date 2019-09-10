import {createToken, getClaim} from '../lib/jwt'
import {stringify} from 'querystring'
import {Provider} from '../provider'
import {AuthStore} from '../store'

export const signInCallback = async ({provider, store, code, state, token}: GetSignInCallbackInput) => {
  if (await store.revokeState({state})) {
    const {idToken} = await provider.getTokens({code, state})
    const claim = getClaim(idToken)
    const id = claim.email

    const userContext = await store.upsertUser({
      userId: id,
      profile: claim,
    })
    const payload = {id, ...userContext}
    const options = {expiresIn: provider.raw.expiresIn}

    const authorizationToken = createToken(payload, provider.raw.tokenSecret, options)
    const refreshToken = await store.saveRefreshToken({
      userId: id,
      expiresIn: provider.raw.refreshTokenExpiresIn,
      payload,
      token,
    })

    const params = {
      authorization_token: authorizationToken,
      refresh_token: refreshToken,
    }
    // todo / 로 되어 있었는데 ? 가 맞는 것 같아 수정함 동작 확인 필요
    return `${provider.raw.redirectClientUri}?${stringify(params)}`
  }
}

type GetSignInCallbackInput = {
  provider: Provider
  store: AuthStore
  token: string
  code: string
  state: string
}
