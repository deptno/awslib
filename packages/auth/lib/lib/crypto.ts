import crypto, {createHmac} from 'crypto'

export const hash = () => crypto
  .randomBytes(48)
  .toString('hex')

export const createId = (data, secret) => {
  const hmac = createHmac('sha256', secret)
  hmac.update(data)
  return hmac.digest('hex')
}
