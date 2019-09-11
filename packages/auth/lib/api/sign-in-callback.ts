import {createToken, getClaim} from '../lib/jwt'
import {stringify} from 'querystring'
import {Provider} from '../provider'
import {AuthStore} from '../store'
import debug from 'debug'

const log = debug('auth')

export const signInCallback = async ({provider, store, code, state, token, redirectClientUri}: GetSignInCallbackInput) => {
  log('> in')
  if (await store.revokeState({state})) {
    log('> revoked')
    const {idToken} = await provider.getTokens({code, state})
    log('> idToken', idToken)
    const claim = getClaim(idToken)
    log('> idToken', claim)
    const id = claim.email

    const userContext = await store.upsertUser({
      userId: id,
      profile: claim,
    })
    const payload = {id, ...userContext}
    const options = {expiresIn: provider.raw.expiresIn}
    log('> payload', payload)
    log('> options', options)

    const authorizationToken = createToken(payload, provider.raw.tokenSecret, options)
    log('> authorizationToken', authorizationToken)
    const refreshToken = await store.saveRefreshToken({
      userId: id,
      expiresIn: provider.raw.refreshTokenExpiresIn,
      payload,
      token,
    })
    log('> refreshToken', refreshToken)

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
}
