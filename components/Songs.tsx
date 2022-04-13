import React from 'react'
import { useAppSelector } from '../redux/hooks'
import { Tracks } from '../types/globals'
import Song from './Song'

function Songs() {
  const { playList } = useAppSelector((state) => state.playLists)
  console.log(playList)
  return (
    <div className="flex flex-col justify-between px-8 pb-28 text-white">
      {(playList?.tracks as Tracks)?.items.map((track, index) => (
        <Song key={index} track={track} order={index} />
      ))}
    </div>
  )
}

export default Songs
