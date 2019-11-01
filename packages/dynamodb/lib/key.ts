import {defaultTo} from 'ramda'

export function createKey<T>(keys: (keyof T)[], parser: Record<keyof T, (v: keyof T) => T[keyof T]>): DynamoDbKey<T> {
  return {
    stringify(parts) {
      return keys.map(part => defaultTo('', parts[part])).join('#')
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
