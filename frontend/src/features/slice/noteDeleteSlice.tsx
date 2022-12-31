import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { state, Note, NoteState } from '../states/noteState'

const initialState: NoteState = state

export const noteDeleteSlice = createSlice({
  name: 'noteDeleteSlice',
  initialState,
  reducers: {
    noteDeleteRequest: (state) => {
      state.loading = true
    },
    noteDeleteSuccess: (state) => {
      state.loading = false
      state.success = true
    },
    noteDeleteFail: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },
  },
})

export const { actions, reducer } = noteDeleteSlice
export const { noteDeleteRequest, noteDeleteSuccess, noteDeleteFail } = actions
export const noteDeleteReducer = reducer
