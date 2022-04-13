import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { playListId: string } = {
  playListId: '2VF6o4y15Ogfjs8H7Qhxd6',
}

export const playListIdSlice = createSlice({
  name: 'playList',
  initialState,
  reducers: {
    setPlayListId: (state, action: PayloadAction<string>) => {
      state.playListId = action.payload
    },
  },
})

export const { setPlayListId } = playListIdSlice.actions
