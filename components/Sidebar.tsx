import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Playlist } from '../types/globals'
import { useAppDispatch } from '../redux/hooks'
import { setPlayListId } from '../redux/slices/playListId'
import useSpotify from '../hooks/useSpotify'

function Sidebar() {
  const { data: session, status } = useSession()
  const [playLists, setPlayLists] = useState<Playlist[]>([])
  const spotifyApi = useSpotify()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => {
          setPlayLists(data.body.items)
        })
        .catch((err) => console.log(err))
    }
  }, [session, spotifyApi])
  return (
    <div className="hidden h-screen overflow-y-scroll border-r border-gray-900 p-5 pb-36 text-xs text-gray-500 scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] ">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5" />
          <p>Search </p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5" />
          <p>Create PlayList</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5" />
          <p>Liked songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5" />
          <p>Your episodes</p>
        </button>

        {/* Playlist ... */}
        {playLists.map((playlist, index) => (
          <p
            key={index}
            onClick={() => dispatch(setPlayListId(playlist.id))}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
