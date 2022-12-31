import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { state, Note, NoteState } from '../states/noteState'

const initialState: NoteState = state

export const noteCreateSlice = createSlice({
  name: 'noteCreateSlice',
  initialState,
  reducers: {
    noteCreateRequest: (state) => {
      state.loading = true
    },
    noteCreateSuccess: (state) => {
      state.loading = false
      state.success = true
    },
    noteCreateFail: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },
  },
})

export const { actions, reducer } = noteCreateSlice
export const { noteCreateRequest, noteCreateSuccess, noteCreateFail } = actions
export const noteCreateReducer = reducer
