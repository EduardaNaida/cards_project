const initialState = {
    status: 'loading',
    error: null as null | string
}

type InitialStateType = typeof initialState


export const appReducer = (state: InitialStateType = initialState, action: any) => {
    return state
}