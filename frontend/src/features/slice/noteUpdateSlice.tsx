import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { state, Note, NoteState } from '../states/noteState'

const initialState: NoteState = state

export const noteUpdateSlice = createSlice({
  name: 'noteUpdateSlice',
  initialState,
  reducers: {
    noteUpdateRequest: (state) => {
      state.loading = true
    },
    noteUpdateSuccess: (state) => {
      state.loading = false
      state.success = true
    },
    noteUpdateFail: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },
  },
})

export const { actions, reducer } = noteUpdateSlice
export const { noteUpdateRequest, noteUpdateSuccess, noteUpdateFail } = actions
export const noteUpdateReducer = reducer
