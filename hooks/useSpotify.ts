import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import spotifyApi from '../lib/spotify'

function useSpotify() {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (session) {
      if (session.error === 'Refresh token failed') {
        signIn()
      } else {
        spotifyApi.setAccessToken(session.user.accessToken!)
      }
    }
  }, [session])
  return spotifyApi
}

export default useSpotify
