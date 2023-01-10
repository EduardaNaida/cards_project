import axios, {AxiosError} from "axios";
import {AppDispatchType} from "../app/store";
import {userDataAPI} from "../API/API";

export type authReducersActionType =
    | ReturnType<typeof setUserData>

const SET_USER_DATA = "SET_USER_DATA";


export type RegisterType = {
    email: string | null,
    password: string | null
}

const initialState = {
    email: null,
    password: null,
}


export const authReducer = (state: RegisterType = initialState, action: authReducersActionType): RegisterType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export const setUserData = (email: string | null, password: string | null) => ({
        type: SET_USER_DATA,
        payload: {email, password}
    } as const
)


export const setRegister = (email: string, password: string) => async (dispatch: AppDispatchType) => {
    try {
        let res = await userDataAPI.registerUser({email, password})
        if (res) {
            dispatch(setUserData(email, password))
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e.response
                ? (e as AxiosError<{error?: string}>).response?.data.error
                : e.message
            console.log(error)
        }
    }
}

