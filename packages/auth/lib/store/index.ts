import {DbMethods} from './type'

export function createAuthStore<U>(methods: DbMethods<U>) {
  return {
    upsertUser: methods.upsertUser,
    saveRefreshToken: methods.saveRefreshToken,
    revokeRefreshToken: methods.revokeRefreshToken,
    saveState: methods.saveState,
    revokeState: methods.expireStateAndGetOldItem
  }
}

export type AuthStore<U = any> = ReturnType<typeof createAuthStore>

