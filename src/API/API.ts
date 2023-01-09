import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const userDataAPI = {
  registerUser(userData: createUserDataType) {
    return instance.post<ResponseRegisterAndUpdateUser>('auth/register', userData)
  },
  loginUser(userData: createUserDataType) {
    return instance.post<ResponseLoginDataType>('auth/login', userData)
  },
  logoutUser() {
    return instance.delete<ResponseForgetPassAndLogout>('auth/me', {})
  },
  me() {
    return instance.post<ResponseLoginDataType>('auth/me', {})
  },
  updateUserProfile(userData: updateUserProfileType) {
    return instance.put<ResponseRegisterAndUpdateUser>('auth/me', userData)
  },
  sendRecoveryPasswordLink(passwordRecoveryData: PasswordRecoveryDataType) {
    return instance.post<ResponseForgetPassAndLogout>('auth/forgot', passwordRecoveryData)
  },
  setNewPasswordUser(newPasswordData: newPasswordDataType) {
    return instance.post<ResponseForgetPassAndLogout>('auth/set-new-password', newPasswordData)
  },
}

// TYPES

export type createUserDataType = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserType = {
  _id: string | null
  email: string | null
  name: string | null
  avatar?: string | null
  publicCardPacksCount: number | null // количество колод
  created: Date | null
  updated: Date | null
  isAdmin: boolean | null
  verified: boolean | null // подтвердил ли почту
  rememberMe: boolean | null
}

export type ResponseDataType = {
  error?: string
}

export type ResponseLoginDataType = UserType & ResponseDataType
export type ResponseForgetPassAndLogout = {
  info: string
} & ResponseDataType
export type ResponseRegisterAndUpdateUser = {
  updatedUser: UserType
} & ResponseDataType

export type updateUserProfileType = {
  name: string
  avatar: string
}

export type PasswordRecoveryDataType = {
  email: string // почта получателя для восстановления пароля
  from: string //test-front-admin <ai73a@yandex.by>, заголовок для письма и почта отправителя
  message: string //сообщение, которое придёт на почту получателя
}

export type newPasswordDataType = {
  password: string
  resetPasswordToken: string // Токен из ссылки
}
