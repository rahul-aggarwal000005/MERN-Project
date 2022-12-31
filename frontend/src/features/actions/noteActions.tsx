import axios, { AxiosError } from 'axios'
import { AppDispatch } from '../../app/store'
import {
  noteCreateFail,
  noteCreateRequest,
  noteCreateSuccess,
} from '../slice/noteCreateSlice'
import {
  noteDeleteFail,
  noteDeleteRequest,
  noteDeleteSuccess,
} from '../slice/noteDeleteSlice'
import {
  noteListRequest,
  noteListSuccess,
  noteListFail,
} from '../slice/noteListSlice'
import {
  noteUpdateFail,
  noteUpdateRequest,
  noteUpdateSuccess,
} from '../slice/noteUpdateSlice'

export const listNotes = () => async (dispatch: AppDispatch, getState: any) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()
    // console.log(userInfo)
    dispatch(noteListRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/api/notes', config)
    dispatch(noteListSuccess(data))
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // console.log(error.response.data.message);
      dispatch(
        noteListFail(
          error.response.data.message
            ? error.response.data.message
            : error.message,
        ),
      )
      //   setError(error.response.data.message);
    }
  }
}

export const createNote = (
  title: string,
  content: string,
  category: string,
) => async (dispatch: AppDispatch, getState: any) => {
  try {
    console.log(title, content, category)
    dispatch(noteCreateRequest)
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      '/api/notes/create',
      { title, content, category },
      config,
    )
    console.log(data)
    dispatch(noteCreateSuccess())
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // console.log(error.response.data.message);
      dispatch(
        noteCreateFail(
          error.response.data.message
            ? error.response.data.message
            : error.message,
        ),
      )
      //   setError(error.response.data.message);
    }
  }
}

export const updateNote = (
  id: string | undefined,
  title: string,
  content: string,
  category: string,
) => async (dispatch: AppDispatch, getState: any) => {
  try {
    console.log(title, content, category)
    dispatch(noteUpdateRequest)
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/notes/${id}`,
      { title, content, category },
      config,
    )
    console.log(data)
    dispatch(noteUpdateSuccess())
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // console.log(error.response.data.message);
      dispatch(
        noteUpdateFail(
          error.response.data.message
            ? error.response.data.message
            : error.message,
        ),
      )
      //   setError(error.response.data.message);
    }
  }
}

export const deleteNote = (id: string | undefined) => async (
  dispatch: AppDispatch,
  getState: any,
) => {
  try {
    dispatch(noteDeleteRequest)
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/notes/${id}`, config)
    console.log(data)
    dispatch(noteDeleteSuccess())
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // console.log(error.response.data.message);
      dispatch(
        noteDeleteFail(
          error.response.data.message
            ? error.response.data.message
            : error.message,
        ),
      )
      //   setError(error.response.data.message);
    }
  }
}
