import { createUserDataType, updateUserProfileType, userDataAPI, UserType } from '../API/authApi/authApi'
import { AppRootStateType, AppThunk } from '../app/store'
import { setAppErrorAC, setAppStatusAC } from '../app/appReducer'
import { AxiosError } from 'axios'

const initialState = {
  _id: null,
  email: null,
  name: null,
  avatar: null,
  publicCardPacksCount: null,
  created: null,
  updated: null,
  isAdmin: null,
  verified: null,
  rememberMe: null,
}

export type UserActionsType = ReturnType<typeof setUserDataAC>

export const userReducer = (state: UserType = initialState, action: UserActionsType): UserType => {
  switch (action.type) {
    case 'SET-USER-DATA': {
      return { ...state, ...action.userData }
    }
  }

  return state
}

// ACTION CREATORS
export const setUserDataAC = (userData: UserType) => ({ type: 'SET-USER-DATA', userData })

// THUNK CREATORS
export const changeProfileTC = (data: updateUserProfileType): AppThunk => {
  return (dispatch, getState: () => AppRootStateType) => {
    const user = getState().user
    const model: updateUserProfileType = {
      name: user.name,
      avatar: user.avatar,
      ...data,
    }
    dispatch(setAppStatusAC('loading'))
    userDataAPI
      .updateUserProfile(model)
      .then((res) => {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setUserDataAC(res.data.updatedUser))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        dispatch(setAppStatusAC('failed'))
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        dispatch(setAppErrorAC(error))
      })
  }
}

export const userLoginTC =
  (userData: createUserDataType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    userDataAPI
      .loginUser(userData)
      .then((res) => {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setUserDataAC(res.data))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        dispatch(setAppStatusAC('failed'))
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        dispatch(setAppErrorAC(error))
      })
  }

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  userDataAPI
    .logoutUser()
    .then(() => {
      const resetState = {
        _id: null,
        email: null,
        name: null,
        avatar: null,
        publicCardPacksCount: null,
        created: null,
        updated: null,
        isAdmin: null,
        verified: null,
        rememberMe: null,
      }
      dispatch(setUserDataAC(resetState))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((e: AxiosError<{ error: string }>) => {
      dispatch(setAppStatusAC('failed'))
      const error = e.response ? e.response.data.error : e.message + ', more details in the console'
      dispatch(setAppErrorAC(error))
    })
}
