import {
  cardsAPI,
  CardsType,
  ParamsTypeCards,
  ResponseCardsType,
} from '../../../API/CardsApi/cardsApi'
import { AppThunk } from '../../../App/store'
import { AxiosError } from 'axios'

const initialState = {
  cards: [] as Array<CardsType>,
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 1,
  packUserId: '',
}

export const friendsPackReducer = (
  state: InitialStateType = initialState,
  action: FriendsPackActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'FRIENDS-PACK/SET-CARDS': {
      return { ...action.data }
    }
    case 'FRIENDS-PACK/PAGINATION-SWITCH': {
      return { ...state, page: action.page }
    }
  }
  return state
}

// ACTION CREATORS
export const setFriendCardsAC = (data: ResponseCardsType) =>
  ({
    type: 'FRIENDS-PACK/SET-CARDS',
    data,
  } as const)

export const addFriendPaginationSwitchAC = (page: number) =>
  ({
    type: 'FRIENDS-PACK/PAGINATION-SWITCH',
    page,
  } as const)

// THUNK CREATORS
export const setCardsTC = (params: ParamsTypeCards): AppThunk => {
  return (dispatch) => {
    cardsAPI
      .getCards(params)
      .then((res) => {
        dispatch(setFriendCardsAC(res.data))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        console.log(error)
      })
  }
}

// TYPE
type InitialStateType = typeof initialState
export type FriendsPackActionsType =
  | ReturnType<typeof setFriendCardsAC>
  | ReturnType<typeof addFriendPaginationSwitchAC>
