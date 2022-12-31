import axios, { AxiosError } from 'axios'
import { AppDispatch } from '../../app/store'
import {
  userLoginFail,
  userLoginRequest,
  userLoginSuccess,
  userRegisterFail,
  userRegisterRequest,
  userRegisterSuccess,
} from '../slice/userSlice'

export const login = (email: string, password: string | number) => async (
  dispatch: AppDispatch,
) => {
  try {
    dispatch(userLoginRequest())
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config,
    )
    // console.log(data);
    // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    dispatch(userLoginSuccess(data))
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // console.log(error.response.data.message);
      dispatch(
        userLoginFail(
          error.response.data.message
            ? error.response.data.message
            : error.message,
        ),
      )
      //   setError(error.response.data.message);
    }
  }
}

export const register = (
  name: string,
  email: string,
  password: string,
  pic: string,
) => async (dispatch: AppDispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    dispatch(userRegisterRequest())
    // setLoading(true);
    const { data } = await axios.post(
      '/api/users',
      { name, pic, email, password },
      config,
    )
    localStorage.setItem('userInfo', JSON.stringify(data))
    // setLoading(false);
    dispatch(userRegisterSuccess(data))
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // setError(error.response.data.message);
      // setLoading(false);
      dispatch(
        userRegisterFail(
          error.response.data.message
            ? error.response.data.message
            : error.message,
        ),
      )
    }
  }
}
