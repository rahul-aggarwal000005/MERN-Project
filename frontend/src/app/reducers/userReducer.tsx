import { combineReducers } from '@reduxjs/toolkit'
import { noteCreateReducer } from '../../features/slice/noteCreateSlice'
import { noteDeleteReducer } from '../../features/slice/noteDeleteSlice'
import { noteListReducer } from '../../features/slice/noteListSlice'
import { noteUpdateReducer } from '../../features/slice/noteUpdateSlice'
import { userReducer } from '../../features/slice/userSlice'

export const rootReducer = combineReducers({
  userLogin: userReducer,
  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
  noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
})
