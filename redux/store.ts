import { configureStore } from '@reduxjs/toolkit'
import { playListIdSlice } from './slices/playListId'
import { playListSlice } from './slices/playList'
import { songIdSlice } from './slices/songId'
import { songSlice } from './slices/song'

export const store = configureStore({
  reducer: {
    playListId: playListIdSlice.reducer,
    playLists: playListSlice.reducer,
    songId: songIdSlice.reducer,
    song: songSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
