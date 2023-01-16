import axios, { AxiosError } from 'axios'
import { AppDispatchType, AppThunk } from '../app/store'
import { newPasswordDataType, userDataAPI } from '../API/API'
import { NavigateFunction } from 'react-router-dom'
import { setAppErrorAC, setAppStatusAC } from '../app/appReducer'

export type authReducersActionType = ReturnType<typeof setUserData>

const SET_USER_DATA = 'SET_USER_DATA'

export type RegisterType = {
  email: string | null
  password: string | null
  isPasswordSent: boolean
}

const initialState = {
  email: null,
  password: null,
  isPasswordSent: false,
}

export const authReducer = (
  state: RegisterType = initialState,
  action: authReducersActionType,
): RegisterType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export const setUserData = (email: string | null, password: string | null) =>
  ({
    type: SET_USER_DATA,
    payload: { email, password },
  } as const)

export const setRegister =
  (email: string, password: string, navigate: any) => async (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    try {
      let res = await userDataAPI.registerUser({ email, password })
      if (res) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setUserData(email, password))
        navigate('/login')
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e.response?.data ? (e.response.data as { error: string }).error : e.message
        dispatch(setAppErrorAC(error))
        dispatch(setAppStatusAC('failed'))
      }
    }
  }

export const forgotPassword =
  (email: string, navigate: NavigateFunction): AppThunk =>
  (dispatch) => {
    const message = `<div style="padding: 15px">
                    Password recovery:
                    <a href="${
                      process.env.NODE_ENV !== 'development'
                        ? process.env.REACT_APP_RECOVERY_PASSWORD_URL
                        : 'http://localhost:3000/'
                    }#/create-new-password/$token$">link</a>
                    </div>`
    dispatch(setAppStatusAC('loading'))
    userDataAPI
      .sendRecoveryPasswordLink({ email, message })
      .then(() => {
        dispatch(setAppStatusAC('succeeded'))
        navigate('/check-email-page')
      })
      .catch((e: AxiosError<{ error: string }>) => {
        dispatch(setAppStatusAC('failed'))
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        dispatch(setAppErrorAC(error))
      })
      .finally()
  }

export const createNewPassword =
  (data: newPasswordDataType, navigate: NavigateFunction): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    userDataAPI
      .setNewPasswordUser(data)
      .then((res) => {
        dispatch(setAppStatusAC('succeeded'))
        navigate('/login')
        return res.data
      })
      .catch((e: AxiosError<{ error: string }>) => {
        dispatch(setAppStatusAC('failed'))
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        dispatch(setAppErrorAC(error))
      })
  }
