import {
  cardsAPI,
  CardsType,
  CardType,
  ParamsTypeCards,
  ResponseCardsType,
} from '../../../API/CardsApi/cardsApi'
import { AppThunk } from '../../../App/store'

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
    case 'FRIENDS-PACK/ADD-CARD': {
      return { ...state, cards: [action.card, ...state.cards] }
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
export const addFriendCardAC = (card: CardsType) =>
  ({
    type: 'FRIENDS-PACK/ADD-CARD',
    card,
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
      .catch((e) => {
        console.log(e)
      })
  }
}

export const addCardTC = (data: CardType): AppThunk => {
  return (dispatch) => {
    cardsAPI
      .postCards(data)
      .then((res) => {
        dispatch(addFriendCardAC(res.data.newCard))
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

// TYPE
type InitialStateType = typeof initialState
export type FriendsPackActionsType =
  | ReturnType<typeof setFriendCardsAC>
  | ReturnType<typeof addFriendCardAC>
  | ReturnType<typeof addFriendPaginationSwitchAC>
