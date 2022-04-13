import { ChevronDownIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import useSpotify from '../hooks/useSpotify'
import { setPlayList } from '../redux/slices/playList'
import Songs from './Songs'

const colors = [
  'from-red-500',
  'from-orange-500',
  'from-yellow-500',
  'from-green-500',
  'from-teal-500',
  'from-blue-500',
  'from-indigo-500',
  'from-purple-500',
  'from-pink-500',
]

function Center() {
  const [color, setColor] = useState(colors[0])
  const { data: session, status } = useSession()
  const spotifyApi = useSpotify()
  const { playListId } = useAppSelector((state) => state.playListId)
  const { playList } = useAppSelector((state) => state.playLists)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setColor(shuffle(colors).pop() as string)
  }, [playListId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playListId)
      .then((data) => {
        dispatch(setPlayList(data.body))
      })
      .catch((err) => console.log(err))
  }, [playListId, spotifyApi])
  return (
    <div className="  h-screen flex-grow overflow-y-scroll text-white scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 opacity-90 hover:opacity-80">
          <img
            className="h-10 w-10 rounded-full object-cover object-top"
            src={session?.user.image as string}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <p
            onClick={() => signOut()}
            className="text-xs font-bold hover:text-gray-200"
          >
            Log out
          </p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playList?.images[0].url}
          alt=""
        />
        <div className="">
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playList?.name}</h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
