import { createUserDataType, userDataAPI, UserType } from '../API/API'
import { AppThunk } from '../app/store'

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

export const setUserDataAC = (userData: UserType) => ({ type: 'SET-USER-DATA', userData })

export const userLoginTC =
  (userData: createUserDataType): AppThunk =>
  (dispatch) => {
    userDataAPI.loginUser(userData).then((res) => {
      dispatch(setUserDataAC(res.data))
      console.log(res.data)
    })
  }
