import { AppRootStateType, AppThunk } from '../../app/store'
import { updateUserProfileType, userDataAPI } from '../../API/API'

const initialState: InitialProfileType = {
  name: '',
  email: '',
  avatar: null,
}

export const profileReducer = (state = initialState, action: LoginAT): InitialProfileType => {
  switch (action.type) {
    case 'profile/CHANGE-PROFILE-NAME': {
      return { ...state, name: action.data.name }
    }
    default:
      return state
  }
}

const profileAC = (data: InitialProfileType) => {
  return { type: 'profile/CHANGE-PROFILE-NAME', data } as const
}

export const changeProfileTC = (data: ChangeModelType): AppThunk => {
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
        dispatch(changeProfileTC(res.data.updatedUser))
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

/*export const getDataProfileTC = (): AppThunk => (dispatch) => {
  userDataAPI
    .me()
    .then((res) => {
      dispatch(profileAC({ name: res.data.name, email: res.data.email, avatar: '' }))
    })
    .catch((e) => {
      console.log(e)
    })
}*/

export const logoutTC = (): AppThunk => (dispatch) => {
  userDataAPI.logoutUser().then(() => {
    const resetState = {
      name: '',
      email: '',
      avatar: null,
    }
    dispatch(changeProfileTC(resetState))
  })
}

type InitialProfileType = {
  name: string
  email: string
  avatar: string | null
}
export type ChangeModelType = {
  name?: string
  avatar?: string | null
}

type changeNameAT = ReturnType<typeof profileAC>
export type LoginAT = changeNameAT
