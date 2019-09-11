import {stringify} from 'querystring'
import {GetTokensInput, ProviderInfo} from '../type'
import axios from 'axios'

export const getTokens = async (provider: ProviderInfo, params: GetTokensInput): Promise<IdTokens> => {
  const {state, code, redirectUri} = params
  const authorization_uri = 'https://www.googleapis.com/oauth2/v4/token'
  const grant_type = 'authorization_code'

  try {
    const response = await axios.post(
      authorization_uri,
      stringify({
        client_id: provider.clientId,
        client_secret: provider.clientSecret,
        redirect_uri: redirectUri,
        grant_type,
        code,
        state,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

    if (!response) {
      throw new Error(`fail to fetch from ${authorization_uri}`)
    }
    return {
      tokenType: response.data.token_type,
      idToken: response.data.id_token,
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

type IdTokens = {
  tokenType
  idToken
  accessToken
  refreshToken
}
