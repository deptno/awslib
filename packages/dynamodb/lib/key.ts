export function createKey<T>(keys: (keyof T)[], parser: Record<keyof T, (v: keyof T) => T[keyof T]>): DynamoDbKey<T> {
  return {
    stringify(parts) {
      const ret = []
      for (const key of keys) {
        const part = parts[key]
        if (!part) {
          break
        }
        ret.push(part)
      }
      return ret.join('#')
    },
    parse(key) {
      const parts = key.split('#') as (keyof T)[]

      return keys
        .reduce((ret, key, i) => {
          ret[key] = parser[key](parts[i])
          return ret
        }, {} as T)
    },
  }
}

export type DynamoDbKey<T> = {
  stringify(parts: T): string
  parse(key: string): T
}
