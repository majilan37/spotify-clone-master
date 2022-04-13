import { JWT } from 'next-auth/jwt'
import { DefaultSession, Session } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    accessTokenExpiresAt?: number
    accessToken?: string
    refreshToken?: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string
      refreshToken?: string
    } & DefaultSession['user']
  }
}
