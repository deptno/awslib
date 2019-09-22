import crypto from 'crypto'
import {Key} from 'aws-sdk/clients/dynamodb'

export function createToken(key: Key|undefined, salt: Buffer): string {
  if (key) {
    return encrypt(JSON.stringify(key), salt)
  }
}

export function parseToken(base64Token: string, salt: Buffer): Key|undefined {
  if (base64Token) {
    return JSON.parse(decrypt(base64Token, salt))
  }
}

const ALGORITHM = 'aes-192-cbc'
const ENCODING = 'base64'
const iv = Buffer.alloc(16, 0)

// salt: typeof crypto.scryptSync('24 characters', 'salt', 24);

export function encrypt(text, salt: Buffer) {
  const cipher = crypto.createCipheriv(ALGORITHM, salt, iv);
  let encrypted = cipher.update(text, 'utf8', ENCODING);
  encrypted += cipher.final(ENCODING)
  return encrypted
}

export function decrypt(encrypted, salt: Buffer) {
  const decipher = crypto.createDecipheriv(ALGORITHM, salt, iv);
  let decrypted = decipher.update(encrypted, ENCODING, 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted
}
