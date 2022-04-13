import React from 'react'
import useSpotify from '../hooks/useSpotify'
import { Tracks } from '../types/globals'
import { millisToMinutesAndSeconds } from '../lib/time'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setSongId } from '../redux/slices/songId'
import { setIsPlaying } from '../redux/slices/song'

interface Props {
  track: Tracks['items'][0]
  order: number
}

function Song({ order, track }: Props) {
  const spotifyApi = useSpotify()
  const { songId } = useAppSelector((state) => state.songId)
  const dispatch = useAppDispatch()
  console.log(songId)
  const playSong = () => {
    dispatch(setSongId(track.track.id))
    dispatch(setIsPlaying(true))
    spotifyApi.play({
      uris: [track.track.uri],
    })
  }
  return (
    <div
      onClick={playSong}
      className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900"
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div className="">
          <p className="w-36 truncate  text-white lg:w-64 ">
            {track.track.name}
          </p>
          <p className="w-40 ">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0 ">
        <p className="hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
