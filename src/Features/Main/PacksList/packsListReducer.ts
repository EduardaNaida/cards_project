import {
  CardPacksUpdateType,
  packAPI,
  ResponseCardsPacksType,
} from '../../../API/CardsApi/cardsApi'
import { AppThunk } from '../../../App/store'
import { setAppErrorAC, setAppStatusAC } from '../../../App/appReducer'
import { AxiosError } from 'axios'

type PacksListType = {
  cardPacks: CardPacksUpdateType[] | []
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  search: string
  isMyPacks: boolean
}

const initialState: PacksListType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
  search: '',
  isMyPacks: false,
}
export type PacksListActionsType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>

export const packsListReducer = (
  state: PacksListType = initialState,
  action: PacksListActionsType,
): PacksListType => {
  switch (action.type) {
    case 'PACKS-LIST/SET-PACKS-DATA': {
      const copyState = { ...state, ...action.packsData }
      copyState.cardPacks = action.packsData.cardPacks
      return copyState
    }
    case 'PACKS-LIST/SET-PAGE': {
      return { ...state, page: action.page }
    }
    case 'PACKS-LIST/SET-PAGE-COUNT': {
      return { ...state, pageCount: action.pageCount }
    }
    default: {
      return state
    }
  }
}

// ACTION CREATORS
export const setPacksAC = (packsData: ResponseCardsPacksType) =>
  ({
    type: 'PACKS-LIST/SET-PACKS-DATA',
    packsData,
  } as const)

export const setPageAC = (page: number) =>
  ({
    type: 'PACKS-LIST/SET-PAGE',
    page,
  } as const)

export const setPageCountAC = (pageCount: number) =>
  ({
    type: 'PACKS-LIST/SET-PAGE-COUNT',
    pageCount,
  } as const)

// THUNK CREATORS
export const getPacksDataTC = (user_id?: string): AppThunk => {
  return (dispatch, getState) => {
    const { page, pageCount } = getState().packsList
    dispatch(setAppStatusAC('loading'))
    packAPI
      .getPack({ user_id, page, pageCount })
      .then((res) => {
        dispatch(setPacksAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        dispatch(setAppStatusAC('failed'))
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        dispatch(setAppErrorAC(error))
      })
  }
}

export const addNewPackTC = (user_id?: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packAPI
      .postPack({ name: 'dsds' })
      .then(() => {
        dispatch(getPacksDataTC(user_id))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        dispatch(setAppStatusAC('failed'))
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        dispatch(setAppErrorAC(error))
      })
  }
}

export const deletePackTC = (id: string, user_id?: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packAPI
      .deletePack(id)
      .then(() => {
        dispatch(getPacksDataTC(user_id))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        dispatch(setAppStatusAC('failed'))
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        dispatch(setAppErrorAC(error))
      })
  }
}

export const updatePackTC = (cardsPack: CardPacksUpdateType, user_id?: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packAPI
      .updatePack(cardsPack)
      .then(() => {
        dispatch(getPacksDataTC(user_id))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        dispatch(setAppStatusAC('failed'))
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        dispatch(setAppErrorAC(error))
      })
  }
}
