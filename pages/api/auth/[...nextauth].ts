import NextAuth, { NextAuthOptions } from 'next-auth'
import SpotifyProviders from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'
import { JWT } from 'next-auth/jwt'

async function refreshAccessToken(token: JWT) {
  try {
    spotifyApi.setAccessToken(token.accessToken!)
    spotifyApi.setRefreshToken(token.refreshToken!)

    const { body: refreshToken } = await spotifyApi.refreshAccessToken()

    console.log('Refreshed access token is', refreshToken)
    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpiresAt: Date.now() + refreshToken.expires_in * 1000,
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: 'Refresh token failed',
    }
  }
}

export default NextAuth({
  providers: [
    SpotifyProviders({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      //   initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpiresAt: account.expires_at! * 1000,
        }
      }

      //   Return previous token if the access token has not expired yet
      if (token && token.accessTokenExpiresAt! > Date.now()) {
        console.log('Existing token still valid')
        console.log(token)
        return token
      }

      //   Refresh token
      console.log('Refreshing token...')
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.name = token.name
      return session
    },
  },
})
