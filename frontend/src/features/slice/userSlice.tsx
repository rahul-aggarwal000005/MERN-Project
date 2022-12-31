import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { User, UserState } from '../states/userState'

const initialState: UserState = {
  loading: null,
  error: null,
  userInfo:
    localStorage.getItem('userInfo') !== null
      ? JSON.parse(localStorage.getItem('userInfo') || '')
      : null,
}

export const userSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    userRegisterRequest: (state) => {
      state.loading = true
    },
    userRegisterSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.userInfo = action.payload
    },
    userRegisterFail: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    userLoginRequest: (state) => {
      state.loading = false
    },
    userLoginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.userInfo = action.payload
    },
    userLoginFail: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    userLogout: (state) => {
      state.userInfo = null
      state.error = null
      state.loading = null
    },
  },
})

export const { actions, reducer } = userSlice
export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
} = actions

// Other code such as selectors can use the imported `RootState` type
export const userState = (state: RootState) => state.userLogin
export const userReducer = reducer
