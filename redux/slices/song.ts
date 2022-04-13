import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: {
  song: any | null
  isPlaying: boolean
} = {
  song: null,
  isPlaying: false,
}

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSong: (state, action: PayloadAction<any>) => {
      state.song = action.payload
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
  },
})

export const { setSong, setIsPlaying } = songSlice.actions
