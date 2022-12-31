import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { state, Note, NoteState } from '../states/noteState'

const initialState: NoteState = state

export const noteListSlice = createSlice({
  name: 'noteListSlice',
  initialState,
  reducers: {
    noteListRequest: (state) => {
      state.loading = true
    },
    noteListSuccess: (state, action: PayloadAction<Array<Note>>) => {
      state.loading = false
      state.success = true
      state.notes = action.payload
    },
    noteListFail: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },
  },
})

export const { actions, reducer } = noteListSlice
export const { noteListRequest, noteListSuccess, noteListFail } = actions
export const noteListReducer = reducer
