import { createUserDataType, updateUserProfileType, userDataAPI, UserType } from '../API/API'
import { AppRootStateType, AppThunk } from '../app/store'

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
    case 'CHANGE-PROFILE-NAME': {
      return { ...state, name: action.userData.name }
    }
  }

  return state
}

export const changeProfileTC = (data: updateUserProfileType): AppThunk => {
  return (dispatch, getState: () => AppRootStateType) => {
    const user = getState().user
    const model: updateUserProfileType = {
      name: user.name,
      avatar: user.avatar,
      ...data,
    }
    userDataAPI
      .updateUserProfile(model)
      .then((res) => {
        console.log(res.data)
        dispatch(setUserDataAC(res.data.updatedUser))
      })
      .catch((e) => {
        console.log(e)
      })
  }
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

export const logoutTC = (): AppThunk => (dispatch) => {
  userDataAPI.logoutUser().then(() => {
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
    dispatch(changeProfileTC(resetState))
  })
}
