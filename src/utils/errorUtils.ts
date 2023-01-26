import { Dispatch } from 'redux'
import { setAppErrorAC, setAppStatusAC } from '../App/appReducer'
import { AxiosError } from 'axios'

export const handleError = (e: AxiosError<{ error: string }>, dispatch: Dispatch) => {
  dispatch(setAppStatusAC('failed'))
  const error = e.response ? e.response.data.error : e.message + ', more details in the console'
  dispatch(setAppErrorAC(error))
}
