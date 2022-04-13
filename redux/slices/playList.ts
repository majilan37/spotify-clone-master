import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Playlist } from '../../types/globals'

const initialState: { playList: Playlist | null } = {
  playList: null,
}

export const playListSlice = createSlice({
  name: 'playList',
  initialState,
  reducers: {
    setPlayList: (state, action: PayloadAction<Playlist>) => {
      state.playList = action.payload
    },
  },
})

export const { setPlayList } = playListSlice.actions
