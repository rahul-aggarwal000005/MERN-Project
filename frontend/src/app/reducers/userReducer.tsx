import { combineReducers } from '@reduxjs/toolkit'
import { userReducer } from '../../features/userSlice/userSlice'

export const rootReducer = combineReducers({
  userLogin: userReducer,
})
