import { useSession } from 'next-auth/react'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import useSpotify from './useSpotify'
import { useState, useEffect } from 'react'
import { Tracks } from '../types/globals'

function useSongInfo() {
  const spotifyApi = useSpotify()
  const { songId } = useAppSelector((state) => state.songId)
  const [sonInfo, setSonInfo] = useState<Tracks['items'][0]['track'] | null>(
    null
  )

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (!songId) return
      const trackInfo = await fetch(
        `https://api.spotify.com/v1/tracks/${songId}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        }
      )
        .then((res) => res.json())
        .catch((err) => console.log(err))
      setSonInfo(trackInfo)
    }
    fetchSongInfo()
  }, [songId, spotifyApi])

  return sonInfo
}

export default useSongInfo
