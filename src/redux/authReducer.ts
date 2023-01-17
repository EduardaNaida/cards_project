import axios, { AxiosError } from 'axios'
import { AppDispatchType, AppThunk } from '../app/store'
import { newPasswordDataType, userDataAPI } from '../API/authApi/authApi'
import { NavigateFunction } from 'react-router-dom'

export type AuthReducersActionType = ReturnType<typeof setUserData>

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
    action: AuthReducersActionType,
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
        payload: {email, password},
    } as const)


export const setRegister = (email: string, password: string, navigate: NavigateFunction): AppThunk => async (dispatch) => {
    try {
        let res = await userDataAPI.registerUser({email, password})
        if (res) {
            dispatch(setUserData(email, password));
            navigate('/login')
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e.response
                ? (e as AxiosError<{ error?: string }>).response?.data.error
                : e.message
            console.log(error)
        }
    }
}

export const forgotPassword =
    (email: string, navigate: NavigateFunction): AppThunk =>
        () => {
            const message = `<div style="padding: 15px">
                    Password recovery:<a href='http://localhost:3000/#/create-new-password/$token$'>link</a>
                    </div>`
            userDataAPI
                .sendRecoveryPasswordLink({email, message})
                .then(() => {
                    navigate('/check-email-page')
                })
                .catch((e) => {
                    console.log(e)
                })
                .finally()
        }

export const createNewPassword =
    (data: newPasswordDataType, navigate: NavigateFunction): AppThunk =>
        () => {
            userDataAPI
                .setNewPasswordUser(data)
                .then((res) => {
                    navigate('/login')
                    return res.data
                })
                .catch((e) => {
                    console.log(e)
                })
        }
