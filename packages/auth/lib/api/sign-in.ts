import {stringify} from 'querystring'

export const signIn = ({state, clientId, redirectUri}: GetSignInInput) => {
  const prompt: string | undefined = undefined
  const params = {
    state,
    prompt,
    redirect_uri: redirectUri,
    client_id: clientId,
    scope: 'profile email',
    access_type: 'offline',
    response_type: 'code',
  }
  return `https://accounts.google.com/o/oauth2/v2/auth?${stringify(params)}`
}

type GetSignInInput = {
  state: string
  clientId: string
  redirectUri: string
}
