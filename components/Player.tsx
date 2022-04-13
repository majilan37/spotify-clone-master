import React, { useCallback } from 'react'
import useSpotify from '../hooks/useSpotify'
import { useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useState, useEffect } from 'react'
import useSongInfo from '../hooks/useSongInfo'
import { setSongId } from '../redux/slices/songId'
import { setIsPlaying } from '../redux/slices/song'
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import {
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  FastForwardIcon,
} from '@heroicons/react/solid'
import { debounce } from 'lodash'

function Player() {
  const spotifyApi = useSpotify()
  const songInfo = useSongInfo()
  const { data: session } = useSession()

  const { songId } = useAppSelector((state) => state.songId)
  const { isPlaying } = useAppSelector((state) => state.song)
  const dispatch = useAppDispatch()

  const [volume, setVolume] = useState<number | null>(50)

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then((data) => {
          console.log('Currebt song ==>', data.body.item)
          dispatch(setSongId(data?.body?.item?.id))

          spotifyApi.getMyCurrentPlaybackState().then((data) => {
            console.log('Current playback state ==>', data.body)
            dispatch(setIsPlaying(data?.body?.is_playing))
          })
        })
        .catch((err) => console.log(err))
    }
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      console.log('Current playback state ==>', data.body)
      if (data?.body?.is_playing) {
        spotifyApi.pause()
        dispatch(setIsPlaying(false))
      } else {
        spotifyApi.play()
        dispatch(setIsPlaying(true))
      }
    })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && songId) {
      // fetch the current song
      fetchCurrentSong()
      setVolume(50)
    }
  }, [session, spotifyApi, songId])

  useEffect(() => {
    if (volume! > 0 && volume! < 100) {
      debouncedAdjustVolume(volume!)
    }
  }, [volume])

  const debouncedAdjustVolume = useCallback(
    debounce(
      (volume) => spotifyApi.setVolume(volume).catch((err) => console.log(err)),
      200
    ),
    []
  )

  console.log(songInfo)
  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base ">
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-10 w-10 md:inline"
          src={songInfo?.album.images[0].url}
          alt=""
        />
        <div className="">
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          onClick={() => spotifyApi.skipToPrevious()}
          className="button"
        />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button  h-10 w-10" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      <div className="flex items-center justify-end space-x-3 pr-5">
        <VolumeDownIcon
          onClick={() => volume! > 0 && setVolume((v) => v! - 10)}
          className="button"
        />
        <input
          value={volume as number}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-14 md:w-28"
          type="range"
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume! < 100 && setVolume((v) => v! + 10)}
          className="button"
        />
      </div>
    </div>
  )
}

export default Player
