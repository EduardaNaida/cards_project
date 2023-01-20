import { AppThunk } from '../../../App/store'
import { AxiosError } from 'axios'
import {
  CardPacksUpdateType,
  CardsPackType,
  packAPI,
  ResponseCardsPacksType,
} from '../../../API/CardsApi/cardsApi'

type GetPackType = ReturnType<typeof getPackAC>
type UpdatePackType = ReturnType<typeof setNewPackName>

export type PackReducerActionType = GetPackType | UpdatePackType

const initialState: InitialStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 5,
  minCardsCount: 0,
  page: 1,
  pageCount: 2,
}

export type InitialStateType = ResponseCardsPacksType

export const packReducer = (
  state: InitialStateType = initialState,
  action: PackReducerActionType,
): InitialStateType => {
  switch (action.type) {
    case 'PACK/GET-PACK': {
      return {
        ...state,
        cardPacks: [...action.cardsPacks],
      }
    }
    case 'PACK/SET-NEW-NAME': {
      return {
        ...state,
        cardPacks: state.cardPacks.map((card) =>
          card._id === action._id ? { ...card, question: action.name } : card,
        ),
      }
    }
  }
  return state
}

const getPackAC = (cardsPacks: CardPacksUpdateType[]) =>
  ({ type: 'PACK/GET-PACK', cardsPacks } as const)
const setNewPackName = (updatedCardsPack: CardPacksUpdateType, _id: string, name: string) =>
  ({
    type: 'PACK/SET-NEW-NAME',
    _id,
    name,
    updatedCardsPack,
  } as const)

export const getPackTC =
  (user_id: string): AppThunk =>
  (dispatch) => {
    packAPI
      .getPack({ user_id })
      .then((res) => {
        dispatch(getPackAC(res.data.cardPacks))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        console.log(error)
      })
  }

export const addPackTC =
  (card: CardsPackType): AppThunk =>
  (dispatch) => {
    packAPI
      .postPack(card)
      .then((res) => {
        dispatch(getPackTC(res.data.newCardsPack._id))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        console.log(error)
      })
  }

export const removePackTC =
  (id: string): AppThunk =>
  (dispatch) => {
    packAPI
      .deletePack(id)
      .then((res) => {
        dispatch(getPackTC(res.data.deletedCardsPack._id))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        console.log(error)
      })
  }

export const updatePackTC =
  (card: CardPacksUpdateType): AppThunk =>
  (dispatch) => {
    packAPI
      .updatePack(card)
      .then((res) => {
        console.log(res)
        dispatch(
          setNewPackName(
            res.data.updatedCardsPack,
            res.data.updatedCardsPack._id,
            res.data.updatedCardsPack.name,
          ),
        )
      })
      .catch((e: AxiosError<{ error: string }>) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        console.log(error)
      })
  }
