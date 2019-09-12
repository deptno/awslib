import {createToken, getClaim} from '../lib/jwt'
import {stringify} from 'querystring'
import {Provider} from '../provider'
import {AuthStore} from '../store'
import {pick} from 'ramda'
import debug from 'debug'

const log = debug('auth')

export const signInCallback = async ({provider, store, code, state, token, redirectClientUri, host}: GetSignInCallbackInput) => {
  if (await store.revokeState({state})) {
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
      iss: host,
      [`https://${host}/profile`]: profile
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
    return `${redirectClientUri}?${stringify(params)}`
  }
  log('< fail to revoke')
}

type GetSignInCallbackInput = {
  provider: Provider
  store: AuthStore
  token: string
  code: string
  state: string
  redirectClientUri: string
  host: string
}
