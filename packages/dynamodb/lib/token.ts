import crypto from 'crypto'

export function createToken(obj: object, salt: Buffer): string {
  if (obj) {
    return encrypt(JSON.stringify(obj), salt)
  }
}

export function parseToken(base64: string, salt: Buffer) {
  return JSON.parse(decrypt(base64, salt))
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
