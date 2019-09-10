import jwt from 'jsonwebtoken'

export const createToken = (data, secret, options) => {
  return jwt.sign(data, secret, options)
}

// fixme readToken TO parseToken
export const readToken = (token, secret, options?) => {
  return jwt.verify(token, secret, options)
}

export const getClaim = (idToken) => jwt.decode(idToken)
