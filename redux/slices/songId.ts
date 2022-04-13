import { createSlice } from '@reduxjs/toolkit'

const initialState: {
  songId: string | null
} = {
  songId: null,
}

export const songIdSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSongId: (state, action) => {
      state.songId = action.payload
    },
  },
})

export const { setSongId } = songIdSlice.actions
