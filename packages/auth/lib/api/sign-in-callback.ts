import {createToken, getClaim} from '../lib/jwt'
import {stringify} from 'querystring'
import {Provider} from '../provider'
import {pick} from 'ramda'
import {StoreMethods} from '../store/type'
import {log} from '../lib/log'

export const signInCallback = async <U>({provider, store, code, state, token, iss}: GetSignInCallbackInput<U>) => {
  const host = await store.revokeState({state})
  if (host) {
    log('> revoked')
    const {idToken} = await provider.getTokens({code, state})
    const googleClaim = getClaim(idToken)
    log('> idToken', googleClaim)
    const id = googleClaim.email
    const profile = pick([
      'email',
      'email_verified',
      'locale',
      'name',
      'picture',
    ], googleClaim)
    await store.upsertUser({id, profile})

    const payload = {
      id,
      iss,
      ...profile
    }
    const options = {expiresIn: provider.raw.expiresIn}
    const authorizationToken = createToken(payload, provider.raw.tokenSecret, options)
    const refreshToken = await store.saveRefreshToken({
      id,
      token,
      expiresIn: provider.raw.refreshTokenExpiresIn,
    })
    const params = {
      authorization_token: authorizationToken,
      refresh_token: refreshToken,
    }
    // todo / 로 되어 있었는데 ? 가 맞는 것 같아 수정함 동작 확인 필요
    log('> params', params)
    return `${host}?${stringify(params)}`
  }
  log('< fail to revoke')
}

type GetSignInCallbackInput<U> = {
  provider: Provider
  store: StoreMethods<U>
  token: string
  code: string
  state: string
  iss: string
}
