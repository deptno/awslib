export const ttl = (date: Date): TTL => ~~(date.getTime() / 1000)

export type TTL = number
